'use client';

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSites } from "@/hooks/use-sites";
import { SiteCard } from "@/components/sites/SiteCard";
import { NewSiteButton } from "@/components/sites/NewSiteButton";
import { EmptyState } from "@/components/sites/EmptyState";
import { DashboardSkeleton } from "@/components/sites/DashboardSkeleton";

export default function DashboardPage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const { sites, isLoading, isError } = useSites();

  // Route guard
  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/sign-in');
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded || !userId) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <DashboardSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-red-500">Failed to load sites. Please try again later.</p>
      </div>
    );
  }

  if (!sites?.length) {
    return (
      <div className="container mx-auto p-6">
        <EmptyState onCreate={() => {}} />
        <NewSiteButton />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map((site) => (
          <SiteCard key={site.id} site={site} />
        ))}
      </div>
      <NewSiteButton />
    </div>
  );
} 