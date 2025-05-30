'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import BuilderSidebar from '@/components/builder/Sidebar';
import BuilderPreview from '@/components/builder/Preview';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BuilderPage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  // Route guard
  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/sign-in');
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-gray-900/50 backdrop-blur-xl">
        <div className="text-center">
          <FontAwesomeIcon 
            icon={faSpinner as IconProp} 
            className="w-8 h-8 animate-spin text-blue-500 mb-4" 
          />
          <h2 className="text-xl font-semibold">Loading Builder...</h2>
        </div>
      </div>
    );
  }

  if (!userId) {
    return null;
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-full max-w-xs border-r border-gray-800/50 bg-gray-900/50 backdrop-blur-xl md:block">
        <BuilderSidebar />
      </div>

      {/* Right Preview */}
      <div className="flex-1 overflow-auto bg-gray-900/30 backdrop-blur-sm">
        <BuilderPreview />
      </div>
    </div>
  );
} 