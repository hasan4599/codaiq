import useSWR from 'swr';
import { Site } from '@prisma/client';
import { toast } from 'sonner';

interface SitesResponse {
  sites: Site[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Get the current origin or default to localhost:3001
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'http://localhost:3001';
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || 'Failed to fetch sites');
  }
  return res.json();
};

export function useSites() {
  const baseUrl = getBaseUrl();
  const {
    data,
    error,
    isLoading,
    mutate
  } = useSWR<SitesResponse>(`${baseUrl}/api/sites`, fetcher);

  const createSite = async (name: string, description?: string) => {
    try {
      // Optimistic update
      const optimisticSite: Partial<Site> = {
        id: 'temp-id',
        name,
        description,
        status: 'offline',
        ownerId: 'loading',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Update the local data immediately
      const optimisticData = {
        sites: [optimisticSite, ...(data?.sites || [])],
        metadata: data?.metadata || { total: 0, page: 1, limit: 10, totalPages: 1 }
      };
      
      mutate(optimisticData as SitesResponse, false);

      // Send the actual request
      const response = await fetch(`${baseUrl}/api/sites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
      });

      if (!response.ok) {
        throw new Error('Failed to create site');
      }

      // Trigger a revalidation to get the actual data
      mutate();
      toast.success('Site created successfully');

      return await response.json();
    } catch (error) {
      // Revert the optimistic update on error
      mutate();
      toast.error(error instanceof Error ? error.message : 'Failed to create site');
      throw error;
    }
  };

  return {
    sites: data?.sites || [],
    metadata: data?.metadata,
    error,
    isLoading,
    createSite
  };
} 