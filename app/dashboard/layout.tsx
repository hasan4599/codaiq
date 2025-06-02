'use client';

import { useAuth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
import DashboardHeader from '@/components/dashboard/header';
import DashboardSidebar from '@/components/dashboard/sidebar';
import { FloatingAIButton } from '@/components/shared/FloatingAIButton';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, userId } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isLoaded && !userId) {
      redirect('/sign-in');
    }
  }, [isLoaded, userId]);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <DashboardSidebar 
          open={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto w-full lg:w-[calc(100%-20rem)]">
          <div className="container mx-auto px-6">
            {children}
          </div>
        </main>

        {/* AI Assistant */}
        <FloatingAIButton />
      </div>
    </div>
  );
} 