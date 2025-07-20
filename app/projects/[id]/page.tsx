'use client';

import ChatInput from '@/components/editor/ChatInput';
import Footer from '@/components/editor/Footer';
import Header from '@/components/editor/header';
import { Fetch } from '@/hooks/fetch';
import { ISite } from '@/model/site';
import { server } from '@/url';
import dynamic from 'next/dynamic';
const MonacoEditor = dynamic(() => import('@/components/editor/EditorPage'), {
    ssr: false,
});

import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';


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
    const [models, setModels] = useState<{ id: string, name: string, context_length: number }[]>([]);
    const [selectedModel, setSelectedModel] = useState<{ id: string, name: string, context_length: number } | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [selectedElementHtml, setSelectedElementHtml] = useState<string | null>(null);
    const [selectedSite, setSelectedSite] = useState<ISite | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const get = async () => {
            const id = (await params).id;
            const res = await Fetch({ body: '', api: 'get/file', method: "GET", host: 'server', loading: (v) => { }, params: `id=${id}` }) as { site: ISite, fileContent: string }
            if (res) {
                setCode(res.fileContent);
                setSelectedSite(res.site)
            }
        }
        get()
    }, [])

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
                const res = await Fetch({ body: '', api: 'get/ai/models', method: "GET", host: 'server', loading: (v) => { } });
                if (res) {
                    setModels(res);
                    setSelectedModel(res[0])
                }
            }
            handle();
        } finally {
            setLoading(false)
        }
    }, []);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc) return;

        // Declare handlers first so they are hoisted and available everywhere in this scope
        let previouslyHovered: HTMLElement | null = null;
        let selectedElement: HTMLElement | null = null;

        const mouseOverHandler = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (selectedElement && target === selectedElement) return;

            if (previouslyHovered) previouslyHovered.classList.remove('hovered-element');
            if (target && target !== doc.body && target !== doc.documentElement) {
                target.classList.add('hovered-element');
                previouslyHovered = target;
            }
        };

        const clickHandler = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            const target = e.target as HTMLElement;
            if (!target) return;

            if (selectedElement && selectedElement !== target) {
                selectedElement.classList.remove('hovered-element');
            }

            target.classList.add('hovered-element');
            selectedElement = target;
            setSelectedElementHtml(target.outerHTML);
        };

        if (!editMode) {
            // Cleanup if edit mode is off
            const oldStyle = doc.getElementById('select-style');
            if (oldStyle) oldStyle.remove();

            doc.removeEventListener('mouseover', mouseOverHandler);
            doc.removeEventListener('click', clickHandler);
            return;
        }

        const tryInject = () => {
            if (!doc.body || doc.readyState !== 'complete') {
                setTimeout(tryInject, 50);
                return;
            }

            // Remove old style if exists
            const oldStyle = doc.getElementById('select-style');
            if (oldStyle) oldStyle.remove();

            // Inject new style
            const style = doc.createElement('style');
            style.id = 'select-style';
            style.innerHTML = `
      .hovered-element {
        outline: 4px dashed #3B82F6 !important;
        border-radius: 0.4rem !important;
        background-color: rgba(59, 130, 246, 0.3) !important;
        cursor: pointer;
      }
    `;
            doc.head.appendChild(style);

            // Remove previous handlers just in case
            doc.removeEventListener('mouseover', mouseOverHandler);
            doc.removeEventListener('click', clickHandler);

            // Add event listeners
            doc.addEventListener('mouseover', mouseOverHandler);
            doc.addEventListener('click', clickHandler);
        };

        tryInject();

        return () => {
            // Cleanup when component unmounts or dependencies change
            const oldStyle = doc.getElementById('select-style');
            if (oldStyle) oldStyle.remove();

            doc.removeEventListener('mouseover', mouseOverHandler);
            doc.removeEventListener('click', clickHandler);
        };
    }, [editMode, code]);


    const handleSubmit = async (e: string) => {
        if (!selectedModel) return;
        setLoading(true);
        setCode(""); // optionally clear previous code

        try {
            const res = await fetch(`${server}/api/post/ai/prompt`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ e, code, model: selectedModel.id, selected: selectedElementHtml }),
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
        if (selectedSite === null) {
            const response = await Fetch({ body: { title, content: code }, api: 'post/site/create', method: "POST", host: 'server', loading: (v) => { } });
            if (response) {
                window.open(`https://${title}.codaiq.com/`, '_blank');
            }
        }

        if (selectedSite) {
            const response = await Fetch({ body: { id: selectedSite._id, content: code }, api: 'post/site/create', method: "POST", host: 'server', loading: (v) => { } });
            if (response) {
                toast.success(`Saved`);
            }
        }
    };

    return (
        <div className="w-full h-screen flex flex-col bg-[#1f1f1f]">
            <Header
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                deploy={(v) => handleDeploy(v)}
            />
            <div className='w-full flex' style={{ height: 'calc(100% - 160px)' }}>
                {activeTab === 'chat' && <div className="w-[800px] bg-black h-full relative">
                    <MonacoEditor value={code} onChange={setCode} />
                    <ChatInput
                        submit={handleSubmit}
                        models={models}
                        onSelectModel={setSelectedModel}
                        editMode={editMode}
                        setEditMode={setEditMode}
                        selectedElement={selectedElementHtml}
                        setSelectedElementHtml={() => setSelectedElementHtml(null)}
                        loading={loading}
                    />
                </div>}
                <div key={refreshKey} className="w-full bg-black h-full p-2 flex items-center justify-center">
                    <div className="rounded-[40px] overflow-hidden border-[8px] border-zinc-500 shadow-2xl transition-all">
                        <div
                            className={`transition-all duration-300 bg-white ${activeView === 'desktop'
                                ? 'w-[1280px] h-[800px]'
                                : 'w-[390px] h-[844px]'
                                }`}
                        >
                            <iframe ref={iframeRef} className="w-full h-full" srcDoc={code} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer
                refresh={() => setRefreshKey(prev => prev + 1)}
                setActiveView={setActiveView}
                activeView={activeView}
                user={user}
            />
        </div>
    );
}