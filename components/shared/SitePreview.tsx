import { FC } from 'react';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faDesktop, faTabletAlt, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { SiteConfig } from '@/lib/store/editorStore';
import { Loading } from '@/components/ui/loading';
import { ComponentRenderer } from '@/components/shared/ComponentRenderer';

type ViewportSize = "desktop" | "tablet" | "mobile";

const viewportSizes = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px"
};

interface SitePreviewProps {
  config: SiteConfig | null;
  isLoading?: boolean;
  showViewportControls?: boolean;
  error?: string;
}

export const SitePreview: FC<SitePreviewProps> = ({ 
  config, 
  isLoading = false, 
  showViewportControls = true,
  error
}) => {
  const [viewportSize, setViewportSize] = useState<ViewportSize>("desktop");

  if (isLoading) {
    return <Loading title="Loading Preview..." />;
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return <Loading title="Start editing to see your site preview" fullHeight={false} />;
  }

  const {
    colors,
    typography,
    spacing,
    breakpoints
  } = config.theme;

  return (
    <div className="flex flex-col h-full">
      {/* Viewport Controls */}
      {showViewportControls && (
        <div className="flex items-center justify-center gap-4 py-4 border-b border-gray-800/50">
          <button
            onClick={() => setViewportSize("desktop")}
            className={`p-2 rounded-lg transition-colors ${
              viewportSize === "desktop" ? "text-blue-500" : "text-gray-400 hover:text-gray-300"
            }`}
            aria-label="Desktop view"
          >
            <FontAwesomeIcon icon={faDesktop as IconProp} className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewportSize("tablet")}
            className={`p-2 rounded-lg transition-colors ${
              viewportSize === "tablet" ? "text-blue-500" : "text-gray-400 hover:text-gray-300"
            }`}
            aria-label="Tablet view"
          >
            <FontAwesomeIcon icon={faTabletAlt as IconProp} className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewportSize("mobile")}
            className={`p-2 rounded-lg transition-colors ${
              viewportSize === "mobile" ? "text-blue-500" : "text-gray-400 hover:text-gray-300"
            }`}
            aria-label="Mobile view"
          >
            <FontAwesomeIcon icon={faMobileAlt as IconProp} className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Preview Frame */}
      <div className="flex-1 overflow-auto p-4">
        <div className="h-full flex items-start justify-center">
          <div
            style={{ width: viewportSizes[viewportSize] }}
            className="h-full bg-white rounded-lg shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div 
              style={{
                // Colors
                '--primary-color': colors.primary,
                '--secondary-color': colors.secondary,
                '--background-color': colors.background,
                '--text-color': colors.text,
                '--accent-color': colors.accent,
                '--muted-color': colors.muted,
                '--surface-color': colors.surface,

                // Typography
                '--heading-font': typography.headingFont,
                '--body-font': typography.bodyFont,
                '--base-size': typography.baseSize,
                '--scale-ratio': typography.scaleRatio,

                // Spacing
                '--space-base': spacing?.base,
                '--space-scale': spacing?.scale,
                '--container-padding': spacing?.container?.padding,
                '--container-max-width': spacing?.container?.maxWidth,

                // Breakpoints
                '--breakpoint-sm': breakpoints?.sm,
                '--breakpoint-md': breakpoints?.md,
                '--breakpoint-lg': breakpoints?.lg,
                '--breakpoint-xl': breakpoints?.xl,
              } as React.CSSProperties}
              className="min-h-screen"
            >
              <div 
                className="mx-auto transition-all duration-300"
                style={{
                  maxWidth: spacing?.container?.maxWidth || '80rem',
                  padding: spacing?.container?.padding || '1rem',
                }}
              >
                {config.components.map((component) => (
                  <ComponentRenderer 
                    key={component.id}
                    component={component}
                    viewportSize={viewportSize.toLowerCase() as ViewportSize}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 