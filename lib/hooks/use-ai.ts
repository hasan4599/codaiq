import { useState } from 'react';
import { toast } from 'sonner';

interface AIResponse {
  result: string;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface UseAIOptions {
  onSuccess?: (response: AIResponse) => void;
  onError?: (error: string) => void;
}

export function useAI(options: UseAIOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<AIResponse | null>(null);

  const generate = async (prompt: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate response');
      }

      setResponse(data);
      options.onSuccess?.(data);
      return data;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      options.onError?.(errorMessage);
      toast.error(errorMessage);
      return null;

    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setError(null);
    setResponse(null);
  };

  return {
    generate,
    reset,
    isLoading,
    error,
    response,
  };
} 