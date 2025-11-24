'use client';

import { useGenerationStore } from '@/lib/store';
import { AlertTriangle, Info, Play, X } from 'lucide-react';

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Profile Menu Popup Component
 * Shows user profile, credits, and generation history with animations
 */
export function ProfileMenu({ isOpen, onClose }: ProfileMenuProps) {
  const { items } = useGenerationStore();

  if (!isOpen) return null;

  // Get all generations for display
  const generations = items.slice(0, 10);
  const hasGenerations = generations.length > 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Popup */}
      <div className="fixed top-[68px] right-4 w-[400px] bg-[#16191C] rounded-[20px] border border-[#1D2125] shadow-[0_0_24px_rgba(0,0,0,0.48)] z-50">
        {/* Scrollable Content */}
        <div className="flex flex-col gap-5 p-4 max-h-[639px] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div 
              className="relative w-[60px] h-[60px] rounded-full flex items-center justify-center text-white text-xl"
              style={{
                background: 'linear-gradient(312.58deg, rgba(200, 0, 255, 0.05) 17.25%, rgba(255, 44, 155, 0.05) 37.17%, rgba(255, 123, 0, 0.05) 62.95%, rgba(255, 133, 4, 0.05) 75.03%, rgba(255, 211, 99, 0.05) 82.54%)',
                boxShadow: '0px 4px 32.6px -13px #AA00FF',
              }}
            >
              J
            </div>

            {/* User Info */}
            <div className="flex-1 flex flex-col gap-1">
              <h2 className="text-base font-medium text-[#E4E6E8] leading-[19px]">Johnny</h2>
              <p className="text-sm text-[#898C92] leading-[17px]">@johnny</p>
            </div>

            {/* Settings Icon */}
            <button className="w-6 h-6 text-[#777A80]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>

          {/* Credits Section */}
          <div className="flex items-center justify-between px-4 py-4 bg-[#212529] rounded-xl">
            <div className="flex items-center gap-[5px]">
              <span className="text-sm font-semibold text-[#E4E6E8] leading-[17px]">120/500 credits</span>
              <Info className="w-[18px] h-[18px] text-[#777A80]" strokeWidth={1.5} />
            </div>
            <button className="flex items-center gap-0.5 text-sm font-medium text-[#777A80] leading-[17px]">
              Top Up
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#303438]" />

          {/* Generation History */}
          <div className="flex flex-col gap-1">
            {hasGenerations ? (
              generations.map((item) => {
                // Determine item state
                const isGenerating = item.status === 'generating';
                const isFailed = item.status === 'failed';
                const isCompleted = item.status === 'completed';
                const progress = item.duration || 0;

                // Generating states (0-99%)
                if (isGenerating) {
                  return (
                    <div 
                      key={item.id}
                      className="flex items-center gap-2.5 p-2 rounded-xl"
                      style={{
                        background: progress < 50 
                          ? 'linear-gradient(90deg, #16191C 0%, #1D2125 40.99%, #16191C 41%)'
                          : '#16191C',
                      }}
                    >
                      <div className="relative w-16 h-16 bg-[#1D2125] rounded-2xl flex items-center justify-center overflow-hidden">
                        <div 
                          className="absolute inset-0" 
                          style={{
                            background: 'linear-gradient(180deg, #FF6200 0%, #AA00FF 100%)',
                            filter: 'blur(25px)',
                            transform: progress < 50 
                              ? 'matrix(0.99, 0.16, -0.37, 0.93, 0, 0)'
                              : 'matrix(0.99, -0.12, 0.33, 0.94, 0, 0)',
                          }} 
                        />
                        <span className="relative text-white/50 font-medium text-xs leading-[15px] z-10">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div className="flex-1 flex flex-col gap-1">
                        <p 
                          className="text-xs leading-3.5 truncate"
                          style={{
                            background: 'linear-gradient(90deg, #5D6165 56%, #BFC2C8 78%, #5D6165 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {item.prompt}
                        </p>
                        <p className="text-xs text-[#5D6165] leading-3.5">
                          {progress < 20 ? 'Generating' : progress < 50 ? 'Processing audio' : 'Starting AI audio engine'}
                        </p>
                      </div>
                      <div className="px-2 py-0.5 border border-[#5D6165] rounded-md text-xs text-[#BFC2C8]">
                        v{Math.floor(Math.random() * 2) + 1}
                      </div>
                    </div>
                  );
                }

                // Failed/Error states
                if (isFailed) {
                  return (
                    <div 
                      key={item.id}
                      className="relative flex items-start gap-1 p-4 bg-[rgba(238,13,55,0.08)] rounded-xl"
                    >
                      <div className="flex gap-1.5 flex-1">
                        <AlertTriangle className="w-5 h-5 text-[#EE0D37] shrink-0 mt-0.5" strokeWidth={1.67} />
                        <div>
                          <p className="text-sm text-[#EE0D37] leading-[19px]">Oops! Server busy.</p>
                          <p className="text-sm text-[#BFC2C8] leading-[17px]">
                            {item.prompt.substring(0, 40)}...
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Completed states
                if (isCompleted && item.audioUrl) {
                  return (
                    <div 
                      key={item.id}
                      className="flex items-center gap-3 p-2 bg-white/5 rounded-3xl hover:bg-white/10 transition-colors"
                    >
                      <div className="relative group w-16 h-16 rounded-2xl overflow-hidden cursor-pointer">
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: item.imageUrl ? `url(${item.imageUrl})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          }}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <div className="w-10 h-10 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col gap-1 min-w-0">
                        <p className="text-sm text-[#E4E6E8] leading-[17px] truncate">
                          {item.title || 'Generated Song'}
                        </p>
                        <p className="text-sm text-[#898C92] leading-[17px] truncate">
                          {item.prompt.substring(0, 30)}...
                        </p>
                      </div>
                      <div className="px-2 py-0 border border-[#5D6165] rounded-lg text-sm text-[#BFC2C8]">
                        v1
                      </div>
                    </div>
                  );
                }

                // Pending/default state
                return (
                  <div 
                    key={item.id}
                    className="flex items-center gap-3 p-2 bg-[#16191C] rounded-xl"
                  >
                    <div className="w-16 h-16 bg-[#1D2125] rounded-2xl flex items-center justify-center">
                      <span className="text-xs text-[#5D6165]">...</span>
                    </div>
                    <div className="flex-1 flex flex-col gap-1 min-w-0">
                      <p className="text-sm text-[#E4E6E8] leading-[17px] truncate">
                        {item.prompt}
                      </p>
                      <p className="text-sm text-[#5D6165] leading-[17px]">Pending</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                {/* Show demo states when no items */}
                {/* Insufficient Credits Warning */}
                <div className="relative flex items-start justify-between gap-2 p-4 bg-[rgba(216,156,58,0.08)] rounded-xl">
                  <div className="flex gap-1.5">
                    <AlertTriangle className="w-5 h-5 text-[#D89C3A] shrink-0 mt-0.5" strokeWidth={1.67} />
                    <div>
                      <p className="text-sm text-[#D89C3A] leading-5">Insufficient credits</p>
                      <p className="text-sm text-[#BFC2C8] leading-[17px] mt-1">Your credit balance: 0</p>
                    </div>
                  </div>
                  <button className="absolute right-4 top-4 px-3 py-[3px] border border-[#5D6165] rounded-[10px] text-sm font-medium text-white leading-[26px]">
                    Top Up
                  </button>
                  <button className="absolute -top-2 -right-2 p-1">
                    <div className="w-6 h-6 rounded-full bg-[#16191C] border border-[#303438] flex items-center justify-center">
                      <X className="w-3.5 h-3.5 text-[#505458]" strokeWidth={2} />
                    </div>
                  </button>
                </div>

                {/* Invalid Prompt Demo */}
                <div className="flex items-start gap-3 p-2 rounded-xl">
                  <div className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center text-4xl" style={{
                    background: 'linear-gradient(0deg, #D89C3A, #D89C3A), linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
                  }}>
                    😢
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <p className="text-sm font-semibold text-white leading-[17px]">Invalid Prompt</p>
                    <p className="text-sm leading-[17px]" style={{
                      background: 'linear-gradient(90deg, #5D6165 71.61%, rgba(128, 129, 130, 0) 98.8%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      This is not good prompt, throw invalid pr...
                    </p>
                    <p className="text-sm font-medium text-[#E4E6E8] leading-[21px]">
                      Your prompt does not seem to be valid. Please provide a prompt related to song creation, remixing, covers, or similar
                    </p>
                  </div>
                </div>

                {/* Skeleton Loading State */}
                <div className="flex items-center gap-3 p-2 rounded-3xl">
                  <div className="w-16 h-16 bg-[#262A2E] rounded-2xl" />
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="w-[149px] h-6 bg-[#262A2E] rounded-full" />
                    <div className="w-full h-3 bg-[#262A2E] rounded-full" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </>
  );
}
