'use client';

import { useState } from 'react';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { 
  faMessage,
  faCode,
  faCog,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface BuilderSidebarProps {
  onClose?: () => void;
}

const sidebarItems = [
  { icon: faMessage, label: 'Chat', id: 'chat' },
  { icon: faCode, label: 'Code', id: 'code' },
  { icon: faCog, label: 'Settings', id: 'settings' },
];

export default function BuilderSidebar({ onClose }: BuilderSidebarProps) {
  const [activeItem, setActiveItem] = useState('chat');

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
        <h2 className="text-lg font-semibold">AI Console</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "hover:bg-gray-800/50",
                activeItem === item.id ? "bg-blue-500/20 text-blue-500" : "text-gray-400"
              )}
            >
              <FontAwesomeIcon 
                icon={item.icon as IconProp} 
                className={cn(
                  "w-5 h-5",
                  activeItem === item.id ? "text-blue-500" : ""
                )} 
              />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Content Panel */}
        <div className="mt-8">
          <div className="text-sm text-gray-400">
            {activeItem === 'chat' && (
              <div className="space-y-4">
                <p>Chat interface coming soon...</p>
              </div>
            )}
            {activeItem === 'code' && (
              <div className="space-y-4">
                <p>Code editor coming soon...</p>
              </div>
            )}
            {activeItem === 'settings' && (
              <div className="space-y-4">
                <p>Settings panel coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 