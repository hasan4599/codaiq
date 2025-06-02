import { useState, useEffect } from 'react';
import { useAI } from '@/lib/hooks/use-ai';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles } from 'lucide-react';

export function AIAssistant() {
  const [prompt, setPrompt] = useState('');
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const { generate, isLoading, response, error, reset } = useAI({
    onSuccess: () => {
      setPrompt('');
    },
  });

  const examplePrompts = [
    "Create a modern e-commerce website with a shopping cart",
    "Design a portfolio website with a blog section",
    "Build a task management app with real-time updates"
  ];

  useEffect(() => {
    if (response) return; // Stop animation if there's a response

    const timer = setInterval(() => {
      const nextIndex = (currentExampleIndex + 1) % examplePrompts.length;
      setCurrentExampleIndex(nextIndex);
      setPrompt(examplePrompts[nextIndex]);
    }, 3000); // Change text every 3 seconds

    // Set initial prompt
    setPrompt(examplePrompts[currentExampleIndex]);

    return () => clearInterval(timer);
  }, [currentExampleIndex, response]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    await generate(prompt);
  };

  return (
    <div className="flex flex-col max-w-3xl mx-auto">
      {!response && (
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Build something with Codiaq
          </h1>
          <p className="text-base text-muted-foreground mt-1">
            Idea to app in seconds, with your personal full stack engineer
          </p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-4">
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        {response && (
          <div className="space-y-2">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="prose prose-invert max-w-none">
                <p className="text-sm text-blue-200">{response.result}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-2">
        <form onSubmit={handleSubmit} className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <Textarea
              value={prompt}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
              placeholder="Describe your app idea..."
              className="min-h-[80px] max-h-[160px] resize-none bg-background/50 pr-24"
              disabled={isLoading}
            />
            {!response && (
              <div className="absolute right-3 top-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-400" />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Button 
              type="submit" 
              size="icon" 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              disabled={isLoading || !prompt.trim()}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              )}
            </Button>
            {response && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={reset}
                disabled={isLoading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
} 