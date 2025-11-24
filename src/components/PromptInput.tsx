'use client';

import { useState } from 'react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  disabled?: boolean;
}

export function PromptInput({ onSubmit, disabled = false }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt.trim());
      setPrompt('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={disabled}
          placeholder="Describe the music you want to create..."
          className="w-full px-6 py-4 text-base bg-white/5 border border-white/10 rounded-2xl 
                   focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 
                   resize-none transition-all duration-300 min-h-[120px]
                   disabled:opacity-50 disabled:cursor-not-allowed
                   placeholder:text-muted"
          rows={4}
        />
        <button
          type="submit"
          disabled={disabled || !prompt.trim()}
          className="absolute bottom-4 right-4 px-6 py-2.5 bg-linear-to-r from-primary to-secondary 
                   text-white font-medium rounded-lg shadow-lg
                   hover:shadow-xl hover:scale-105 active:scale-95
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                   transition-all duration-300"
        >
          Generate
        </button>
      </div>
    </form>
  );
}
