'use client';

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { 
  faRocket,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BuilderPreview() {
  return (
    <div className="flex flex-col h-full bg-gray-900/30">
      {/* Preview Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-xl">
        <h2 className="font-semibold">Preview</h2>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" />
          Initializing AI...
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-4">
        <div className="h-full flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6 bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50">
            <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
              <FontAwesomeIcon icon={faRocket} className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Builder Coming Soon</h3>
            <p className="text-gray-400">
              Our advanced AI-powered website builder is being fine-tuned. Stay tuned for an amazing website building experience!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 