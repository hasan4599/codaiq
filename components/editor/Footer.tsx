'use client'

import Link from 'next/link'
import {
    Plus,
    Sparkle,
    CircleHelp,
    RefreshCcw,
    Monitor,
    TabletSmartphone,
} from 'lucide-react'
import { server } from '@/url'
import Image from 'next/image'

export default function Footer({
    user,
    activeView,
    setActiveView,
    refresh,
}: {
    activeView: 'desktop' | 'mobile',
    setActiveView: (v: 'desktop' | 'mobile') => void,
    user: { email: string, name: string, image: string } | null
    refresh: () => void
}) {
    return (
        <footer className="border-t border-gray-800/50 bg-gray-900/50 backdrop-blur-xl px-3 h-[80px] flex items-center justify-between z-20">
            <div className="flex items-center gap-2">
                {user && (
                    <>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all bg-gray-800/60 backdrop-blur p-1.5 hover:bg-gray-700/70 border border-gray-700 text-white"
                        >
                            <div className="rounded-full bg-zinc-900 text-zinc-200 size-8 flex items-center justify-center font-semibold relative overflow-hidden">
                                <Image
                                    fill
                                    src={user.image}
                                    alt={user.name}
                                />
                            </div>
                            <span className='hidden md:block'>{user.name}</span>
                        </button>
                        <span className="text-neutral-400">|</span>
                    </>
                )}

                <button
                    type="button"
                    onClick={() => window.location.href = `${server}/projects/new`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gray-800/60 backdrop-blur px-3 py-1.5 hover:bg-gray-700/70 border border-gray-700 text-white text-sm font-medium transition"
                >
                    <Plus className="size-4" />
                    New <span className="max-lg:hidden">Project</span>
                </button>
            </div>

            <div className="flex items-center gap-2.5">
                <button
                    type="button"
                    onClick={refresh}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gray-800/60 backdrop-blur px-3 py-1.5 hover:bg-gray-700/70 border border-gray-700 text-white text-sm font-medium transition"
                >
                    <RefreshCcw className="size-4" />
                    <span className="max-lg:hidden">Refresh</span>
                </button>

                <div className="hidden md:flex items-center bg-gray-800/60 backdrop-blur p-0.5 relative overflow-hidden z-0 gap-0.5 w-[66px] rounded-full border border-gray-700">
                    <div
                        className={`absolute top-0.5 left-0.5 rounded-full bg-black size-7 -z-[1] transition-transform duration-200 ${activeView === 'mobile' ? 'translate-x-[32px]' : 'translate-x-0'
                            }`}
                    />
                    <button
                        onClick={() => setActiveView('desktop')}
                        className={`rounded-full size-7 flex items-center justify-center transition ${activeView === 'desktop'
                            ? 'text-white'
                            : 'text-neutral-300 hover:bg-gray-700/50'
                            }`}
                    >
                        <Monitor className="size-4" />
                    </button>
                    <button
                        onClick={() => setActiveView('mobile')}
                        className={`rounded-full size-7 flex items-center justify-center transition ${activeView === 'mobile'
                            ? 'text-white'
                            : 'text-neutral-300 hover:bg-gray-700/50'
                            }`}
                    >
                        <TabletSmartphone className="size-4" />
                    </button>
                </div>
            </div>
        </footer>

    )
}
