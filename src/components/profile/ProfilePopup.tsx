'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useGenerationStore } from '@/lib/store';
import { GenerationItemCard } from './GenerationItemCard';
import { SkeletonCard } from './SkeletonLoader';
import { componentTokens } from '@/styles/tokens';

interface ProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ITEMS_PER_PAGE = 5;

export function ProfilePopup({ isOpen, onClose }: ProfilePopupProps) {
  const { items } = useGenerationStore();
  const [displayedItems, setDisplayedItems] = useState<typeof items>([]);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Sync with store - real-time updates from WebSocket
  useEffect(() => {
    if (isOpen) {
      // Show first page of items
      const initialItems = items.slice(0, ITEMS_PER_PAGE);
      setDisplayedItems(initialItems);
      setPage(1);
      setHasMore(items.length > ITEMS_PER_PAGE);
    }
  }, [isOpen, items]);

  // Handle infinite scroll
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || isLoadingMore || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

    // Load more when user scrolls 80% down
    if (scrollPercentage > 0.8) {
      setIsLoadingMore(true);

      // Simulate loading delay
      setTimeout(() => {
        const nextPage = page + 1;
        const startIndex = page * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const newItems = items.slice(startIndex, endIndex);

        if (newItems.length > 0) {
          setDisplayedItems((prev) => [...prev, ...newItems]);
          setPage(nextPage);
          setHasMore(endIndex < items.length);
        } else {
          setHasMore(false);
        }

        setIsLoadingMore(false);
      }, 800);
    }
  }, [isLoadingMore, hasMore, page, items]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleRetry = (id: string) => {
    // Non-functional placeholder
    console.log('Retry generation:', id);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-black/20 backdrop-blur-sm z-40
          transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={onClose}
      />

      {/* Popup */}
      <div
        ref={popupRef}
        className={`
          fixed top-20 right-6 z-50
          w-full
          border border-white/10 shadow-2xl
          flex flex-col
          transition-all duration-300 origin-top-right
          ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
        style={{
          maxWidth: componentTokens.profilePopup.width,
          maxHeight: componentTokens.profilePopup.maxHeight,
          borderRadius: componentTokens.profilePopup.borderRadius,
          backgroundColor: componentTokens.profilePopup.backgroundColor,
          backdropFilter: `blur(${componentTokens.profilePopup.backdropBlur})`,
          animation: isOpen ? 'spring-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : undefined,
        }}
      >
        {/* Header */}
        <div 
          className="border-b border-white/10 shrink-0"
          style={{ padding: componentTokens.profilePopup.padding }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-foreground">Your Generations</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300 group"
              aria-label="Close popup"
            >
              <svg
                className="w-5 h-5 text-muted group-hover:text-foreground group-hover:rotate-90 transition-all duration-300"
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
          </div>
          <p className="text-sm text-muted">
            {items.length === 0
              ? 'No generations yet'
              : `${items.length} generation${items.length === 1 ? '' : 's'}`}
          </p>
        </div>

        {/* Content */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-6 space-y-3"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(99, 102, 241, 0.3) transparent',
          }}
        >
          {/* Empty State */}
          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
              <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-4 animate-float">
                <svg
                  className="w-10 h-10 text-muted"
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
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No generations yet
              </h3>
              <p className="text-sm text-muted max-w-xs">
                Start creating music to see your generations here
              </p>
            </div>
          )}

          {/* Generation Items */}
          {displayedItems.map((item, index) => (
            <div
              key={item.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <GenerationItemCard item={item} onRetry={handleRetry} />
            </div>
          ))}

          {/* Loading More Skeleton */}
          {isLoadingMore && (
            <div className="space-y-3 animate-fade-in">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}

          {/* End of list indicator */}
          {!hasMore && items.length > 0 && (
            <div className="text-center py-4 text-sm text-muted animate-fade-in">
              <div className="flex items-center justify-center gap-2">
                <div className="w-12 h-px bg-white/10" />
                <span>You've reached the end</span>
                <div className="w-12 h-px bg-white/10" />
              </div>
            </div>
          )}
        </div>

        {/* Footer - Quick Stats */}
        {items.length > 0 && (
          <div className="p-4 border-t border-white/10 shrink-0 bg-white/5">
            <div className="flex items-center justify-around text-center">
              <div>
                <div className="text-lg font-bold text-primary">
                  {items.filter((i) => i.status === 'completed').length}
                </div>
                <div className="text-xs text-muted">Completed</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <div className="text-lg font-bold text-warning">
                  {items.filter((i) => i.status === 'generating').length}
                </div>
                <div className="text-xs text-muted">Generating</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <div className="text-lg font-bold text-error">
                  {items.filter((i) => i.status === 'failed').length}
                </div>
                <div className="text-xs text-muted">Failed</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
