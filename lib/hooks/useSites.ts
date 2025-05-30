import useSWR from 'swr';
import { Site } from '@prisma/client';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useSites() {
  const {
    data: sites,
    error,
    isLoading,
    mutate
  } = useSWR<Site[]>('/api/sites', fetcher);

  const createSite = async (name: string) => {
    try {
      // Optimistic update
      const optimisticSite = {
        id: 'temp-id',
        name,
        slug: name.toLowerCase(),
        ownerId: 'loading',
        thumbnailUrl: '/thumbnails/default.png',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Update the local data immediately
      mutate([optimisticSite, ...(sites || [])], false);

      // Send the actual request
      const response = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });

      if (!response.ok) {
        throw new Error('Failed to create site');
      }

      // Trigger a revalidation to get the actual data
      mutate();

      return await response.json();
    } catch (error) {
      // Revert the optimistic update on error
      mutate();
      throw error;
    }
  };

  return {
    sites,
    error,
    isLoading,
    createSite
  };
} 