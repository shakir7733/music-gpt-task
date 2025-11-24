import { useEffect, useRef, useCallback } from 'react';
import { WebSocketClient } from '@/lib/websocket-client';
import { useGenerationStore } from '@/lib/store';
import {
  WebSocketEvent,
  WebSocketEventType,
  GenerationStartEvent,
  GenerationProgressEvent,
  GenerationCompleteEvent,
  GenerationFailedEvent,
} from '@/types/generation';

const WS_URL = 'ws://localhost:8080';

export function useWebSocket() {
  const clientRef = useRef<WebSocketClient | null>(null);
  const {
    setConnected,
    updateItemStatus,
    updateItemProgress,
    completeItem,
    failItem,
  } = useGenerationStore();

  const handleConnect = useCallback(() => {
    console.log('WebSocket connected');
    setConnected(true);
  }, [setConnected]);

  const handleDisconnect = useCallback(() => {
    console.log('WebSocket disconnected');
    setConnected(false);
  }, [setConnected]);

  const handleError = useCallback((error: Error) => {
    console.error('WebSocket error:', error);
    setConnected(false);
  }, [setConnected]);

  const handleMessage = useCallback(
    (event: WebSocketEvent) => {
      console.log('Received event:', event.type);

      switch (event.type) {
        case WebSocketEventType.GENERATION_START: {
          const startEvent = event as GenerationStartEvent;
          updateItemStatus(startEvent.generationId, 'generating');
          break;
        }

        case WebSocketEventType.GENERATION_PROGRESS: {
          const progressEvent = event as GenerationProgressEvent;
          updateItemProgress(
            progressEvent.generationId,
            progressEvent.progress,
            progressEvent.stage
          );
          break;
        }

        case WebSocketEventType.GENERATION_COMPLETE: {
          const completeEvent = event as GenerationCompleteEvent;
          completeItem(
            completeEvent.generationId,
            completeEvent.audioUrl,
            completeEvent.duration
          );
          break;
        }

        case WebSocketEventType.GENERATION_FAILED: {
          const failedEvent = event as GenerationFailedEvent;
          failItem(failedEvent.generationId, failedEvent.message);
          break;
        }

        default:
          console.log('Unhandled event type:', event.type);
      }
    },
    [updateItemStatus, updateItemProgress, completeItem, failItem]
  );

  useEffect(() => {
    // Create WebSocket client
    clientRef.current = new WebSocketClient({
      url: WS_URL,
      onConnect: handleConnect,
      onDisconnect: handleDisconnect,
      onError: handleError,
      onMessage: handleMessage,
    });

    // Connect
    clientRef.current.connect();

    // Cleanup on unmount
    return () => {
      if (clientRef.current) {
        clientRef.current.disconnect();
      }
    };
  }, [handleConnect, handleDisconnect, handleError, handleMessage]);

  const sendEvent = useCallback((event: WebSocketEvent) => {
    if (clientRef.current?.isConnected()) {
      clientRef.current.send(event);
    } else {
      console.error('WebSocket is not connected');
    }
  }, []);

  const startGeneration = useCallback(
    (generationId: string, prompt: string) => {
      const event: GenerationStartEvent = {
        type: WebSocketEventType.GENERATION_START,
        timestamp: Date.now(),
        generationId,
        prompt,
      };
      sendEvent(event);
    },
    [sendEvent]
  );

  return {
    startGeneration,
    sendEvent,
    isConnected: clientRef.current?.isConnected() ?? false,
  };
}
