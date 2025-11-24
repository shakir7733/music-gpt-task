'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useGenerationStore } from '@/lib/store';
import { GenerationItemCard } from '@/components/profile/GenerationItemCard';
import { SkeletonCard } from '@/components/profile/SkeletonLoader';
import { componentTokens } from '@/styles/tokens';

export const RecentGenerationsPanel: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [displayedItems, setDisplayedItems] = useState<any[]>([]);

  const items = useGenerationStore((state) => state.items);
  const ITEMS_PER_PAGE = 5;

  // Sync displayed items with store (paginated)
  useEffect(() => {
    const itemsToShow = items.slice(0, page * ITEMS_PER_PAGE);
    setDisplayedItems(itemsToShow);
  }, [items, page]);

  // Handle horizontal scroll for pagination
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || isLoadingMore) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const scrollPercentage = (scrollLeft + clientWidth) / scrollWidth;

    // Load more when 80% scrolled
    if (scrollPercentage > 0.8 && displayedItems.length < items.length) {
      setIsLoadingMore(true);
      
      // Simulate loading delay
      setTimeout(() => {
        setPage((prev) => prev + 1);
        setIsLoadingMore(false);
      }, 500);
    }
  };

  // Empty state
  if (items.length === 0) {
    return (
      <div 
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 animate-slide-up"
        style={{
          backgroundColor: componentTokens.recentPanel.backgroundColor,
          backdropFilter: `blur(${componentTokens.recentPanel.backdropBlur})`,
        }}
      >
        <div 
          className="max-w-7xl mx-auto"
          style={{ padding: componentTokens.recentPanel.padding }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Generations</h2>
            <span className="text-sm text-gray-400">0 total</span>
          </div>
          <div className="flex items-center justify-center h-32 bg-white/5 rounded-xl border border-white/10">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-linear-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <p className="text-sm text-gray-400">No generations yet</p>
              <p className="text-xs text-gray-500 mt-1">Start creating music above!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 animate-slide-up"
      style={{
        backgroundColor: componentTokens.recentPanel.backgroundColor,
        backdropFilter: `blur(${componentTokens.recentPanel.backdropBlur})`,
      }}
    >
      <div 
        className="max-w-7xl mx-auto"
        style={{ padding: componentTokens.recentPanel.padding }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Generations</h2>
          <span className="text-sm text-gray-400">{items.length} total</span>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,255,255,0.2) transparent',
          }}
        >
          {/* Display Items */}
          {displayedItems.map((item, index) => (
            <div
              key={item.id}
              className="shrink-0 w-80 animate-slide-in-left"
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'backwards',
              }}
            >
              <GenerationItemCard item={item} />
            </div>
          ))}

          {/* Loading Skeleton */}
          {isLoadingMore && (
            <>
              {[...Array(3)].map((_, i) => (
                <div key={`skeleton-${i}`} className="shrink-0 w-80">
                  <SkeletonCard />
                </div>
              ))}
            </>
          )}

          {/* Load More Indicator */}
          {!isLoadingMore && displayedItems.length < items.length && (
            <div className="shrink-0 w-80 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-linear-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="text-sm text-gray-400">Scroll for more</p>
              </div>
            </div>
          )}
        </div>

        {/* Custom Scrollbar Styles */}
        <style jsx>{`
          div::-webkit-scrollbar {
            height: 8px;
          }
          div::-webkit-scrollbar-track {
            background: transparent;
          }
          div::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
          }
        `}</style>
      </div>
    </div>
  );
};
