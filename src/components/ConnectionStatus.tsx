'use client';

interface ConnectionStatusProps {
  isConnected: boolean;
}

export function ConnectionStatus({ isConnected }: ConnectionStatusProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
      <div
        className={`w-2.5 h-2.5 rounded-full transition-colors ${
          isConnected ? 'bg-success animate-pulse-slow' : 'bg-error'
        }`}
      />
      <span className="text-sm text-muted">
        {isConnected ? 'Connected' : 'Disconnected'}
      </span>
    </div>
  );
}
