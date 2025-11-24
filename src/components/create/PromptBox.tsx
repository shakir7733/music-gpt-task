'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, AudioLines, ChevronDown, Paperclip, Plus, Settings2 } from 'lucide-react';

interface PromptBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  isGenerating?: boolean;
  isConnected?: boolean;
}

export function PromptBox({
  value,
  onChange,
  onSubmit,
  disabled = false,
  isGenerating = false,
  isConnected = true,
}: PromptBoxProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showInitialAnimation, setShowInitialAnimation] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Mount animation with 4s duration limit
  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setShowInitialAnimation(false);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled && isConnected && !isGenerating) {
        onSubmit();
      }
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div 
      className={`
        relative w-[800px] mx-auto
        transition-all duration-500
        ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
 

      {/* Initial render flowing animation - Complex wave with vectors */}
      {!isFocused && showInitialAnimation && (
        <div
          className={`
            absolute -inset-2.5 rounded-4xl overflow-visible pointer-events-none
            transition-opacity duration-1000
            ${isMounted ? 'opacity-100' : 'opacity-0'}
          `}
          style={{ willChange: 'opacity' }}
        >
          {/* Wave container matching Figma specs */}
          <div 
            className="absolute w-[825px] h-40 -left-2.5 top-[5px]"
            style={{ willChange: 'transform' }}
          >
            {/* Group 1000002721 - Main gradient group */}
            <div 
              className="absolute w-[615.97px] h-[174.55px] left-[185.58px] top-[0.63px] animate-wave-flow-1"
              style={{
                filter: 'blur(26.2857px)',
                transform: 'matrix(-1, 0, 0.54, 0.84, 0, 0)',
              }}
            >
              {/* Vector gradients */}
              <div 
                className="absolute w-[340.66px] h-[56.24px] left-[405.47px] top-[104.01px]"
                style={{
                  background: '#E51ED8',
                  transform: 'matrix(-1, 0, 0.73, 0.68, 0, 0)',
                }}
              />
              <div 
                className="absolute w-[311.29px] h-[91.04px] left-[297.1px] top-[34.62px]"
                style={{
                  background: '#FF6A2F',
                  transform: 'matrix(-1, -0.07, 0.65, 0.76, 0, 0)',
                }}
              />
              <div 
                className="absolute w-[311.03px] h-12 left-[185.58px] top-[0.63px]"
                style={{
                  background: '#A52FFF',
                  transform: 'matrix(-1, -0.07, 0.64, 0.77, 0, 0)',
                }}
              />
              <div 
                className="absolute w-[401.11px] h-[72.17px] left-[425.58px] top-[8.69px]"
                style={{
                  background: '#A52FFF',
                  transform: 'matrix(-0.98, -0.19, 0.45, 0.89, 0, 0)',
                }}
              />
            </div>

            {/* Group 1000002722 - Color dodge blend */}
            <div 
              className="absolute w-[544.64px] h-[168.06px] left-[72.12px] top-[1.58px] animate-wave-flow-2"
              style={{
                mixBlendMode: 'color-dodge',
                filter: 'blur(26.2857px)',
                transform: 'matrix(-1, 0.06, 0.6, 0.8, 0, 0)',
              }}
            >
              {/* Vector gradients */}
              <div 
                className="absolute w-[328.58px] h-[49.26px] left-[267.71px] top-[92.35px]"
                style={{
                  background: '#D4DBFF',
                  transform: 'matrix(-1, 0.06, 0.79, 0.61, 0, 0)',
                }}
              />
              <div 
                className="absolute w-[298.47px] h-[78.54px] left-[164.41px] top-[61.25px]"
                style={{
                  background: '#402FFF',
                  transform: 'matrix(-1, 0, 0.71, 0.71, 0, 0)',
                }}
              />
              <div 
                className="absolute w-[298.23px] h-[41.35px] left-[218.58px] top-[117.63px]"
                style={{
                  background: '#FF9C6B',
                  transform: 'matrix(-1, 0, 0.7, 0.71, 0, 0)',
                }}
              />
              <div 
                className="absolute w-[380.19px] h-[60.91px] left-[288.46px] top-[31.09px]"
                style={{
                  background: '#FF9C6B',
                  transform: 'matrix(-0.99, -0.1, 0.5, 0.87, 0, 0)',
                }}
              />
            </div>

            {/* Group 1000002723 - Counter wave */}
            <div 
              className="absolute w-[831.93px] h-[175.78px] left-[23.76px] top-[13.51px] animate-wave-flow-3"
              style={{
                mixBlendMode: 'color-dodge',
                filter: 'blur(26.2857px)',
                transform: 'matrix(1, -0.01, -0.54, -0.84, 0, 0)',
              }}
            >
              {/* Vector gradients */}
              <div 
                className="absolute w-[340.96px] h-[47.67px] left-[281.57px] top-[24.63px]"
                style={{
                  background: '#D4DBFF',
                  transform: 'matrix(1, -0.01, -0.76, -0.65, 0, 0)',
                }}
              />
              <div 
                className="absolute w-[308.17px] h-[75.28px] left-[254.81px] top-[46.27px]"
                style={{
                  background: '#402FFF',
                  transform: 'matrix(1, 0.05, -0.66, -0.75, 0, 0)',
                }}
              />
              <div 
                className="absolute w-[307.94px] h-[39.6px] left-[337.17px] top-[28.58px]"
                style={{
                  background: '#FF9C6B',
                  transform: 'matrix(1, 0.05, -0.65, -0.76, 0, 0)',
                }}
              />
              <div 
                className="absolute w-[389.04px] h-[57.78px] left-[55.57px] top-[54.64px]"
                style={{
                  background: '#FF9C6B',
                  transform: 'matrix(0.99, 0.15, -0.41, -0.91, 0, 0)',
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main container */}
      <div className="relative flex flex-col items-center w-full h-[130px] bg-[#1d2125] rounded-4xl z-10">
        {/* Text Input Area */}
        <div className="flex flex-col items-start px-6 py-2 pt-6 gap-2.5 w-full h-[66px]">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Describe your song"
            className="w-full bg-transparent text-white placeholder:text-[#5D6165] resize-none focus:outline-none font-inter text-base leading-[19px] tracking-[0.02em]"
            disabled={disabled}
            rows={1}
          />
        </div>

        {/* Toolbar */}
        <div className="flex flex-row justify-between items-end px-3 py-3 w-full h-16">
          {/* Left Button Group */}
          <div className="flex flex-row items-center gap-2">
            {/* Attach Button */}
            <button 
              type="button"
              className="flex items-center justify-center w-10 h-10 border border-[#303438] rounded-full hover:bg-white/5 transition-colors"
            >
              <Paperclip className="w-5 h-5 text-[#BFC2C8]" />
            </button>

            {/* Controls Button */}
            <button 
              type="button"
              className="flex items-center justify-center w-10 h-10 border border-[#303438] rounded-full hover:bg-white/5 transition-colors"
            >
              <Settings2 className="w-5 h-5 text-[#BFC2C8]" />
            </button>

            {/* Waveform Button */}
            <button 
              type="button"
              className="flex items-center justify-center w-10 h-10 border border-[#303438] rounded-full hover:bg-white/5 transition-colors"
            >
              <AudioLines className="w-5 h-5 text-[#BFC2C8]" />
            </button>

            {/* Lyrics Button */}
            <button 
              type="button"
              className="flex items-center justify-center px-4 py-2 h-10 border border-[#303438] rounded-full hover:bg-white/5 transition-colors gap-1.5"
            >
              <Plus className="w-4 h-4 text-[#BFC2C8]" />
              <span className="font-inter font-semibold text-sm leading-[22px] tracking-[0.01em] text-white">
                Lyrics
              </span>
            </button>
          </div>

          {/* Right Button Group */}
          <div className="flex flex-row items-center gap-3">
            {/* Tools Dropdown */}
            <button 
              type="button"
              className="flex items-center justify-center px-4 py-2 h-10 border border-[#303438] rounded-full hover:bg-white/5 transition-colors gap-1.5"
            >
              <span className="font-inter font-semibold text-sm leading-[22px] tracking-[0.01em] text-white">
                Tools
              </span>
              <ChevronDown className="w-4 h-4 text-[#BFC2C8]" />
            </button>

            {/* Submit Button */}
            <button
              type="button"
              onClick={onSubmit}
              disabled={!value.trim() || isGenerating || !isConnected}
              className="relative flex items-center justify-center w-10 h-10 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all group"
            >
              <div className="absolute inset-0.5 bg-[#44484c] rounded-full group-hover:bg-[#525659] transition-colors" />
              <ArrowRight className="w-5 h-5 text-[#212529] relative" />
            </button>
          </div>
        </div>
      </div>

      {/* Spinning gradient border on focus */}
      {isFocused && (
        <div className="absolute inset-0 rounded-4xl overflow-hidden transition-opacity duration-700 -z-10">
          <div 
            className="absolute -inset-0.5 animate-spin-3s"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0%, #3B82F6 25%, #8B5CF6 50%, #EC4899 75%, transparent 100%)',
              willChange: 'transform',
            }}
          />
        </div>
      )}

      {/* Radial glow on focus */}
      {isFocused && (
        <div 
          className="absolute inset-0 -z-20 blur-3xl opacity-40 rounded-4xl pointer-events-none animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6), rgba(139, 92, 246, 0.6), rgba(236, 72, 153, 0.6))',
          }}
        />
      )}
    </div>
  );
}
