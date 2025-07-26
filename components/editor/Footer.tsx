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
        <footer className="border-t border-black bg-white text-black px-3 h-[80px] flex items-center justify-between z-20">
            <div className="flex items-center gap-2">
                {user && (
                    <>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all hover:bg-black/10 px-3 py-1.5"
                        >
                            <span className="flex shrink-0 overflow-hidden rounded-full size-8 bg-black text-white items-center justify-center text-sm mr-1">
                                {user.name.charAt(0)}
                            </span>
                            <span className="max-lg:hidden">{user.name}</span>
                        </button>
                        <span className="text-neutral-400">|</span>
                    </>
                )}

                <button
                    type="button"
                    onClick={() => window.location.href = `${server}/projects/new`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-black text-white text-sm font-medium px-3 py-1.5 hover:bg-black/80"
                >
                    <Plus className="size-4" />
                    New <span className="max-lg:hidden">Project</span>
                </button>
            </div>

            <div className="flex items-center gap-2.5">
                <button
                    type="button"
                    onClick={refresh}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-black text-white text-sm font-medium px-3 py-1.5 hover:bg-black/80"
                >
                    <RefreshCcw className="size-4" />
                    <span className="max-lg:hidden">Refresh</span>
                </button>

                <div className="flex items-center bg-neutral-200 rounded-full p-0.5 relative overflow-hidden z-0 max-lg:hidden gap-0.5 w-[66px]">
                    <div
                        className={`absolute top-0.5 left-0.5 rounded-full bg-black size-7 -z-[1] transition-transform duration-200 ${activeView === 'mobile' ? 'translate-x-[32px]' : 'translate-x-0'
                            }`}
                    />
                    <button
                        onClick={() => setActiveView('desktop')}
                        className={`rounded-full size-7 flex items-center justify-center ${activeView === 'desktop'
                            ? 'text-white'
                            : 'text-black hover:bg-black/10'
                            }`}
                    >
                        <Monitor className="size-4" />
                    </button>
                    <button
                        onClick={() => setActiveView('mobile')}
                        className={`rounded-full size-7 flex items-center justify-center ${activeView === 'mobile'
                            ? 'text-white'
                            : 'text-black hover:bg-black/10'
                            }`}
                    >
                        <TabletSmartphone className="size-4" />
                    </button>
                </div>
            </div>
        </footer>
    )
}
