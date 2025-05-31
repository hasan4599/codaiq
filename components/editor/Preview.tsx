import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faDesktop, faTabletAlt, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEditorStore, SiteConfig } from '@/lib/store/editorStore';
import { Loading } from '@/components/ui/loading';

type ViewportSize = "desktop" | "tablet" | "mobile";

const viewportSizes = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px"
};

interface PreviewProps {
  siteId: string;
}

export default function Preview({ siteId }: PreviewProps) {
  const [viewportSize, setViewportSize] = useState<ViewportSize>("desktop");
  const { config } = useEditorStore();

  return (
    <div className="flex flex-col h-full">
      {/* Viewport Controls */}
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

      {/* Preview Frame */}
      <div className="flex-1 overflow-auto p-4">
        <div className="h-full flex items-start justify-center">
          <div
            style={{ width: viewportSizes[viewportSize] }}
            className="h-full bg-white rounded-lg shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {config ? (
              <div 
                style={{
                  '--primary-color': config.theme.colors.primary,
                  '--secondary-color': config.theme.colors.secondary,
                  '--background-color': config.theme.colors.background,
                  '--text-color': config.theme.colors.text,
                  '--heading-font': config.theme.typography.headingFont,
                  '--body-font': config.theme.typography.bodyFont,
                } as React.CSSProperties}
                className="min-h-screen"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  {config.components.map((component: SiteConfig['components'][0]) => (
                    <div key={component.id} className="mb-8">
                      {/* Render component based on type */}
                      {/* This will be expanded with actual component rendering logic */}
                      <pre className="bg-gray-100 p-4 rounded-lg">
                        {JSON.stringify(component, null, 2)}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Loading title="Start editing to see your site preview" fullHeight={false} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 