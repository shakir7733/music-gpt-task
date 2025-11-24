 'use client';

import { RecentGenerationItem } from './RecentGenerationItem';

interface Generation {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  audioUrl?: string;
}

interface RecentGenerationsListProps {
  generations: Generation[];
  onPlayGeneration?: (id: string) => void;
}

/**
 * Recent Generations List Component
 * Displays a list of recent music generations with titles, descriptions, and play buttons
 */
export function RecentGenerationsList({
  generations,
  onPlayGeneration,
}: RecentGenerationsListProps) {
    console.log({generations})
  if (generations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
        </div>
        <p className="text-gray-500 text-sm">
          No recent generations. Start creating your first song!
        </p>
      </div>
    );
  } 
  
  return (
    <div className="space-y-1">
      {generations.map((generation) => (
        <RecentGenerationItem
          key={generation.id}
          id={generation.id}
          title={generation.title}
          description={generation.description}
          imageUrl={generation.imageUrl}
          onPlay={() => onPlayGeneration?.(generation.id)}
        />
      ))}
    </div>
  );
}
