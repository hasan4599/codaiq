'use client';

import ChatInput from '@/components/editor/ChatInput';
import Sidebar from '@/components/editor/editorSidebar';
import SidebarMobile from '@/components/editor/editorSidebarMobile';
import Footer from '@/components/editor/Footer';
import Header from '@/components/editor/header';
import { Fetch } from '@/hooks/fetch';
import { ISite } from '@/model/site';
import { server } from '@/url';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
const MonacoEditor = dynamic(() => import('@/components/editor/EditorPage'), {
    ssr: false,
});

import { RefObject, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';


export default function AIPage({ params }: { params: Promise<{ id: string }> }) {
    const [code, setCode] = useState<{ html: string; think: string }>({
        html: `<!DOCTYPE html>
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
</html>`, think: ''
    });

    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<"chat" | "preview">("chat");
    const [user, setUser] = useState<{ email: string, name: string, image: string } | null>(null);
    const [activeView, setActiveView] = useState<'desktop' | 'mobile'>('desktop');
    const [selectedModel, setSelectedModel] = useState<{ id: string, name: string, context_length: number }>({
        id: 'accounts/fireworks/models/deepseek-v3-0324',
        name: 'Deepseek V3 03-24',
        context_length: 160000
    });
    const [editMode, setEditMode] = useState(false);
    const [selectedElementHtml, setSelectedElementHtml] = useState<string | null>(null);
    const [selectedSite, setSelectedSite] = useState<ISite | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [mobile, setMobile] = useState(true);
    const [mounted, setMounted] = useState(false);

    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (window) {
            setMounted(true);
            if (window.screen.width > 767) {
                setMobile(false)
            } else {
                setMobile(true)
            }
        }
    }, []);

    useEffect(() => {
        const get = async () => {
            const id = (await params).id;
            const res = await Fetch({ body: '', api: 'get/file', method: "GET", host: 'server', loading: (v) => { }, params: `id=${id}` }) as { site: ISite, fileContent: string }
            if (res) {
                setCode({ html: res.fileContent, think: '' });
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
        setLoading(true);

        if (!selectedElementHtml) {
            setCode({ html: "", think: "" });
            try {
                const res = await fetch(`${server}/api/post/ai/prompt`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ e, code: code.html, model: selectedModel.id }),
                });

                if (!res.body) throw new Error("No response body");

                const reader = res.body.getReader();
                const decoder = new TextDecoder();

                let thinkBuffer = "";
                let htmlBuffer = "";
                let doctypeStripped = false;

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });

                    thinkBuffer += chunk;

                    // Check if </think> exists in thinkBuffer
                    const endThinkIdx = thinkBuffer.indexOf("</think>");

                    if (endThinkIdx !== -1) {
                        // Split thinkBuffer into think and html parts
                        const newThink = thinkBuffer.slice(0, endThinkIdx + "</think>".length);
                        let newHtml = thinkBuffer.slice(endThinkIdx + "</think>".length);

                        // Clean html part: remove code block markers and optional language labels
                        newHtml = newHtml.replace(/```(?:\w+)?/, "");

                        // Strip <!DOCTYPE html> once
                        if (!doctypeStripped && newHtml.toLowerCase().startsWith("<!doctype html")) {
                            const firstNewline = newHtml.indexOf("\n");
                            if (firstNewline !== -1) {
                                newHtml = newHtml.slice(firstNewline + 1);
                            }
                            doctypeStripped = true;
                        }

                        // Append newHtml to htmlBuffer
                        htmlBuffer += newHtml;

                        // Update state live
                        setCode({ think: newThink, html: htmlBuffer });

                        // Keep only think part in thinkBuffer for next iteration
                        thinkBuffer = newThink;
                    } else {
                        // No </think> yet, update think live
                        setCode(prev => ({ ...prev, think: thinkBuffer }));
                    }
                }
            } catch (err) {
                console.error("Streaming error:", err);
            } finally {
                setLoading(false);
            }
        } else {
            const res = await fetch(`${server}/api/post/ai/selected`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ e, code: code.html, selected: selectedElementHtml, model: selectedModel.id }),
            });

            if (!res.ok) throw new Error("Selected API response not OK");

            const json = await res.json() as {
                updatedHtml: string;
                updatedLines: [number, number][];
            };

            // Split current code into lines
            const codeLines = code.html.split("\n");

            json.updatedLines.forEach(([start, end]) => {
                const updatedLines = json.updatedHtml.split("\n"); // ✅ correct key
                codeLines.splice(start - 1, end - start + 1, ...updatedLines);
            });

            // Join back to full updated code
            const updatedCode = codeLines.join("\n");

            setCode({ think: "", html: updatedCode });
            setLoading(false);
        }
    };

    const handleDeploy = async (title: string) => {
        if (selectedSite === null) {
            const response = await Fetch({ body: { title, content: code.html }, api: 'post/site/create', method: "POST", host: 'server', loading: (v) => { } });
            if (response) {
                window.open(`https://${title}.codaiq.com/`, '_blank');
            }
        }
    };

    const handleSave = async () => {
        if (selectedSite) {
            const response = await Fetch({ body: { id: selectedSite._id, content: code.html }, api: 'post/site/update', method: "POST", host: 'server', loading: (v) => { } });
            if (response) {
                toast.success(`Saved`);
            }
        }
    }

    console.log(mobile)
    return (
        mounted && (mobile ? <Mobile
            think={code.think}
            activeTab={activeTab}
            code={code.html}
            setCode={(v) => setCode({ html: v, think: '' })}
            handleDeploy={handleDeploy}
            handleSubmit={handleSubmit}
            selectedElementHtml={selectedElementHtml}
            selectedSite={selectedSite}
            setActiveTab={setActiveTab}
            setActiveView={setActiveView}
            setEditMode={setEditMode}
            setRefreshKey={() => setRefreshKey(c => c + 1)}
            setSelectedElementHtml={setSelectedElementHtml}
            setSelectedModel={setSelectedModel}
            user={user}
            editMode={editMode}
            loading={loading}
            refreshKey={refreshKey}
            activeView={activeView}
            iframeRef={iframeRef}
            handleSave={handleSave}
        /> : <Desktop
            think={code.think}
            activeTab={activeTab}
            code={code.html}
            setCode={(v) => setCode({ html: v, think: '' })}
            handleDeploy={handleDeploy}
            handleSubmit={handleSubmit}
            selectedElementHtml={selectedElementHtml}
            selectedSite={selectedSite}
            setActiveTab={setActiveTab}
            setActiveView={setActiveView}
            setEditMode={setEditMode}
            setRefreshKey={() => setRefreshKey(c => c + 1)}
            setSelectedElementHtml={setSelectedElementHtml}
            setSelectedModel={setSelectedModel}
            user={user}
            editMode={editMode}
            loading={loading}
            refreshKey={refreshKey}
            activeView={activeView}
            iframeRef={iframeRef}
            handleSave={handleSave}
        />)
    );
}

type DesktopProp = {
    activeTab: "chat" | "preview";
    code?: string;
    think: string;
    setCode: (v: string) => void;
    handleSubmit: (v: string) => void;
    setSelectedModel: (v: { id: string, name: string, context_length: number }) => void;
    editMode: boolean;
    setEditMode: (v: boolean) => void;
    selectedElementHtml: string | null;
    setSelectedElementHtml: (v: string | null) => void;
    loading: boolean;
    refreshKey: number;
    setRefreshKey: () => void;
    activeView: "desktop" | "mobile";
    iframeRef: RefObject<HTMLIFrameElement>;
    setActiveTab: (v: "chat" | "preview") => void;
    handleSave: () => void;
    selectedSite: ISite | null;
    handleDeploy: (v: string) => void;
    setActiveView: (v: 'desktop' | 'mobile') => void;
    user: { email: string, name: string, image: string } | null;
}

function Desktop(props: DesktopProp) {
    const [sidebar, setSidebar] = useState(false);
    const [open, setOpen] = useState(true);
    return (
        <div className="w-full h-screen flex flex-col bg-[#1f1f1f]">
            <Header
                activeTab={props.activeTab}
                setActiveTab={props.setActiveTab}
                menu={() => setSidebar(c => !c)}
            />
            <div className='w-full flex' style={{ height: 'calc(100% - 64px)' }}>
                {props.activeTab === 'chat' && <div className="w-[500px] bg-black h-full relative">
                    <MonacoEditor value={props.code} onChange={props.setCode} />
                    <div className='bottom-10 left-0 fixed w-[500px] flex flex-col items-center justify-end gap-5'>
                        {props.think && (
                            <div className="bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden ring-[4px] focus-within:ring-neutral-500/30 focus-within:border-neutral-600 ring-transparent z-10 w-[90%] group">
                                <div className='w-full p-4 bg-neutral-800 border-b border-neutral-700 flex items-center justify-between'>
                                    <h1 className='text-zinc-400'>Codaiq is thinking</h1>
                                    <button
                                        onClick={() => setOpen(prev => !prev)}
                                        className="text-zinc-400 transition-transform duration-200"
                                        style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                                    >
                                        <ChevronDown className="w-5 h-5" />
                                    </button>
                                </div>
                                <div
                                    className={`transition-all duration-300 overflow-y-auto px-4 text-zinc-500 ${open ? 'max-h-[300px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
                                        }`}
                                >
                                    <h1>{props.think}</h1>
                                </div>
                            </div>
                        )}
                        <ChatInput
                            submit={props.handleSubmit}
                            onSelectModel={props.setSelectedModel}
                            editMode={props.editMode}
                            setEditMode={props.setEditMode}
                            selectedElement={props.selectedElementHtml}
                            setSelectedElementHtml={() => props.setSelectedElementHtml(null)}
                            loading={props.loading}
                        />
                    </div>
                </div>}
                <div key={props.refreshKey} className={`h-full bg-black flex items-center justify-center`} style={{ width: `${sidebar ? 'calc(100% - 900px)' : 'calc(100% - 500px)'}` }}>
                    <div className={`rounded-[40px] h-[90%] overflow-hidden border-[8px] border-zinc-500 shadow-2xl transition-all ${props.activeView === 'desktop'
                        ? 'max-w-[1500px] w-[90%]'
                        : 'w-[90%] max-w-[390px]'
                        }`}>
                        <iframe ref={props.iframeRef} className="w-full h-full" srcDoc={props.code} />
                    </div>
                </div>
                {sidebar && <Sidebar
                    handleSave={props.handleSave}
                    selectedSite={props.selectedSite}
                    activeTab={props.activeTab}
                    setActiveTab={props.setActiveTab}
                    deploy={(v) => props.handleDeploy(v)}
                    activeView={props.activeView}
                    setActiveView={props.setActiveView}
                    user={props.user}
                    refresh={props.setRefreshKey}
                />}
            </div>
        </div>
    )
};

function Mobile(props: DesktopProp) {
    const [sidebar, setSidebar] = useState(false);
    const [open, setOpen] = useState(true);
    return (
        <div className="w-full h-screen flex flex-col bg-[#1f1f1f]">
            <Header
                activeTab={props.activeTab}
                setActiveTab={props.setActiveTab}
                menu={() => setSidebar(c => !c)}
            />
            <div className='w-full flex' style={{ height: 'calc(100% - 64px)' }}>
                {props.activeTab === 'chat' && <div className="w-full bg-black h-full relative">
                    <MonacoEditor value={props.code} onChange={props.setCode} />
                    <div className='bottom-4 left-0 fixed w-full flex flex-col items-center justify-end gap-5'>
                        {props.think && (
                            <div className="bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden ring-[4px] focus-within:ring-neutral-500/30 focus-within:border-neutral-600 ring-transparent z-10 w-[90%] group">
                                <div className='w-full p-4 bg-neutral-800 border-b border-neutral-700 flex items-center justify-between'>
                                    <h1 className='text-zinc-400'>Codaiq is thinking</h1>
                                    <button
                                        onClick={() => setOpen(prev => !prev)}
                                        className="text-zinc-400 transition-transform duration-200"
                                        style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                                    >
                                        <ChevronDown className="w-5 h-5" />
                                    </button>
                                </div>
                                <div
                                    className={`transition-all duration-300 overflow-y-auto px-4 text-zinc-500 ${open ? 'max-h-[300px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
                                        }`}
                                >
                                    <h1>{props.think}</h1>
                                </div>
                            </div>
                        )}
                        <ChatInput
                            submit={props.handleSubmit}
                            onSelectModel={props.setSelectedModel}
                            editMode={props.editMode}
                            setEditMode={props.setEditMode}
                            selectedElement={props.selectedElementHtml}
                            setSelectedElementHtml={() => props.setSelectedElementHtml(null)}
                            loading={props.loading}
                        />
                    </div>
                </div>}
                {props.activeTab === 'preview' && <div key={props.refreshKey} className="w-full h-full bg-black flex items-center justify-center">
                    <div className={`rounded-[40px] h-[90%] overflow-hidden border-[8px] border-zinc-500 shadow-2xl transition-all ${props.activeView === 'desktop'
                        ? 'max-w-[1500px] w-[90%]'
                        : 'w-[90%] max-w-[390px]'
                        }`}>
                        <iframe ref={props.iframeRef} className="w-full h-full" srcDoc={props.code} />
                    </div>
                </div>}
            </div>
            <AnimatePresence>
                {sidebar && (
                    <SidebarMobile
                        menu={() => setSidebar(false)}
                        handleSave={props.handleSave}
                        selectedSite={props.selectedSite}
                        activeTab={props.activeTab}
                        setActiveTab={props.setActiveTab}
                        deploy={(v) => props.handleDeploy(v)}
                        activeView={props.activeView}
                        setActiveView={props.setActiveView}
                        user={props.user}
                        refresh={props.setRefreshKey}
                    />
                )}
            </AnimatePresence>

        </div>
    )
}