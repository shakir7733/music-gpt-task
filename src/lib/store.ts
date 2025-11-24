import { create } from 'zustand';
import { GenerationItem, GenerationStatus } from '@/types/generation';

/**
 * Zustand store interface for managing music generation state.
 * Provides actions for adding, updating, completing, and removing generation items.
 */
interface GenerationState {
  // State
  items: GenerationItem[];
  isConnected: boolean;
  currentGenerationId: string | null;

  // Actions
  addItem: (prompt: string) => string;
  updateItemStatus: (id: string, status: GenerationStatus) => void;
  updateItemProgress: (id: string, progress: number, stage?: string) => void;
  completeItem: (id: string, audioUrl: string, duration: number) => void;
  failItem: (id: string, errorMessage: string) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
  setConnected: (connected: boolean) => void;
  setCurrentGenerationId: (id: string | null) => void;
}

/**
 * Zustand store for managing music generation state across the application.
 * Automatically synced with WebSocket events via useWebSocketClient hook.
 * 
 * @example
 * const { items, addItem, startGeneration } = useGenerationStore();
 * const id = addItem("Create a happy song");
 */
export const useGenerationStore = create<GenerationState>((set) => ({
  // Initial state
  items: [],
  isConnected: false,
  currentGenerationId: null,

  /**
   * Add a new generation item to the store.
   * 
   * @param prompt - User's music description prompt
   * @returns The generated unique ID for this generation
   */
  addItem: (prompt: string) => {
    const id = `gen-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newItem: GenerationItem = {
      id,
      prompt,
      status: 'empty',
      createdAt: new Date(),
      title: '',
      imageUrl: undefined
    };

    set((state) => ({
      items: [...state.items, newItem],
    }));

    return id;
  },

  /**
   * Update the status of a generation item.
   * 
   * @param id - The generation ID
   * @param status - New status (empty | generating | completed | failed)
   */
  updateItemStatus: (id: string, status: GenerationStatus) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, status } : item
      ),
    }));
  },

  /**
   * Update item progress during generation.
   * 
   * @param id - The generation ID
   * @param progress - Progress percentage (0-100)
   * @param _stage - (Optional) Current generation stage (unused but kept for API compatibility)
   */
  updateItemProgress: (id: string, progress: number, _stage?: string) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, status: 'generating' as GenerationStatus, duration: progress }
          : item
      ),
    }));
  },

  /**
   * Mark a generation as completed with audio URL and duration.
   * 
   * @param id - The generation ID
   * @param audioUrl - URL to the generated audio file
   * @param duration - Audio duration in seconds
   */
  completeItem: (id: string, audioUrl: string, duration: number) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'completed' as GenerationStatus,
              audioUrl,
              duration,
              completedAt: new Date(),
            }
          : item
      ),
    }));
  },

  /**
   * Mark a generation as failed with error message.
   * 
   * @param id - The generation ID
   * @param errorMessage - Description of what went wrong
   */
  failItem: (id: string, errorMessage: string) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'failed' as GenerationStatus,
              errorMessage,
              completedAt: new Date(),
            }
          : item
      ),
    }));
  },

  /**
   * Remove a generation item from the store.
   * 
   * @param id - The generation ID to remove
   */
  removeItem: (id: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  /**
   * Clear all generation items from the store.
   */
  clearItems: () => {
    set({ items: [] });
  },

  /**
   * Update WebSocket connection status.
   * 
   * @param connected - Whether connected to the server
   */
  setConnected: (connected: boolean) => {
    set({ isConnected: connected });
  },

  /**
   * Set the ID of the currently active generation.
   * 
   * @param id - The generation ID or null if no active generation
   */
  setCurrentGenerationId: (id: string | null) => {
    set({ currentGenerationId: id });
  },
}));
