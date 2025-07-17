'use client';

import { useState } from 'react';
import { ISite } from '@/model/site';

export default function Domain({ site }: { site: ISite }) {
  const [domain, setDomain] = useState(site.deployDomain || '');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateDomain = (value: string) => {
    return /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateDomain(domain)) {
      setError('Please enter a valid domain (e.g., example.com)');
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with real API request to update domain
      await new Promise((r) => setTimeout(r, 1000));
      setSuccess('Domain updated successfully!');
    } catch (err) {
      setError('Failed to update domain. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="text-xl font-semibold">Domain Management</h2>

      <div className="rounded-md border border-yellow-500 bg-yellow-500/10 p-4 text-yellow-300 text-sm">
        <strong>Note:</strong> To use your own domain, a <span className="font-semibold">$5/month subscription</span> is required.
        <br />
        After entering your domain, make sure to create an <span className="font-semibold">A record</span> pointing to:
        <br />
        <span className="text-white">89.117.57.53</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="domain" className="block text-sm font-medium text-gray-300 mb-1">
            Custom Domain
          </label>
          <input
            id="domain"
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="yourdomain.com"
            className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-1">{success}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Domain'}
        </button>
      </form>

      <p className="text-xs text-gray-500 border-t border-gray-800 pt-4">
        Your domain will be connected once DNS propagation is complete and your subscription is active.
      </p>
    </div>
  );
}
