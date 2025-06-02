import { FC } from 'react';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faDesktop, faTabletAlt, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { SiteConfig } from '@/lib/store/editorStore';
import { Loading } from '@/components/ui/loading';

type ViewportSize = "desktop" | "tablet" | "mobile";

interface SitePreviewProps {
  config: SiteConfig | null;
  error?: string;
}

const viewportSizes = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px"
};

const viewportIcons = {
  desktop: faDesktop,
  tablet: faTabletAlt,
  mobile: faMobileAlt
};

export const SitePreview: FC<SitePreviewProps> = ({ config, error }) => {
  const [viewportSize, setViewportSize] = useState<ViewportSize>("desktop");

  if (error) {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <div className="max-w-md text-center">
          <h3 className="text-xl font-semibold mb-2">Error Loading Preview</h3>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return <Loading title="Loading preview..." />;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Preview Controls */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
        <div className="flex items-center gap-2">
          {(Object.keys(viewportSizes) as ViewportSize[]).map((size) => (
            <button
              key={size}
              onClick={() => setViewportSize(size)}
              className={`p-2 rounded-lg transition-colors ${
                viewportSize === size
                  ? "bg-blue-500/20 text-blue-500"
                  : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-100"
              }`}
              title={`${size.charAt(0).toUpperCase() + size.slice(1)} view`}
            >
              <FontAwesomeIcon 
                icon={viewportIcons[size] as IconProp} 
                className="w-5 h-5" 
              />
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-400">
          {viewportSize.charAt(0).toUpperCase() + viewportSize.slice(1)} View
        </div>
      </div>

      {/* Preview Frame */}
      <div className="flex-1 overflow-hidden bg-gray-800/50 p-4">
        <div
          className="h-full mx-auto bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300"
          style={{ 
            width: viewportSizes[viewportSize],
            maxWidth: "100%"
          }}
        >
          {/* TODO: Implement actual site preview */}
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Site preview coming soon...
          </div>
        </div>
      </div>
    </div>
  );
}; 