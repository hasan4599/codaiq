'use client';

import { useEffect, useState } from 'react';
import { useEditorStore } from '@/lib/store/editorStore';
import { SiteConfig } from '@/lib/store/editorStore';

export default function PreviewPage({ params }: { params: { siteId: string } }) {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(`/api/sites/${params.siteId}/config`);
        if (!response.ok) throw new Error('Failed to fetch site config');
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error('Error fetching site config:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, [params.siteId]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p className="text-gray-600">Failed to load site configuration</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      style={{
        '--primary-color': config.theme.colors.primary,
        '--secondary-color': config.theme.colors.secondary,
        '--background-color': config.theme.colors.background,
        '--text-color': config.theme.colors.text,
        '--heading-font': config.theme.typography.headingFont,
        '--body-font': config.theme.typography.bodyFont,
      } as React.CSSProperties}
      className="min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {config.components.map((component) => (
          <div key={component.id} className="mb-8">
            {/* Render component based on type */}
            {/* This will be expanded with actual component rendering logic */}
            <pre className="bg-gray-100 p-4 rounded-lg">
              {JSON.stringify(component, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
} 