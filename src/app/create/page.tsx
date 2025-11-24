"use client";

import { useState } from "react";
import { useWebSocketClient } from "@/hooks/useWebSocketClient";
import { useGenerationStore } from "@/lib/store";
import { RecentGenerationsList } from "@/components/recent";

import { createGeneration } from '@/services/api';
import { PromptBox } from "@/components/create";

export default function CreatePage() {
  const [prompt, setPrompt] = useState("");
  const { startGeneration, isConnected } = useWebSocketClient();
  const { items, addItem } = useGenerationStore();

  const isGenerating = items.some((item) => item.status === "generating");

  const handleSubmit = async () => {
    if (!prompt.trim() || !isConnected || isGenerating) return;

    try {
      // Step 1: Submit prompt via REST (route handler)
      const { id: serverId } = await createGeneration(prompt);

      // Step 2: Create local item (keeps current store contract)
      const generationId = addItem(prompt);

      // Step 3: Start mock generation via WebSocket simulation
      startGeneration(generationId, prompt);
      setPrompt('');

      // Optional: map serverId -> local id, kept for future backend wiring
      console.debug('Created generation', { serverId, generationId });
    } catch (e) {
      console.error('Failed to create generation', e);
    }
  };

  // Get recent generations (completed ones)
  const recentGenerations = items
    .filter((item) => item.status === "completed")
    .slice(0, 10)
    .reverse()
    .map((item) => ({
      id: item.id,
      title: item.prompt.split(" ").slice(0, 3).join(" "),
      description: item.prompt,
      audioUrl: item.audioUrl,
    }));

  const handlePlayGeneration = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item?.audioUrl) {
      console.log("Playing:", item.audioUrl);
      // Add audio player logic here
    }
  };

  return (
    <div className="min-h-screen text-white">
      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Heading */}

        {/* Input Section */}
        <div className="mb-8 min-h-100 flex flex-col items-center justify-center">
          <div>
            <h1 className="text-3xl font-semibold text-center mb-8">
              What Song to Create?
            </h1>
            <PromptBox
              value={prompt}
              onChange={setPrompt}
              onSubmit={handleSubmit}
              disabled={isGenerating}
              isGenerating={isGenerating}
              isConnected={isConnected}
            />

            {/* Model Info */}
            <div className="mt-8 text-center">
              <span className="text-xs text-white/25">
                MusicGPT v6 Pro - Our latest AI audio model.{" "}
                <button className="text-white/25 underline hover:text-white">
                  Example prompts
                </button>
              </span>
            </div>
          </div>
        </div>

        {/* Recent Generations */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold mb-6">Recent generations</h2>
          <RecentGenerationsList
            generations={recentGenerations}
            onPlayGeneration={handlePlayGeneration}
          />
        </div>

        {/* Generating State */}
        {isGenerating && (
          <div className="mt-8 bg-[#1a1a1a] rounded-xl border border-white/10 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white mb-1">
                  Generating your song...
                </h3>
                <p className="text-sm text-gray-400">
                  {items.find((i) => i.status === "generating")?.prompt}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
