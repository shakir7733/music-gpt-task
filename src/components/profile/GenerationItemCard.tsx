'use client';

import { GenerationItem } from '@/types/generation';
import { useState } from 'react';

interface GenerationItemCardProps {
  item: GenerationItem;
  onRetry?: (id: string) => void;
}

export function GenerationItemCard({ item, onRetry }: GenerationItemCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = () => {
    switch (item.status) {
      case 'generating':
        return 'border-primary/50 bg-primary/5';
      case 'completed':
        return 'border-success/50 bg-success/5';
      case 'failed':
        return 'border-error/50 bg-error/5';
      default:
        return 'border-white/10 bg-white/5';
    }
  };

  const getStatusIcon = () => {
    switch (item.status) {
      case 'generating':
        return (
          <svg
            className="w-5 h-5 text-primary animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        );
      case 'completed':
        return (
          <svg
            className="w-5 h-5 text-success"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'failed':
        return (
          <svg
            className="w-5 h-5 text-error"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (item.status) {
      case 'generating':
        return 'Generating...';
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      default:
        return 'Pending';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div
      className={`
        relative p-4 rounded-xl border
        transition-all duration-300
        ${getStatusColor()}
        ${isHovered && item.status === 'completed' ? 'scale-[1.02] shadow-xl drop-shadow-[0_8px_16px_rgba(16,185,129,0.25)]' : ''}
        ${isHovered && item.status !== 'generating' ? '-translate-y-2' : 'translate-y-0'}
        ${item.status === 'generating' ? 'animate-pulse-slow' : ''}
      `}
      style={{ transition: 'all 0.4s cubic-bezier(0.17, 0.55, 0.55, 1)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span
            className={`
              text-sm font-medium
              ${item.status === 'generating' ? 'text-primary' : ''}
              ${item.status === 'completed' ? 'text-success' : ''}
              ${item.status === 'failed' ? 'text-error' : ''}
              ${item.status === 'empty' ? 'text-muted' : ''}
            `}
          >
            {getStatusText()}
          </span>
        </div>
        <span className="text-xs text-muted">{formatTimestamp(item.createdAt)}</span>
      </div>

      {/* Prompt */}
      <div className="mb-3">
        <p className="text-sm text-foreground line-clamp-2 leading-relaxed">
          {item.prompt}
        </p>
      </div>

      {/* Progress bar for generating state */}
      {item.status === 'generating' && item.duration !== undefined && (
        <div className="mb-3">
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-primary to-secondary transition-all duration-500 relative overflow-hidden"
              style={{ width: `${item.duration}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted">Progress</span>
            <span className="text-xs text-primary font-medium">{Math.round(item.duration)}%</span>
          </div>
        </div>
      )}

      {/* Completed state - visual placeholder */}
      {item.status === 'completed' && (
        <div className="mb-3 relative group">
          <div className="h-20 bg-linear-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center overflow-hidden">
            {/* Waveform visualization placeholder */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-primary/60 rounded-full transition-all duration-300"
                  style={{
                    height: `${Math.random() * 40 + 10}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Failed state - error message and retry */}
      {item.status === 'failed' && (
        <div className="space-y-2">
          {item.errorMessage && (
            <p className="text-xs text-error/80 bg-error/10 px-3 py-2 rounded-lg">
              {item.errorMessage}
            </p>
          )}
          {onRetry && (
            <button
              onClick={() => onRetry(item.id)}
              className="w-full px-3 py-2 bg-error/20 hover:bg-error/30 text-error text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <svg
                className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Retry Generation
            </button>
          )}
        </div>
      )}

      {/* Footer metadata */}
      {item.status === 'completed' && item.duration && (
        <div className="flex items-center justify-between text-xs text-muted">
          <span>Duration: {item.duration}s</span>
          {item.completedAt && (
            <span>{formatTimestamp(item.completedAt)}</span>
          )}
        </div>
      )}

      {/* Breathing animation for generating state */}
      {item.status === 'generating' && (
        <div className="absolute inset-0 rounded-xl border-2 border-primary/30 animate-pulse-glow pointer-events-none" />
      )}
    </div>
  );
}
