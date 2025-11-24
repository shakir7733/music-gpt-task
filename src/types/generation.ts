/**
 * Generation Status Types
 */
export type GenerationStatus = 'empty' | 'generating' | 'completed' | 'failed';

/**
 * Generation Item Interface
 */
export interface GenerationItem {
  title: string;
  imageUrl: any;
  id: string;
  prompt: string;
  status: GenerationStatus;
  createdAt: Date;
  completedAt?: Date;
  audioUrl?: string;
  duration?: number;
  errorMessage?: string;
}

/**
 * WebSocket Event Types
 */
export enum WebSocketEventType {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  ERROR = 'error',
  GENERATION_START = 'generation_start',
  GENERATION_PROGRESS = 'generation_progress',
  GENERATION_COMPLETE = 'generation_complete',
  GENERATION_FAILED = 'generation_failed',
}

/**
 * Base WebSocket Event
 */
export interface WebSocketBaseEvent {
  type: WebSocketEventType;
  timestamp: number;
}

/**
 * Connect Event
 */
export interface WebSocketConnectEvent extends WebSocketBaseEvent {
  type: WebSocketEventType.CONNECT;
  clientId: string;
}

/**
 * Disconnect Event
 */
export interface WebSocketDisconnectEvent extends WebSocketBaseEvent {
  type: WebSocketEventType.DISCONNECT;
  reason?: string;
}

/**
 * Error Event
 */
export interface WebSocketErrorEvent extends WebSocketBaseEvent {
  type: WebSocketEventType.ERROR;
  error: string;
  message: string;
}

/**
 * Generation Start Event
 */
export interface GenerationStartEvent extends WebSocketBaseEvent {
  type: WebSocketEventType.GENERATION_START;
  generationId: string;
  prompt: string;
}

/**
 * Generation Progress Event
 */
export interface GenerationProgressEvent extends WebSocketBaseEvent {
  type: WebSocketEventType.GENERATION_PROGRESS;
  generationId: string;
  progress: number; // 0-100
  stage: string;
}

/**
 * Generation Complete Event
 */
export interface GenerationCompleteEvent extends WebSocketBaseEvent {
  type: WebSocketEventType.GENERATION_COMPLETE;
  generationId: string;
  audioUrl: string;
  duration: number;
}

/**
 * Generation Failed Event
 */
export interface GenerationFailedEvent extends WebSocketBaseEvent {
  type: WebSocketEventType.GENERATION_FAILED;
  generationId: string;
  error: string;
  message: string;
}

/**
 * Union of all WebSocket Events
 */
export type WebSocketEvent =
  | WebSocketConnectEvent
  | WebSocketDisconnectEvent
  | WebSocketErrorEvent
  | GenerationStartEvent
  | GenerationProgressEvent
  | GenerationCompleteEvent
  | GenerationFailedEvent;

/**
 * WebSocket Message wrapper for sending
 */
export interface WebSocketMessage {
  event: WebSocketEvent;
  payload?: unknown;
}
