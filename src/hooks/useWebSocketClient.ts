'use client';

import { useEffect, useRef, useCallback } from 'react';
import { getMockSocketServer } from '@/services/mockSocketServer';
import { useGenerationStore } from '@/lib/store';
import { WebSocketEvent, WebSocketEventType } from '@/types/generation';

/**
 * Custom hook to manage WebSocket connection with automatic Zustand store synchronization.
 * 
 * This hook:
 * - Connects to the mock WebSocket server on mount
 * - Listens for all WebSocket events (connect, disconnect, generation updates)
 * - Automatically syncs received events to the Zustand store
 * - Provides functions to start and cancel generations
 * - Disconnects on unmount
 * 
 * @returns Object containing startGeneration, cancelGeneration, and isConnected state
 * @example
 * function MyComponent() {
 *   const { startGeneration, isConnected } = useWebSocketClient();
 *   
 *   const handleCreate = () => {
 *     const id = addItem("Create a happy song");
 *     startGeneration(id, "Create a happy song");
 *   };
 * }
 */
export function useWebSocketClient() {
  const serverRef = useRef(getMockSocketServer());
  const {
    addItem,
    updateItemStatus,
    updateItemProgress,
    completeItem,
    failItem,
    setConnected,
    setCurrentGenerationId,
  } = useGenerationStore();

  /**
   * Handle incoming WebSocket events and sync with Zustand store.
   * Maps all event types (connect, disconnect, progress, complete, failed) to store actions.
   * 
   * @param event - The WebSocket event to handle
   */
  const handleEvent = useCallback(
    (event: WebSocketEvent) => {
      console.log('[useWebSocketClient] Received event:', event.type);

      switch (event.type) {
        case WebSocketEventType.CONNECT:
          setConnected(true);
          console.log('[useWebSocketClient] Connected to server');
          break;

        case WebSocketEventType.DISCONNECT:
          setConnected(false);
          setCurrentGenerationId(null);
          console.log('[useWebSocketClient] Disconnected from server');
          break;

        case WebSocketEventType.ERROR:
          console.error('[useWebSocketClient] Error:', event.error);
          break;

        case WebSocketEventType.GENERATION_START:
          console.log(`[useWebSocketClient] Generation started: ${event.generationId}`);
          setCurrentGenerationId(event.generationId);
          updateItemStatus(event.generationId, 'generating');
          break;

        case WebSocketEventType.GENERATION_PROGRESS:
          console.log(
            `[useWebSocketClient] Progress: ${event.generationId} - ${event.progress}% - ${event.stage}`
          );
          updateItemProgress(event.generationId, event.progress, event.stage);
          break;

        case WebSocketEventType.GENERATION_COMPLETE:
          console.log(`[useWebSocketClient] Completed: ${event.generationId}`);
          completeItem(event.generationId, event.audioUrl, event.duration);
          setCurrentGenerationId(null);
          break;

        case WebSocketEventType.GENERATION_FAILED:
          console.log(`[useWebSocketClient] Failed: ${event.generationId} - ${event.error}`);
          failItem(event.generationId, event.message);
          setCurrentGenerationId(null);
          break;

        default:
          console.warn('[useWebSocketClient] Unknown event type:', event);
      }
    },
    [
      setConnected,
      setCurrentGenerationId,
      updateItemStatus,
      updateItemProgress,
      completeItem,
      failItem,
    ]
  );

  /**
   * Initialize connection and register event handler.
   * Automatically connects on mount and disconnects on unmount.
   */
  useEffect(() => {
    const server = serverRef.current;

    // Register event listener
    server.on(handleEvent);

    // Connect to server
    server.connect().catch((error) => {
      console.error('[useWebSocketClient] Connection error:', error);
    });

    // Cleanup on unmount
    return () => {
      server.off(handleEvent);
      server.disconnect();
    };
  }, [handleEvent]);

  /**
   * Start a new music generation.
   * 
   * @param id - The unique generation ID
   * @param prompt - The user's prompt describing the music
   * @example
   * startGeneration("gen-123", "Create a happy upbeat pop song");
   */
  const startGeneration = useCallback(
    (id: string, prompt: string) => {
      const server = serverRef.current;

      if (!server.isConnected()) {
        console.warn('[useWebSocketClient] Cannot start generation - not connected');
        return;
      }

      // Add item to store immediately
      addItem(prompt);

      // Send start message to server
      server.send({
        type: 'start-generation',
        id,
        prompt,
      });

      console.log(`[useWebSocketClient] Started generation: ${id}`);
    },
    [addItem]
  );

  /**
   * Cancel an active generation.
   * 
   * @param id - The generation ID to cancel
   * @example
   * cancelGeneration("gen-123");
   */
  const cancelGeneration = useCallback((id: string) => {
    const server = serverRef.current;

    if (!server.isConnected()) {
      console.warn('[useWebSocketClient] Cannot cancel generation - not connected');
      return;
    }

    server.send({
      type: 'cancel-generation',
      id,
    });

    console.log(`[useWebSocketClient] Cancelled generation: ${id}`);
  }, []);

  return {
    startGeneration,
    cancelGeneration,
    isConnected: serverRef.current.isConnected(),
  };
}
