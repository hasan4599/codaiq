'use client';

import {
    MessageCircleCode,
    Eye,
    Rocket,
    Plus,
    RefreshCcw,
    Monitor,
    TabletSmartphone,
} from 'lucide-react';
import { useState } from 'react';
import { server } from '@/url';
import { ISite } from '@/model/site';
import Image from 'next/image';

export default function Sidebar({
    activeTab,
    setActiveTab,
    activeView,
    setActiveView,
    deploy,
    refresh,
    user,
    selectedSite,
    handleSave
}: {
    activeTab: 'chat' | 'preview';
    setActiveTab: (v: 'chat' | 'preview') => void;
    activeView: 'desktop' | 'mobile';
    setActiveView: (v: 'desktop' | 'mobile') => void;
    deploy: (v: string) => void;
    user: { email: string; name: string; image: string } | null;
    refresh: () => void;
    selectedSite: ISite | null;
    handleSave: () => void;
}) {
    const [showModal, setShowModal] = useState(false);
    const [spaceTitle, setSpaceTitle] = useState('');

    const handleDeploy = () => {
        deploy(spaceTitle);
        setShowModal(false);
        setSpaceTitle('');
    };

    const toggleTab = () => {
        setActiveTab(activeTab === 'chat' ? 'preview' : 'chat');
    };

    return (
        <>
            <aside className="border-r border-gray-800/50 bg-gray-900/50 backdrop-blur-xl h-full w-[400px] flex flex-col justify-between py-6 px-4 text-zinc-200">
                <div className="space-y-4">
                    <div className="text-lg font-bold px-2 text-zinc-100">Codaiq</div>

                    {user && (
                        <div className="flex items-center gap-3 border border-zinc-700 px-3 py-2 rounded-full">
                            <div className="rounded-full bg-zinc-900 text-zinc-200 size-8 flex items-center justify-center font-semibold relative overflow-hidden">
                                <Image
                                    fill
                                    src={user.image}
                                    alt={user.name}
                                />
                            </div>
                            <span className="text-zinc-300">{user.name}</span>
                        </div>
                    )}
                    <button
                        onClick={() => (window.location.href = `${server}/projects/new`)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700/50 bg-zinc-800/60 text-zinc-200 hover:bg-zinc-700/50 hover:text-white transition w-full"
                    >
                        <Plus className="size-4" />
                        New Project
                    </button>


                    <button
                        onClick={refresh}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700/50 bg-zinc-800/60 text-zinc-200 hover:bg-zinc-700/50 hover:text-white transition w-full"
                    >
                        <RefreshCcw className="size-4" />
                        Refresh
                    </button>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveView('desktop')}
                            className={`flex-1 rounded-full px-3 py-2 flex items-center justify-center border border-zinc-700/50 transition ${activeView === 'desktop'
                                ? 'bg-zinc-700 text-white'
                                : 'bg-zinc-800/60 text-zinc-400 hover:bg-zinc-700/50'
                                }`}
                        >
                            <Monitor className="size-4" />
                        </button>
                        <button
                            onClick={() => setActiveView('mobile')}
                            className={`flex-1 rounded-full px-3 py-2 flex items-center justify-center border border-zinc-700/50 transition ${activeView === 'mobile'
                                ? 'bg-zinc-700 text-white'
                                : 'bg-zinc-800/60 text-zinc-400 hover:bg-zinc-700/50'
                                }`}
                        >
                            <TabletSmartphone className="size-4" />
                        </button>
                    </div>

                    <button
                        onClick={toggleTab}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700/50 bg-zinc-800/60 text-zinc-200 hover:bg-zinc-700/50 hover:text-white transition w-full"
                    >
                        {activeTab === 'chat' ? (
                            <>
                                <MessageCircleCode className="size-4" />
                                Chat
                            </>
                        ) : (
                            <>
                                <Eye className="size-4" />
                                Preview
                            </>
                        )}
                    </button>
                    {!selectedSite ? (
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700/50 bg-zinc-800/60 text-zinc-200 hover:bg-zinc-700/50 hover:text-white transition w-full"
                        >
                            <Rocket className="size-4" />
                            Deploy
                        </button>
                    ) : (
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700/50 bg-zinc-800/60 text-zinc-200 hover:bg-zinc-700/50 hover:text-white transition w-full"
                        >
                            💾
                            Save
                        </button>
                    )}

                </div>
            </aside >

            {showModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
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
                                onClick={handleDeploy}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-zinc-700 text-white font-semibold hover:bg-zinc-600 transition"
                            >
                                <Rocket className="size-4" />
                                Deploy
                            </button>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    );
}
