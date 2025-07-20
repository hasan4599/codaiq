'use client';

import {
  MessageCircleCode,
  Eye,
  Import,
  Rocket,
} from 'lucide-react';
import { useState } from 'react';

export default function Header({
  activeTab,
  setActiveTab,
  deploy
}: {
  activeTab: 'chat' | 'preview';
  setActiveTab: (v: 'chat' | 'preview') => void;
  deploy: (v: string) => void
}) {
  const [showModal, setShowModal] = useState(false);
  const [spaceTitle, setSpaceTitle] = useState('');

  const handleDeploy = () => {
    // handle your deploy logic here with spaceTitle
    console.log('Deploying Space with title:', spaceTitle);
    deploy(spaceTitle)
    setShowModal(false);
    setSpaceTitle('');
  };

  return (
    <>
      <header className="border-b border-neutral-800 bg-neutral-950 text-white px-4 lg:px-6 h-[80px] flex items-center justify-between gap-4 z-20">
        {/* Left: Logo / Title */}
        <div className="w-[215px] flex items-center gap-2 lg:gap-3">
          <h1 className="text-lg lg:text-xl font-bold tracking-tight flex items-center">
            Codaiq
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-white text-black font-mono">
              v1
            </span>
          </h1>
        </div>

        {/* Center: Toggle Controls */}
        <div className="w-[215px] flex items-center justify-center gap-2 p-1 bg-neutral-800 border border-white/10 rounded-full">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-full transition ${activeTab === 'chat'
              ? 'bg-white text-black shadow'
              : 'text-white hover:bg-white/10'
              }`}
          >
            <MessageCircleCode className="size-4" />
            <span className="hidden md:inline">Chat</span>
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-full transition ${activeTab === 'preview'
              ? 'bg-white text-black shadow'
              : 'text-white hover:bg-white/10'
              }`}
          >
            <Eye className="size-4" />
            <span className="hidden md:inline">Preview</span>
          </button>
        </div>

        {/* Right: Project Actions */}
        <div className="w-[340px] flex items-center justify-end gap-3 lg:gap-4">
          {/* <button className="hidden lg:flex items-center gap-2 text-sm font-medium px-5 py-2 rounded-full border border-white bg-white text-black hover:bg-neutral-200 transition">
            <Import className="size-4" />
            Load Project
          </button> */}

          {/* <button className="lg:hidden flex items-center text-sm px-4 py-2 rounded-full border border-white bg-white text-black hover:bg-neutral-200 transition">
            Load
          </button> */}

          <button
            onClick={() => setShowModal(true)}
            className="hidden lg:flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full border border-white bg-transparent text-white hover:bg-white hover:text-black transition"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="size-4"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
            </svg>
            Save Project
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="lg:hidden flex items-center text-sm px-4 py-2 rounded-full border border-white bg-transparent text-white hover:bg-white hover:text-black transition"
          >
            Save
          </button>
        </div>
      </header>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-md p-6 space-y-4 text-white shadow-xl">
            <h2 className="text-lg font-semibold">Deploy as Space!</h2>
            <p className="text-sm text-neutral-400">
              Save and Deploy your project to a Space on the Hub. Spaces are a way to share your project with the world.
            </p>
            <input
              type="text"
              value={spaceTitle}
              onChange={(e) => setSpaceTitle(e.target.value)}
              placeholder="Choose a title for your space"
              className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-full text-sm bg-neutral-700 hover:bg-neutral-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeploy}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-white text-black font-semibold hover:bg-neutral-200 transition"
              >
                <Rocket className="size-4" />
                Deploy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
