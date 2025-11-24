'use client';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  animation?: 'pulse' | 'shimmer' | 'wave';
}

export function Skeleton({
  className = '',
  variant = 'rectangular',
  animation = 'shimmer',
}: SkeletonProps) {
  const baseStyles = 'bg-white/10';
  
  const variantStyles = {
    text: 'rounded h-4',
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
  };

  const animationStyles = {
    pulse: 'animate-pulse-slow',
    shimmer: 'relative overflow-hidden before:absolute before:inset-0 before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
    wave: 'animate-pulse',
  };

  return (
    <div
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${animationStyles[animation]}
        ${className}
      `}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton variant="circular" className="w-8 h-8" />
        <Skeleton variant="text" className="w-20" />
      </div>

      {/* Title skeleton */}
      <Skeleton variant="text" className="w-3/4 h-5" />
      
      {/* Description skeleton */}
      <div className="space-y-2">
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-5/6" />
      </div>

      {/* Progress bar skeleton */}
      <Skeleton variant="rectangular" className="w-full h-2" />

      {/* Footer skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton variant="text" className="w-24" />
        <Skeleton variant="text" className="w-16" />
      </div>
    </div>
  );
}

export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

export function SkeletonAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <Skeleton
      variant="circular"
      className={sizeClasses[size]}
      animation="pulse"
    />
  );
}
