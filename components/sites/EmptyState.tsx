'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { server } from "@/url";

export function EmptyState() {
  const handleNavigate = () => {
    window.location.href = `${server}/projects/new`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-2 md:p-8 relative w-full">
      <div className="w-20 h-20 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
        <FontAwesomeIcon icon={faRocket} className="w-10 h-10 text-blue-500" />
      </div>
      <h3 className="text-lg md:text-2xl font-semibold mb-2">Create Your First Site</h3>
      <p className="text-gray-400 md:max-w-md text-sm md:text-md mb-2">
        Get started by creating your first website. Our AI-powered builder will help you create a professional NEXTJS site in minutes.
      </p>
      <button
        onClick={handleNavigate}
        className="text-sm md:text-md px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        Create New Project
      </button>
    </div>
  );
}
