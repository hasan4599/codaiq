import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faRocket, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

export default function BuilderPreview() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <FontAwesomeIcon 
            icon={faSpinner as IconProp} 
            className="w-8 h-8 animate-spin text-blue-500" 
          />
          <p className="text-gray-400">Loading preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-xl border border-gray-800/50 bg-gray-900/50 backdrop-blur-xl p-8 text-center transform transition-all duration-500 hover:scale-105">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
            <FontAwesomeIcon 
              icon={faRocket as IconProp} 
              className="w-8 h-8 text-blue-500" 
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">AI Website Builder</h2>
        <p className="text-gray-400 mb-6">
          Our next-generation AI website builder is coming soon. Get ready to create stunning websites with the power of artificial intelligence.
        </p>
        <div className="flex justify-center gap-4">
          <div className="flex-1 rounded-lg border border-gray-800/50 p-4 hover:bg-gray-800/30 transition-colors">
            <div className="text-2xl font-bold text-blue-500 mb-1">100+</div>
            <div className="text-sm text-gray-400">AI Components</div>
          </div>
          <div className="flex-1 rounded-lg border border-gray-800/50 p-4 hover:bg-gray-800/30 transition-colors">
            <div className="text-2xl font-bold text-green-500 mb-1">10x</div>
            <div className="text-sm text-gray-400">Faster Development</div>
          </div>
        </div>

        {/* Placeholder Status */}
        <div className="mt-8 pt-6 border-t border-gray-800/50">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm">
            <FontAwesomeIcon icon={faRocket as IconProp} className="w-4 h-4 mr-2" />
            Preview Mode
          </div>
        </div>
      </div>
    </div>
  );
} 