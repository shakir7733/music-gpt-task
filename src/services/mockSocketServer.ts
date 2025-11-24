/**
 * Mock WebSocket Server (Browser-Compatible)
 * 
 * Simulates a WebSocket server entirely in the browser using EventEmitter pattern.
 * This allows testing without requiring a Node.js server.
 */

import { WebSocketEvent, WebSocketEventType } from '@/types/generation';

type EventCallback = (event: WebSocketEvent) => void;

// Client message types
interface StartGenerationMessage {
  type: 'start-generation';
  id: string;
  prompt: string;
}

interface CancelGenerationMessage {
  type: 'cancel-generation';
  id: string;
}

type ClientMessage = StartGenerationMessage | CancelGenerationMessage;

/**
 * Mock WebSocket Server implementation using EventEmitter pattern.
 * 
 * Simulates a complete WebSocket server with:
 * - 5-step generation process (Analyzing → Generating → Adding Effects → Mixing → Finalizing)
 * - 1 second intervals between steps
 * - 80% success rate, 20% random failures
 * - Browser-compatible (no Node.js server required)
 * 
 * @example
 * const server = new MockSocketServer();
 * server.on((event) => console.log(event));
 * await server.connect();
 * server.send({ type: 'start-generation', id: 'gen-123', prompt: 'Happy song' });
 */
export class MockSocketServer {
  private listeners: Set<EventCallback> = new Set();
  private activeGenerations: Map<string, NodeJS.Timeout[]> = new Map();
  private connected: boolean = false;

  /**
   * Connect to the mock server.
   * Emits a CONNECT event after 100ms delay to simulate network latency.
   * 
   * @returns Promise that resolves when connected
   */
  connect(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.connected = true;
        console.log('[MockSocketServer] Connected');
        
        // Emit connected event
        this.broadcast({
          type: WebSocketEventType.CONNECT,
          clientId: 'mock-client',
          timestamp: Date.now(),
        });
        
        resolve();
      }, 100);
    });
  }

  /**
   * Disconnect from the mock server.
   * Clears all active generation timers and emits DISCONNECT event.
   */
  disconnect(): void {
    this.connected = false;
    
    // Clear all active generation timers
    this.activeGenerations.forEach((timers) => {
      timers.forEach((timer) => clearTimeout(timer));
    });
    this.activeGenerations.clear();
    
    console.log('[MockSocketServer] Disconnected');
    
    // Emit disconnected event
    this.broadcast({
      type: WebSocketEventType.DISCONNECT,
      reason: 'Client disconnected',
      timestamp: Date.now(),
    });
  }

  /**
   * Register an event listener to receive all server events.
   * 
   * @param callback - Function called with each WebSocketEvent
   */
  on(callback: EventCallback): void {
    this.listeners.add(callback);
  }

  /**
   * Unregister an event listener.
   * 
   * @param callback - The callback function to remove
   */
  off(callback: EventCallback): void {
    this.listeners.delete(callback);
  }

  /**
   * Send a message to the server (simulates client → server communication).
   * 
   * @param message - Client message (start-generation or cancel-generation)
   */
  send(message: ClientMessage): void {
    if (!this.connected) {
      console.warn('[MockSocketServer] Cannot send - not connected');
      return;
    }

    console.log('[MockSocketServer] Received message:', message.type);

    switch (message.type) {
      case 'start-generation':
        this.handleStartGeneration(message.id, message.prompt);
        break;
      case 'cancel-generation':
        this.handleCancelGeneration(message.id);
        break;
      default:
        console.warn('[MockSocketServer] Unknown message type:', (message as ClientMessage).type);
    }
  }

  /**
   * Broadcast a WebSocket event to all registered listeners.
   * Catches and logs any errors from listener callbacks.
   * 
   * @param event - The WebSocketEvent to broadcast
   */
  private broadcast(event: WebSocketEvent): void {
    this.listeners.forEach((callback) => {
      try {
        callback(event);
      } catch (error) {
        console.error('[MockSocketServer] Error in listener:', error);
      }
    });
  }

  /**
   * Handle start-generation message from client.
   * Simulates a 5-step generation process:
   * 1. Analyzing prompt (20%)
   * 2. Generating melody (40%)
   * 3. Adding harmony (60%)
   * 4. Mixing audio (80%)
   * 5. Finalizing (100%)
   * 
   * Each step takes 1 second. 80% chance of success, 20% chance of failure.
   * 
   * @param id - The generation ID
   * @param prompt - The user's music prompt
   */
  private handleStartGeneration(id: string, prompt: string): void {
    console.log(`[MockSocketServer] Starting generation: ${id}`);

    // Emit generation-started event
    this.broadcast({
      type: WebSocketEventType.GENERATION_START,
      generationId: id,
      prompt,
      timestamp: Date.now(),
    });

    // Simulate progress over 5 steps
    const timers: NodeJS.Timeout[] = [];
    const steps = ['Analyzing prompt', 'Generating melody', 'Adding harmony', 'Mixing audio', 'Finalizing'];
    
    steps.forEach((stepName, index) => {
      const timer = setTimeout(() => {
        const progress = ((index + 1) / steps.length) * 100;
        
        console.log(`[MockSocketServer] Progress ${id}: ${progress}% - ${stepName}`);
        
        this.broadcast({
          type: WebSocketEventType.GENERATION_PROGRESS,
          generationId: id,
          progress,
          stage: stepName,
          timestamp: Date.now(),
        });

        // After final step, emit completion or failure
        if (index === steps.length - 1) {
          setTimeout(() => {
            this.completeGeneration(id);
          }, 1000);
        }
      }, (index + 1) * 1000); // 1 second per step

      timers.push(timer);
    });

    this.activeGenerations.set(id, timers);
  }

  /**
   * Complete a generation with 80% success rate or 20% random failure.
   * 
   * Success: Emits GENERATION_COMPLETE with mock audio URL and duration (60-240 seconds)
   * Failure: Emits GENERATION_FAILED with random error message
   * 
   * @param id - The generation ID to complete
   */
  private completeGeneration(id: string): void {
    // 80% success, 20% failure
    const success = Math.random() > 0.2;

    if (success) {
      console.log(`[MockSocketServer] Completed: ${id}`);
      
      this.broadcast({
        type: WebSocketEventType.GENERATION_COMPLETE,
        generationId: id,
        audioUrl: `https://example.com/audio/${id}.mp3`,
        duration: Math.floor(Math.random() * 180) + 60, // 60-240 seconds
        timestamp: Date.now(),
      });
    } else {
      console.log(`[MockSocketServer] Failed: ${id}`);
      
      const errors = [
        'Server timeout - please try again',
        'Content policy violation detected',
        'Insufficient resources - please retry',
        'Generation quality below threshold',
      ];
      
      const errorMsg = errors[Math.floor(Math.random() * errors.length)];
      this.broadcast({
        type: WebSocketEventType.GENERATION_FAILED,
        generationId: id,
        error: errorMsg,
        message: errorMsg,
        timestamp: Date.now(),
      });
    }

    // Clean up timers
    this.activeGenerations.delete(id);
  }

  /**
   * Handle cancel-generation message from client.
   * Clears all pending timers and emits GENERATION_FAILED event.
   * 
   * @param id - The generation ID to cancel
   */
  private handleCancelGeneration(id: string): void {
    console.log(`[MockSocketServer] Canceling generation: ${id}`);

    const timers = this.activeGenerations.get(id);
    if (timers) {
      timers.forEach((timer) => clearTimeout(timer));
      this.activeGenerations.delete(id);

      this.broadcast({
        type: WebSocketEventType.GENERATION_FAILED,
        generationId: id,
        error: 'Generation cancelled by user',
        message: 'Generation cancelled by user',
        timestamp: Date.now(),
      });
    }
  }

  /**
   * Generate mock waveform data for visualization.
   * 
   * @returns Array of 100 random amplitude values (0.1-0.9)
   */
  private generateMockWaveform(): number[] {
    const length = 100;
    return Array.from({ length }, () => Math.random() * 0.8 + 0.1);
  }

  /**
   * Extract genre/mood tags from user prompt.
   * 
   * @param prompt - The user's music prompt
   * @returns Array of matching tags (max 3)
   */
  private extractTags(prompt: string): string[] {
    const allTags = ['ambient', 'electronic', 'jazz', 'rock', 'classical', 'pop', 'upbeat', 'relaxing', 'energetic', 'melancholic'];
    const promptLower = prompt.toLowerCase();
    
    return allTags.filter((tag) => promptLower.includes(tag)).slice(0, 3);
  }

  /**
   * Check if the server is currently connected.
   * 
   * @returns True if connected, false otherwise
   */
  isConnected(): boolean {
    return this.connected;
  }
}

// Singleton instance
let instance: MockSocketServer | null = null;

/**
 * Get the singleton instance of MockSocketServer.
 * Creates a new instance on first call, then returns the same instance.
 * 
 * @returns The singleton MockSocketServer instance
 */
export function getMockSocketServer(): MockSocketServer {
  if (!instance) {
    instance = new MockSocketServer();
  }
  return instance;
}
