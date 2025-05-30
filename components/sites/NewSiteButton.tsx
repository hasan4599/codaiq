import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSites } from "@/lib/hooks/useSites";
import * as Dialog from '@radix-ui/react-dialog';

export default function NewSiteButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { createSite } = useSites();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setIsLoading(true);
      await createSite(name);
      setName('');
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating site:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button 
          className="fixed bottom-8 right-8 p-4 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-colors"
          aria-label="Create new site"
        >
          <FontAwesomeIcon icon={faPlus as IconProp} className="w-6 h-6" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content 
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-xl bg-gray-900 border border-gray-800/50 p-6 shadow-xl"
          aria-describedby="site-name-description"
        >
          <Dialog.Title className="text-xl font-semibold mb-4">
            Create New Site
          </Dialog.Title>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                Site Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="My Awesome Site"
                disabled={isLoading}
              />
              <p id="site-name-description" className="text-sm text-gray-500 mt-1">
                Enter a name for your new site. This will be used to generate a unique URL.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-4 py-2 text-sm text-gray-400 hover:text-gray-300 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading || !name.trim()}
              >
                {isLoading ? 'Creating...' : 'Create Site'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 