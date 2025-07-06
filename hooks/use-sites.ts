import useSWR from 'swr';
import { toast } from 'sonner';

export type Site = {
  id: string;
  name: string;
  description?: string;
  slug: string;
  status: 'offline' | 'online' | 'deploying';
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  domains: Array<{
    domain: string;
    status: string;
  }>;
};

type PaginatedResponse = {
  sites: Site[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

type UseSitesOptions = {
  page?: number;
  limit?: number;
  sort?: 'name' | 'createdAt' | 'status';
  order?: 'asc' | 'desc';
  search?: string;
  status?: 'offline' | 'online' | 'deploying';
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useSites() {
  const { 
    data: sites, 
    error, 
    isLoading,
    mutate
  } = useSWR<Site[]>('/api/sites', fetcher);

  const createSite = async (siteData: { name: string; description?: string }) => {
    try {
      const response = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteData),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to create site';
        try {
          const errorData = await response.text();
          errorMessage = errorData || errorMessage;
        } catch (e) {
          console.error('Error parsing error response:', e);
        }
        throw new Error(errorMessage);
      }

      const newSite = await response.json();
      await mutate();
      toast.success('Site created successfully');
      return newSite;
    } catch (error) {
      console.error('Error creating site:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create site');
      throw error;
    }
  };

  return {
    sites,
    isLoading,
    isError: error,
    mutate,
    createSite,
  };
} 