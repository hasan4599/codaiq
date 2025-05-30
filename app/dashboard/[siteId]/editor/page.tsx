'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSpinner, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditorSidebar from '@/components/editor/Sidebar';
import Preview from '@/components/editor/Preview';
import { useEditorStore } from '@/lib/store/editorStore';

export default function EditorPage({ params }: { params: { siteId: string } }) {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { setSiteId, setConfig, isDirty } = useEditorStore();

  // Route guard and site config loading
  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/sign-in');
      return;
    }

    const loadSiteConfig = async () => {
      try {
        const response = await fetch(`/api/sites/${params.siteId}/config`);
        if (!response.ok) throw new Error('Failed to fetch site config');
        const config = await response.json();
        setSiteId(params.siteId);
        setConfig(config);
      } catch (error) {
        console.error('Error loading site config:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      loadSiteConfig();
    }
  }, [isLoaded, userId, router, params.siteId, setSiteId, setConfig]);

  // Save warning on navigation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  if (!isLoaded || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900/50 backdrop-blur-xl">
        <div className="text-center">
          <FontAwesomeIcon 
            icon={faSpinner as IconProp} 
            className="w-8 h-8 animate-spin text-blue-500 mb-4" 
          />
          <h2 className="text-xl font-semibold">Loading Editor...</h2>
        </div>
      </div>
    );
  }

  if (!userId) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      {/* Mobile Drawer Overlay */}
      {isMobileDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-20"
          onClick={() => setIsMobileDrawerOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed md:relative
          inset-y-0 left-0
          w-80 md:w-auto
          transform transition-transform duration-300 ease-in-out
          ${isMobileDrawerOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isSidebarCollapsed ? 'md:w-16' : 'md:w-80'}
          bg-gray-900/95 backdrop-blur-xl
          border-r border-gray-800/50
          z-30
        `}
      >
        {/* Sidebar Content */}
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
            {!isSidebarCollapsed && (
              <h2 className="text-lg font-semibold truncate">Site Editor</h2>
            )}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors hidden md:block"
              aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <FontAwesomeIcon 
                icon={(isSidebarCollapsed ? faChevronRight : faChevronLeft) as IconProp}
                className="w-4 h-4"
              />
            </button>
          </div>

          {/* Sidebar Content */}
          <EditorSidebar isCollapsed={isSidebarCollapsed} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden p-4 border-b border-gray-800/50">
          <button
            onClick={() => setIsMobileDrawerOpen(true)}
            className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
            aria-label="Open sidebar"
          >
            <FontAwesomeIcon icon={faChevronRight as IconProp} className="w-4 h-4" />
          </button>
        </div>

        {/* Preview Area */}
        <Preview siteId={params.siteId} />
      </div>
    </div>
  );
} 