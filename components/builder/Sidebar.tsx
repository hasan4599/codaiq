import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faComments,
  faCode,
  faCog,
  faChevronLeft,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import * as Tooltip from '@radix-ui/react-tooltip';

const menuItems = [
  {
    icon: faComments,
    label: "Chat",
    description: "AI Chat Interface",
    isLoading: true
  },
  {
    icon: faCode,
    label: "Code",
    description: "View Generated Code",
    isLoading: false
  },
  {
    icon: faCog,
    label: "Settings",
    description: "Builder Settings",
    isLoading: false
  }
];

export default function BuilderSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Tooltip.Provider delayDuration={200}>
      <div className={`h-full flex flex-col ${isCollapsed ? 'w-16' : 'w-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold">AI Console</h2>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <FontAwesomeIcon 
              icon={faChevronLeft as IconProp} 
              className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-2">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors relative ${
                        isCollapsed ? 'justify-center' : ''
                      } ${item.isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={item.isLoading}
                    >
                      <FontAwesomeIcon 
                        icon={item.icon as IconProp} 
                        className={`w-5 h-5 ${item.isLoading ? 'opacity-0' : ''}`}
                      />
                      {item.isLoading && (
                        <FontAwesomeIcon 
                          icon={faSpinner as IconProp} 
                          className="w-5 h-5 animate-spin absolute left-3"
                        />
                      )}
                      {!isCollapsed && (
                        <span className="text-sm font-medium flex-1 text-left">
                          {item.label}
                          {item.isLoading && (
                            <span className="text-xs text-blue-400 ml-2">
                              Loading...
                            </span>
                          )}
                        </span>
                      )}
                    </button>
                  </Tooltip.Trigger>
                  {isCollapsed && (
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-xl border border-gray-800/50"
                        side="right"
                        sideOffset={5}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{item.label}</span>
                          <span className="text-gray-400 text-xs">{item.description}</span>
                          {item.isLoading && (
                            <span className="text-blue-400 text-xs mt-1">Loading...</span>
                          )}
                        </div>
                        <Tooltip.Arrow className="fill-gray-900" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  )}
                </Tooltip.Root>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Close Button */}
        <button
          className="md:hidden p-4 w-full text-center text-sm text-gray-400 hover:text-gray-300 transition-colors border-t border-gray-800/50"
          onClick={() => setIsCollapsed(true)}
        >
          Close Sidebar
        </button>
      </div>
    </Tooltip.Provider>
  );
} 