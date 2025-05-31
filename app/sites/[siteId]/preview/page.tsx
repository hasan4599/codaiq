'use client';

import { useEffect, useState } from 'react';
import { SiteConfig } from '@/lib/store/editorStore';
import { SitePreview } from '@/components/shared/SitePreview';
import { toast } from 'sonner';

export default function PreviewPage({ params }: { params: { siteId: string } }) {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(`/api/sites/${params.siteId}/config`);
        if (!response.ok) {
          throw new Error('Failed to fetch site configuration');
        }
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error('Error fetching site config:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
        toast.error('Failed to load site configuration');
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, [params.siteId]);

  return (
    <SitePreview 
      config={config}
      isLoading={isLoading}
      error={error || undefined}
      showViewportControls={false}
    />
  );
} 