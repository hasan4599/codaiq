'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    Plus,
    Sparkle,
    CircleHelp,
    RefreshCcw,
    Monitor,
    TabletSmartphone,
} from 'lucide-react'

export default function Footer({ user, activeView, setActiveView }: {
    activeView: 'desktop' | 'mobile',
    setActiveView: (v: 'desktop' | 'mobile') => void,
    user: { email: string, name: string, image: string } | null
}) {


    return (
        <footer className="border-t border-neutral-800 bg-black text-white px-3 py-2 flex items-center justify-between sticky bottom-0 z-20">
            <div className="flex items-center gap-2">
                {user && <>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all hover:bg-white/10 px-3 py-1.5"
                    >
                        <span className="flex shrink-0 overflow-hidden rounded-full size-8 bg-neutral-700 text-white items-center justify-center text-sm mr-1">
                            {user.name.charAt(0)}
                        </span>
                        <span className="max-lg:hidden">{user.name}</span>
                    </button>

                    <span className="text-neutral-500">|</span>
                </>}

                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-neutral-800 text-white text-sm font-medium px-3 py-1.5 hover:bg-white/10"
                >
                    <Plus className="size-4" />
                    New <span className="max-lg:hidden">Project</span>
                </button>
            </div>

            <div className="flex items-center gap-2.5">
                <Link
                    href="https://huggingface.co/spaces/victor/deepsite-gallery"
                    target="_blank"
                >
                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-neutral-800 text-white text-sm font-medium px-3 py-1.5 hover:bg-white/10"
                    >
                        <Sparkle className="size-4" />
                        <span className="max-lg:hidden">DeepSite Gallery</span>
                    </button>
                </Link>

                <Link
                    href="https://huggingface.co/spaces/enzostvs/deepsite/discussions/157"
                    target="_blank"
                >
                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-neutral-800 text-white text-sm font-medium px-3 py-1.5 hover:bg-white/10"
                    >
                        <CircleHelp className="size-4" />
                        <span className="max-lg:hidden">Help</span>
                    </button>
                </Link>

                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-neutral-800 text-white text-sm font-medium px-3 py-1.5 hover:bg-white/10"
                >
                    <RefreshCcw className="size-4" />
                    <span className="max-lg:hidden">Refresh Preview</span>
                </button>

                {/* Toggleable view buttons */}
                <div className="flex items-center bg-neutral-700/70 rounded-full p-0.5 relative overflow-hidden z-0 max-lg:hidden gap-0.5 w-[66px]">
                    <div
                        className={`absolute top-0.5 left-0.5 rounded-full bg-white size-7 -z-[1] transition-transform duration-200 ${activeView === 'mobile' ? 'translate-x-[32px]' : 'translate-x-0'
                            }`}
                    />
                    <button
                        onClick={() => setActiveView('desktop')}
                        className={`rounded-full size-7 flex items-center justify-center ${activeView === 'desktop'
                            ? 'text-black'
                            : 'text-neutral-300 hover:bg-neutral-800'
                            }`}
                    >
                        <Monitor className="size-4" />
                    </button>
                    <button
                        onClick={() => setActiveView('mobile')}
                        className={`rounded-full size-7 flex items-center justify-center ${activeView === 'mobile'
                            ? 'text-black'
                            : 'text-neutral-300 hover:bg-neutral-800'
                            }`}
                    >
                        <TabletSmartphone className="size-4" />
                    </button>
                </div>
            </div>
        </footer>
    )
}
