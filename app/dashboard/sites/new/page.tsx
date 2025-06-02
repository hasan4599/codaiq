'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function NewSitePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/api/sites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          description: formData.get('description'),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create site');
      }

      const site = await response.json();
      toast.success('Site created successfully');
      router.push(`/dashboard/${site.id}/editor`);
    } catch (error) {
      console.error('Error creating site:', error);
      toast.error('Failed to create site');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-lg py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Create New Site</h1>
          <p className="text-gray-400">Fill in the details below to create your new site.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Site Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full p-2 rounded-lg border border-gray-800/50 bg-gray-900/50"
              placeholder="My Awesome Site"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="w-full p-2 rounded-lg border border-gray-800/50 bg-gray-900/50"
              placeholder="A brief description of your site"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating...' : 'Create Site'}
          </button>
        </form>
      </div>
    </div>
  );
} 