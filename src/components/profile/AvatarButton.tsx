'use client';

import { useState } from 'react';

interface AvatarButtonProps {
  onClick: () => void;
  hasNotifications?: boolean;
}

export function AvatarButton({ onClick, hasNotifications = false }: AvatarButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
      aria-label="Open profile"
    >
      {/* Avatar circle */}
      <div
        className={`
          w-10 h-10 rounded-full
          bg-linear-to-br from-primary to-secondary
          flex items-center justify-center
          transition-all duration-300
          ${isHovered ? 'scale-110 shadow-lg shadow-primary/30' : 'scale-100'}
          ring-2 ring-transparent hover:ring-primary/50
        `}
      >
        {/* User icon */}
        <svg
          className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>

      {/* Notification badge */}
      {hasNotifications && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full border-2 border-background animate-pulse-slow" />
      )}

      {/* Hover ring animation */}
      {isHovered && (
        <span className="absolute inset-0 rounded-full border-2 border-primary/50 animate-pulse-glow" />
      )}
    </button>
  );
}
