'use client';

import { DashboardSkeleton } from "@/components/sites/DashboardSkeleton";
import { useEffect, useState } from "react";
import { Fetch } from "@/hooks/fetch";
import DashboardHeader from "@/components/dashboard/header";
import DashboardSidebar from "@/components/dashboard/sidebar";
import Sites from "@/components/pages/sites";


export default function DashboardPage() {
  const [user, setUser] = useState<{ email: string, name: string, image: string, stripeCustomerId: string }>();
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
            image: response.avatarUrl,
            stripeCustomerId: response.stripeCustomerId
          });
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

  if (user && !user.stripeCustomerId) {
    if (user.email !== '') {
      window.location.href = '/'
    }
  }


  return (
    <div className="bg-gradient-to-br from-[#06081c] via-[#08071d] to-[#140625] w-full h-screen flex flex-col">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-20 h-[28rem] w-[28rem] rounded-full bg-[#0d1b4f] opacity-40 blur-3xl"></div>
        <div className="absolute bottom-[-10rem] right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-[#26004d] opacity-40 blur-3xl"></div>
      </div>
      {/* Header */}
      <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="w-full flex items-start justify-start" style={{ height: 'calc(100% - 64px)' }}>
        {/* Sidebar */}
        <DashboardSidebar
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="h-full w-full flex items-start justify-start p-6">
          <Sites />
        </main>
      </div>
    </div>
  );
} 