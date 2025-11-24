'use client';

interface RecentGenerationItemProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  onPlay?: () => void;
}

/**
 * Recent Generation List Item Component
 * Displays individual generation with thumbnail, title, description, and play button
 */
export function RecentGenerationItem({
  title,
  description,
  imageUrl,
  onPlay,
}: RecentGenerationItemProps) {
  return (
    <div className="flex flex-col items-start gap-1 w-[800px]">
      {/* List Item Container */}
      <div className="flex flex-row items-center px-2 py-2.5 gap-7 w-[800px] rounded-3xl group hover:bg-white/5 transition-colors cursor-pointer relative">
        {/* Main Content Row */}
        <div className="flex flex-row items-center gap-3 flex-1 h-[60px]">
          {/* Thumbnail with Play Icon Overlay */}
          <div className="relative w-[60px] h-[60px] shrink-0 rounded-2xl overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-green-500/20 to-blue-500/20" />
            )}
            
            {/* Play Icon (hidden by default, shown on hover) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPlay?.();
              }}
              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>

          {/* Text Content */}
          <div className="flex flex-col justify-center items-start gap-1 flex-1 h-[51px]">
            {/* Title */}
            <h3 className="w-full font-inter font-normal text-base leading-[155%] tracking-[0.01em] text-[#E4E6E8] truncate">
              {title}
            </h3>
            
            {/* Description */}
            <p className="w-full font-inter font-normal text-sm leading-[160%] tracking-[0.01em] text-[#898C92] truncate">
              {description}
            </p>
          </div>
        </div>

        {/* Action Overlay (gradient fade with buttons) - hidden by default */}
        <div className="absolute right-2 flex-row items-center py-[18px] pl-12 pr-0 gap-4 w-[207px] h-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto hidden group-hover:flex"
             style={{
               background: 'linear-gradient(269.93deg, #1D2125 48.52%, rgba(29, 33, 37, 0) 99.69%)'
             }}>
          {/* Additional action buttons can go here */}
        </div>
      </div>
    </div>
  );
}
