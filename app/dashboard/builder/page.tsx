'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import BuilderSidebar from '@/components/builder/Sidebar';
import BuilderPreview from '@/components/builder/Preview';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSpinner, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TooltipProvider } from '@/components/ui/tooltip';

export default function BuilderPage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Route guard
  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/sign-in');
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded || !userId) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <FontAwesomeIcon icon={faSpinner} className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-xl">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
          </button>
          <span className="font-semibold">AI Console</span>
        </div>

        <div className="flex flex-1 h-full">
          {/* Left Sidebar - AI Console */}
          <div 
            className={`
              fixed md:relative inset-y-0 left-0 
              w-64 transform transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              md:translate-x-0
              border-r border-gray-800/50 bg-gray-900/50 backdrop-blur-xl
              z-20
            `}
          >
            <BuilderSidebar onClose={() => setIsSidebarOpen(false)} />
          </div>

          {/* Overlay for mobile */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-10"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Right Preview */}
          <div className="flex-1 h-full">
            <BuilderPreview />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
} 