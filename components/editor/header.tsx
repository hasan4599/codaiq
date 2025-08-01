'use client';

import Image from 'next/image';
import Link from "next/link";
import { Eye, Menu, MessageCircleCode, Rocket } from 'lucide-react';
import { ISite } from '@/model/site';
import { useState } from 'react';

export default function Header(
  {
    activeTab,
    setActiveTab,
    handleDeploy,
    handleSave,
    site
  }: {
    activeTab: 'chat' | 'preview';
    setActiveTab: (v: 'chat' | 'preview') => void;
    handleSave: () => void;
    handleDeploy: (e: string) => void
    site: ISite | null
  }
) {
  const [showModal, setShowModal] = useState(false);
  const [spaceTitle, setSpaceTitle] = useState('');

  const handleSubmit = () => {
    handleDeploy(spaceTitle);
    setShowModal(false);
    setSpaceTitle('');
  };

  const toggleTab = () => {
    setActiveTab(activeTab === 'chat' ? 'preview' : 'chat');
  };
  return (
    <>
      <header className="w-full border-b border-gray-800/50 bg-gray-900/60 backdrop-blur-xl h-[64px] px-4 flex items-center justify-between">
        <div className="flex items-center justify-between gap-2 sm:gap-3 w-full">
          {/* Logo */}
          <Link
            href="/dashboard"
            className="w-[120px] h-[40px] sm:w-[140px] sm:h-[50px] relative flex items-center"
          >
            <Image fill src="/logo.svg" alt="logo" />
          </Link>

          <div className='flex gap-4 items-center'>
            {/* Toggle Tab */}
            <button
              onClick={toggleTab}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-800/60 text-white hover:bg-gray-700/60 transition"
            >
              {activeTab === 'chat' ? (
                <>
                  <MessageCircleCode className="size-4" />
                  <span className="max-sm:hidden">Editor</span>
                </>
              ) : (
                <>
                  <Eye className="size-4" />
                  <span className="max-sm:hidden">Preview</span>
                </>
              )}
            </button>

            {/* Deploy / Save */}
            {!site ? (
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-800/60 text-white hover:bg-gray-700/60 transition"
              >
                <Rocket className="size-4" />
                <span className="max-sm:hidden">Deploy</span>
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-800/60 text-white hover:bg-gray-700/60 transition"
              >
                💾
                <span className="max-sm:hidden">Save</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 z-[999]">
          <div className="bg-neutral-800 border border-zinc-700 rounded-2xl w-full max-w-md p-6 space-y-5 text-zinc-200 shadow-xl">
            <h2 className="text-lg font-semibold text-zinc-100">Deploy to Space</h2>
            <p className="text-sm text-zinc-400">
              Give your project a title to deploy and share it with the world.
            </p>
            <input
              type="text"
              value={spaceTitle}
              onChange={(e) => setSpaceTitle(e.target.value)}
              placeholder="Choose a title for your space"
              className="w-full px-4 py-2 rounded-lg bg-neutral-900 text-zinc-200 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
            <div className="flex justify-between pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-full text-sm border border-zinc-700/50 bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-zinc-700 text-white font-semibold hover:bg-zinc-600 transition"
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
