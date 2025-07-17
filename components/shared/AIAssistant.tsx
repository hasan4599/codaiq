import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Undo2, Send } from "lucide-react";
import { Fetch } from "@/hooks/fetch";

export function AIAssistant() {
  const [prompt, setPrompt] = useState("");
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const examplePrompts = [
    "Create a modern e-commerce website with a shopping cart",
    "Design a portfolio website with a blog section",
    "Build a task management app with real-time updates",
  ];

  useEffect(() => {
    if (response) return;

    const timer = setInterval(() => {
      const nextIndex = (currentExampleIndex + 1) % examplePrompts.length;
      setCurrentExampleIndex(nextIndex);
      setPrompt(examplePrompts[nextIndex]);
    }, 4000);

    setPrompt(examplePrompts[currentExampleIndex]);

    return () => clearInterval(timer);
  }, [currentExampleIndex, response]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setResponse(null);

    const result = await Fetch({
      body: { message: prompt },
      api: "post/site/create",
      method: "POST",
      host: "server",
      loading: () => {},
    });

    if (result?.error) {
      setError(result.error);
    } else {
      setResponse(result);
      console.log("✅ Site initialized:", result?.title);
    }

    setIsLoading(false);
  };

  const reset = () => {
    setResponse(null);
    setPrompt("");
    setError(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10">
      {!response && (
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Build with Codiaq
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Your full-stack AI developer – from idea to app in seconds.
          </p>
        </div>
      )}

      <div className="flex flex-col space-y-4">
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        {response && (
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg transition-all">
            <p className="text-sm text-blue-200 whitespace-pre-wrap">
              {response.result || response.title || "AI successfully created your project."}
            </p>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col sm:flex-row gap-3 items-end"
      >
        <div className="flex-1 relative w-full">
          <Textarea
            value={prompt}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setPrompt(e.target.value)
            }
            placeholder="Describe your app idea..."
            className="min-h-[100px] max-h-[200px] resize-none bg-background/50 pr-20 shadow-sm"
            disabled={isLoading}
          />
          {!response && (
            <div className="absolute right-3 top-3 flex items-center gap-1 text-blue-400">
              <Sparkles className="h-4 w-4 animate-pulse" />
            </div>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <Button
            type="submit"
            size="icon"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            disabled={isLoading || !prompt.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
          {response && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={reset}
              disabled={isLoading}
            >
              <Undo2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
