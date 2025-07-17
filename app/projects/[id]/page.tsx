'use client';

import ChatInput from '@/components/editor/ChatInput';
import Footer from '@/components/editor/Footer';
import Header from '@/components/editor/header';
import { Fetch } from '@/hooks/fetch';
import dynamic from 'next/dynamic';
const MonacoEditor = dynamic(() => import('@/components/editor/EditorPage'), {
    ssr: false,
});

import { useEffect, useState } from 'react';


export default function AIPage({ params }: { params: Promise<{ id: string }> }) {
    const [code, setCode] = useState(`<!DOCTYPE html>
<html>
  <head>
    <title>My app</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="utf-8">
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="flex justify-center items-center h-screen overflow-hidden bg-white font-sans text-center px-6">
    <div class="w-full">
      <span class="text-xs rounded-full mb-2 inline-block px-2 py-1 border border-amber-500/15 bg-amber-500/15 text-amber-500">🔥 New version dropped!</span>
      <h1 class="text-4xl lg:text-6xl font-bold font-sans">
        <span class="text-2xl lg:text-4xl text-gray-400 block font-medium">I'm ready to work,</span>
        Ask me anything.
      </h1>
    </div>
    <img src="https://enzostvs-deepsite.hf.space/arrow.svg" class="absolute bottom-8 left-0 w-[100px] transform rotate-[30deg]" />
  </body>
</html>`);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<"chat" | "preview">("chat");
    const [user, setUser] = useState<{ email: string, name: string, image: string } | null>(null);
    const [activeView, setActiveView] = useState<'desktop' | 'mobile'>('desktop');

    useEffect(() => {
        try {
            setLoading(true)
            const handle = async () => {
                const response = await Fetch({ body: '', api: 'get/user/selected', method: "GET", host: 'server', loading: (v) => { } })
                if (response !== null) {
                    setUser({
                        name: response.fullName,
                        email: response.email,
                        image: response.avatarUrl
                    })
                }
            }
            handle();
        } finally {
            setLoading(false)
        }
    }, []);

    const handleSubmit = async (e: string) => {
        setLoading(true);
        setCode(""); // optionally clear previous code

        try {
            const res = await fetch("/api/post/ai/prompt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ e, code }),
            });

            if (!res.body) {
                throw new Error("No response body");
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let result = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value);
                result += chunk;
                setCode(prev => prev + chunk); // live update
            }
        } catch (err) {
            console.error("Streaming error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeploy = async (title: string) => {
        const response = await Fetch({ body: { title }, api: 'post/site/create', method: "POST", host: 'server', loading: (v) => { } })
    };

    return (
        <div className="w-full h-screen flex flex-col bg-[#1f1f1f]">
            <Header
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                deploy={(v) => handleDeploy(v)}
            />
            <div className='w-full flex h-full'>
                {activeTab === 'chat' && <div className="w-[1000px] bg-black h-full relative">
                    <MonacoEditor value={code} onChange={setCode} />
                    <ChatInput submit={handleSubmit} />
                </div>}
                <div className="w-full bg-black h-full p-2 flex items-center justify-center">
                    <div className="rounded-[40px] overflow-hidden border-[8px] border-zinc-500 shadow-2xl transition-all">
                        <div
                            className={`transition-all duration-300 bg-white ${activeView === 'desktop'
                                ? 'w-[1280px] h-[800px]'
                                : 'w-[390px] h-[844px]'
                                }`}
                        >
                            <iframe className="w-full h-full" srcDoc={code} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer
                setActiveView={setActiveView}
                activeView={activeView}
                user={user}
            />
        </div>
    );
}