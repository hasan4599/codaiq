'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AIAssistant } from '@/components/shared/AIAssistant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faRobot, faComment, faCode, faCog } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { cn } from '@/lib/utils';

type AIMode = 'chat' | 'code' | 'settings';

export default function AIWebbuilderPage() {
  const [selectedMode, setSelectedMode] = useState<AIMode>('chat');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const modes = [
    { id: 'chat', label: 'Chat', icon: faComment },
    { id: 'code', label: 'Code', icon: faCode },
    { id: 'settings', label: 'Settings', icon: faCog },
  ] as const;

  const renderContent = () => {
    switch (selectedMode) {
      case 'chat':
        return <AIAssistant />;
      case 'code':
        return (
          <div className="p-6 text-center text-gray-400">
            Code generation interface coming soon...
          </div>
        );
      case 'settings':
        return (
          <div className="p-6 text-center text-gray-400">
            AI settings interface coming soon...
          </div>
        );
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div
        className={cn(
          "h-full transition-all duration-300 ease-in-out border-r border-border bg-card",
          isSidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            className="m-2"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FontAwesomeIcon
              icon={isSidebarOpen ? faChevronLeft : faChevronRight}
              className="h-4 w-4"
            />
          </Button>

          {/* Navigation Items */}
          <div className="flex flex-col gap-2 p-2">
            {modes.map((mode) => (
              <Button
                key={mode.id}
                variant={selectedMode === mode.id ? "secondary" : "ghost"}
                className={cn(
                  "justify-start",
                  isSidebarOpen ? "px-4" : "px-0 justify-center"
                )}
                onClick={() => setSelectedMode(mode.id)}
              >
                <FontAwesomeIcon
                  icon={mode.icon as IconProp}
                  className="h-4 w-4"
                />
                {isSidebarOpen && (
                  <span className="ml-2">{mode.label}</span>
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-background to-background/50">
        <div className="w-full max-w-3xl px-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
} 