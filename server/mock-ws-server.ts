import { WebSocket, WebSocketServer } from 'ws';
import {
  WebSocketEvent,
  WebSocketEventType,
  WebSocketMessage,
  GenerationStartEvent,
  GenerationProgressEvent,
  GenerationCompleteEvent,
} from '../src/types/generation';

const PORT = 8080;

/**
 * Mock WebSocket Server for Music Generation Simulation
 */
class MockMusicGenerationServer {
  private wss: WebSocketServer;
  private clients: Set<WebSocket> = new Set();

  constructor(port: number) {
    this.wss = new WebSocketServer({ port });
    this.initialize();
  }

  private initialize(): void {
    console.log(`🎵 Mock Music Generation Server started on port ${PORT}`);

    this.wss.on('connection', (ws: WebSocket) => {
      console.log('✅ New client connected');
      this.clients.add(ws);

      // Send connection event
      this.sendEvent(ws, {
        type: WebSocketEventType.CONNECT,
        timestamp: Date.now(),
        clientId: this.generateId(),
      });

      ws.on('message', (data: Buffer) => {
        try {
          const message: WebSocketMessage = JSON.parse(data.toString());
          this.handleMessage(ws, message);
        } catch (error) {
          console.error('Failed to parse message:', error);
          this.sendErrorEvent(ws, 'Invalid message format');
        }
      });

      ws.on('close', () => {
        console.log('❌ Client disconnected');
        this.clients.delete(ws);
      });

      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        this.clients.delete(ws);
      });
    });
  }

  private handleMessage(ws: WebSocket, message: WebSocketMessage): void {
    const { event } = message;

    console.log('📨 Received event:', event.type);

    switch (event.type) {
      case WebSocketEventType.GENERATION_START:
        this.simulateGeneration(ws, event as GenerationStartEvent);
        break;
      default:
        console.log('Unknown event type:', event.type);
    }
  }

  /**
   * Simulate music generation process
   */
  private async simulateGeneration(
    ws: WebSocket,
    startEvent: GenerationStartEvent
  ): Promise<void> {
    const { generationId, prompt } = startEvent;

    console.log(`🎼 Starting generation for: "${prompt}"`);

    // Simulate generation stages with progress updates
    const stages = [
      { stage: 'Analyzing prompt', progress: 10, delay: 500 },
      { stage: 'Generating melody', progress: 30, delay: 1000 },
      { stage: 'Creating harmony', progress: 50, delay: 1200 },
      { stage: 'Adding rhythm', progress: 70, delay: 1000 },
      { stage: 'Mixing audio', progress: 85, delay: 800 },
      { stage: 'Finalizing', progress: 95, delay: 500 },
    ];

    for (const { stage, progress, delay } of stages) {
      await this.sleep(delay);

      const progressEvent: GenerationProgressEvent = {
        type: WebSocketEventType.GENERATION_PROGRESS,
        timestamp: Date.now(),
        generationId,
        progress,
        stage,
      };

      this.sendEvent(ws, progressEvent);
      console.log(`  ⏳ ${stage} - ${progress}%`);
    }

    // Simulate completion
    await this.sleep(500);

    const completeEvent: GenerationCompleteEvent = {
      type: WebSocketEventType.GENERATION_COMPLETE,
      timestamp: Date.now(),
      generationId,
      audioUrl: `https://example.com/audio/${generationId}.mp3`,
      duration: 180, // 3 minutes
    };

    this.sendEvent(ws, completeEvent);
    console.log(`✨ Generation complete: ${generationId}`);
  }

  /**
   * Send event to client
   */
  private sendEvent(ws: WebSocket, event: WebSocketEvent): void {
    if (ws.readyState === WebSocket.OPEN) {
      const message: WebSocketMessage = { event };
      ws.send(JSON.stringify(message));
    }
  }

  /**
   * Send error event
   */
  private sendErrorEvent(ws: WebSocket, errorMessage: string): void {
    this.sendEvent(ws, {
      type: WebSocketEventType.ERROR,
      timestamp: Date.now(),
      error: 'SERVER_ERROR',
      message: errorMessage,
    });
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Broadcast to all connected clients
   */
  private broadcast(event: WebSocketEvent): void {
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        this.sendEvent(client, event);
      }
    });
  }

  /**
   * Close server
   */
  close(): void {
    console.log('🛑 Shutting down server...');
    this.clients.forEach((client) => client.close());
    this.wss.close();
  }
}

// Start server
const server = new MockMusicGenerationServer(PORT);

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Received SIGINT, shutting down...');
  server.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, shutting down...');
  server.close();
  process.exit(0);
});
