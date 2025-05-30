'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useSites } from '@/lib/hooks/useSites';
import SiteCard from '@/components/sites/SiteCard';
import NewSiteButton from '@/components/sites/NewSiteButton';
import EmptyState from '@/components/sites/EmptyState';
import DashboardSkeleton from '@/components/sites/DashboardSkeleton';

export default function DashboardPage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const { sites, isLoading, error } = useSites();

  // Route guard
  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/sign-in');
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded || !userId) {
    return null;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-red-500">Failed to load sites. Please try again later.</p>
      </div>
    );
  }

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!sites?.length) {
    return (
      <>
        <EmptyState />
        <NewSiteButton />
      </>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {sites.map((site) => (
          <SiteCard key={site.id} site={site} />
        ))}
      </div>

      {/* Floating Action Button */}
      <NewSiteButton />
    </div>
  );
} 