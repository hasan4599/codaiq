'use client';

import { useSites } from "@/hooks/use-sites";
import { NewSiteButton } from "@/components/sites/NewSiteButton";
import { EmptyState } from "@/components/sites/EmptyState";
import { DashboardSkeleton } from "@/components/sites/DashboardSkeleton";
import SiteCard from "@/components/sites/SiteCard";
import { useEffect, useState } from "react";
import { Fetch } from "@/hooks/fetch";
import DashboardHeader from "@/components/dashboard/header";
import DashboardSidebar from "@/components/dashboard/sidebar";
import { FloatingAIButton } from "@/components/shared/FloatingAIButton";
import Sites from "@/components/pages/sites";

export default function DashboardPage() {
  const [user, setUser] = useState<{ email: string, name: string, image: string }>();
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      setLoading(true)
      const handle = async () => {
        const response = await Fetch({ body: '', api: 'get/user/selected', method: "GET", host: 'server', loading: (v) => { } })
        if (response !== null) {
          setUser({
            name: response.fullName,
            email: response.email,
            image: response.avatarUrl
          })
        }
      }
      handle();
    } finally {
      setLoading(false)
    }
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <DashboardSkeleton />
      </div>
    );
  }



  return (
    <div className="bg-gray-950 w-full h-screen flex flex-col">
      {/* Header */}
      <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="h-full w-full flex items-start justify-start">
        {/* Sidebar */}
        <DashboardSidebar
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="overflow-y-auto h-full w-full flex items-center justify-center">
          <Sites />
        </main>

        {/* AI Assistant */}
        <FloatingAIButton />
      </div>
    </div>
  );
} 