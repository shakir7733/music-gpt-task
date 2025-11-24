'use client';

import { useState, useRef } from 'react';
import { componentTokens } from '@/styles/tokens';

interface SubmitButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isGenerating?: boolean;
  label?: string;
}

interface RippleEffect {
  x: number;
  y: number;
  size: number;
  id: number;
}

export function SubmitButton({
  onClick,
  disabled = false,
  isGenerating = false,
  label = 'Generate Music',
}: SubmitButtonProps) {
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleIdRef = useRef(0);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isGenerating) return;

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple: RippleEffect = {
      x,
      y,
      size,
      id: rippleIdRef.current++,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsPressed(true);
    createRipple(event);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseEnter = () => {
    if (!disabled && !isGenerating) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleClick = () => {
    if (!disabled && !isGenerating) {
      onClick();
    }
  };

  return (
    <div className="flex justify-center w-full max-w-4xl mx-auto px-4 sm:px-6 mt-8">
      <button
        ref={buttonRef}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={disabled || isGenerating}
        className={`
          relative overflow-hidden
          text-base sm:text-lg font-semibold
          rounded-2xl
          bg-linear-to-r from-primary via-secondary to-accent
          text-white
          transition-all
          ${isHovered ? 'animate-gradient-shift' : ''}
          ${
            disabled || isGenerating
              ? 'opacity-50 cursor-not-allowed'
              : `
                hover:shadow-2xl hover:shadow-primary/40
                hover:drop-shadow-[0_0_20px_rgba(99,102,241,0.6)]
                cursor-pointer
              `
          }
          group
        `}
        style={{
          padding: componentTokens.submitButton.paddingY + ' ' + componentTokens.submitButton.paddingX,
          fontSize: componentTokens.submitButton.fontSize,
          borderRadius: componentTokens.submitButton.borderRadius,
          transform: isPressed 
            ? `scale(${componentTokens.submitButton.activeScale})` 
            : isHovered 
            ? `scale(${componentTokens.submitButton.hoverScale})` 
            : 'scale(1)',
          transition: 'all 0.4s cubic-bezier(0.17, 0.55, 0.55, 1)',
        }}
      >
        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none animate-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}

        {/* Shimmer effect on hover */}
        <span
          className={`
            absolute inset-0 opacity-0
            bg-linear-to-r from-transparent via-white/20 to-transparent
            ${!disabled && !isGenerating ? 'group-hover:opacity-100 group-hover:animate-shimmer' : ''}
          `}
        />

        {/* Button content */}
        <span className="relative flex items-center justify-center gap-3">
          {isGenerating ? (
            <>
              {/* Loading spinner */}
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 animate-spin"
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
              <span>Generating...</span>
            </>
          ) : (
            <>
              {/* Music note icon */}
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110 group-hover:rotate-12"
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
              <span>{label}</span>
            </>
          )}
        </span>

        {/* Glow effect on hover */}
        {!disabled && !isGenerating && (
          <span 
            className={`
              absolute inset-0 -z-10 blur-2xl transition-all duration-500
              bg-linear-to-r from-primary via-secondary to-accent
              ${isHovered ? 'opacity-70 scale-110' : 'opacity-0 scale-100'}
            `}
            style={{ transition: 'all 0.4s cubic-bezier(0.17, 0.55, 0.55, 1)' }}
          />
        )}
      </button>

      {/* Pressed state indicator */}
      {isPressed && !disabled && !isGenerating && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full rounded-2xl border-2 border-white/20 animate-pulse" />
        </div>
      )}
    </div>
  );
}
