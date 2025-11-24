'use client';

import { GenerationItem as GenerationItemType } from '@/types/generation';

interface GenerationItemProps {
  item: GenerationItemType;
  onRemove?: (id: string) => void;
}

export function GenerationItem({ item, onRemove }: GenerationItemProps) {
  const getStatusColor = () => {
    switch (item.status) {
      case 'generating':
        return 'border-primary';
      case 'completed':
        return 'border-success';
      case 'failed':
        return 'border-error';
      default:
        return 'border-white/10';
    }
  };

  const getStatusBadge = () => {
    switch (item.status) {
      case 'generating':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse-slow"></span>
            Generating...
          </span>
        );
      case 'completed':
        return (
          <span className="px-3 py-1 bg-success/10 text-success rounded-full text-sm">
            ✓ Completed
          </span>
        );
      case 'failed':
        return (
          <span className="px-3 py-1 bg-error/10 text-error rounded-full text-sm">
            ✗ Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`relative p-6 bg-white/5 border ${getStatusColor()} rounded-2xl 
                  transition-all duration-300 hover:bg-white/10 animate-slide-up`}
    >
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-4">
        {getStatusBadge()}
        {onRemove && (
          <button
            onClick={() => onRemove(item.id)}
            className="p-2 text-muted hover:text-error transition-colors"
            aria-label="Remove item"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Prompt */}
      <p className="text-foreground mb-3 text-base">{item.prompt}</p>

      {/* Metadata */}
      <div className="flex items-center gap-4 text-sm text-muted">
        <span>{new Date(item.createdAt).toLocaleTimeString()}</span>
        {item.duration && <span>Duration: {item.duration}s</span>}
      </div>

      {/* Error Message */}
      {item.status === 'failed' && item.errorMessage && (
        <div className="mt-3 p-3 bg-error/10 border border-error/20 rounded-lg text-sm text-error">
          {item.errorMessage}
        </div>
      )}

      {/* Audio Player */}
      {item.status === 'completed' && item.audioUrl && (
        <div className="mt-4">
          <audio controls className="w-full">
            <source src={item.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {/* Generating Animation */}
      {item.status === 'generating' && (
        <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-linear-to-r from-primary to-secondary animate-shimmer"></div>
        </div>
      )}
    </div>
  );
}
