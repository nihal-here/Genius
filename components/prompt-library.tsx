"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PromptLibraryProps {
  onSelect: (prompt: string) => void;
  type: "conversation" | "code" | "image" | "music" | "video";
}

const prompts = {
  conversation: [
    "Explain quantum computing in simple terms",
    "Write a creative story about a robot",
    "How do I plan a 3-day trip to Tokyo?",
    "Draft a professional email to a client",
  ],
  code: [
    "Simple toggle button using React hooks",
    "Python script to scrape a website",
    "Explain the difference between REST and GraphQL",
    "Write a Dockerfile for a Node.js app",
  ],
  image: [
    "A futuristic city with flying cars, cyberpunk style",
    "A serene lake at sunset, oil painting",
    "Portrait of a cute cat in a spacesuit",
    "Abstract geometric patterns, vibrant colors",
  ],
  music: [
    "Upbeat pop song with synthwave elements",
    "Relaxing piano melody for studying",
    "Cinematic orchestral score for an epic battle",
    "Lo-fi hip hop beat",
  ],
  video: [
    "Clown fish swimming around a coral reef",
    "A spaceship landing on Mars",
    "Time-lapse of a flower blooming",
    "A cyberpunk street scene at night",
  ],
};

export const PromptLibrary = ({ onSelect, type }: PromptLibraryProps) => {
  const currentPrompts = prompts[type] || [];

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {currentPrompts.map((prompt) => (
        <Button
          key={prompt}
          variant="outline"
          size="sm"
          onClick={() => onSelect(prompt)}
          className="text-xs bg-white/5 border-white/10 hover:bg-white/10 hover:text-white transition cursor-pointer"
        >
          {prompt}
        </Button>
      ))}
    </div>
  );
};
