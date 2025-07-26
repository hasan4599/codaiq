'use client';

import Image from 'next/image';
import Link from "next/link";
import { Eye, Menu, MessageCircleCode } from 'lucide-react';

export default function Header(
  {
    menu,
    activeTab,
    setActiveTab
  }: {
    menu: () => void;
    activeTab: 'chat' | 'preview';
    setActiveTab: (v: 'chat' | 'preview') => void;
  }
) {
  const toggleTab = () => {
    setActiveTab(activeTab === 'chat' ? 'preview' : 'chat');
  };
  return (
    <header className="w-full border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-xl h-[64px] flex items-center justify-between px-4">
      {/* Left: Logo / Title */}
      <div className="flex items-center gap-2 lg:gap-3">
        <Link
          href="/dashboard"
          className="w-[140px] h-[50px] flex items-center relative"
        >
          <Image fill src={'/logo.svg'} alt='logo' />
        </Link>
        <button
          onClick={toggleTab}
          className="flex lg:hidden items-center justify-center gap-2 px-4 py-2 rounded-full border border-zinc-700/50 bg-zinc-800/60 text-zinc-200 hover:bg-zinc-700/50 hover:text-white transition"
        >
          {activeTab === 'chat' ? (
            <>
              <MessageCircleCode className="size-4" />
            </>
          ) : (
            <>
              <Eye className="size-4" />
            </>
          )}
        </button>
      </div>

      {/* Right: Menu Button */}
      <button className="p-2 rounded-lg hover:bg-gray-800 transition text-zinc-200" onClick={menu}>
        <Menu className="w-6 h-6" />
      </button>
    </header>
  );
}
