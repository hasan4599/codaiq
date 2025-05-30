import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6">
      {/* Illustration */}
      <div className="w-24 h-24 mb-6 rounded-full bg-blue-500/10 flex items-center justify-center">
        <FontAwesomeIcon 
          icon={faPlus as IconProp} 
          className="w-10 h-10 text-blue-500" 
        />
      </div>

      <h2 className="text-2xl font-semibold mb-2">No Sites Yet</h2>
      <p className="text-gray-400 mb-6 max-w-md">
        Get started by creating your first site. Our AI-powered builder will help you create a stunning website in minutes.
      </p>

      <button
        onClick={() => {
          // Find and click the NewSiteButton
          const newSiteButton = document.querySelector('[aria-label="Create new site"]');
          if (newSiteButton instanceof HTMLElement) {
            newSiteButton.click();
          }
        }}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Create Your First Site
      </button>
    </div>
  );
} 