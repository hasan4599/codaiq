'use client'

import { ISite } from "@/model/site";
import { RefObject, useState } from "react";
import Header from "../editor/header";
const MonacoEditor = dynamic(() => import('@/components/editor/EditorPage'), {
    ssr: false,
});
import { ChevronDown } from "lucide-react";
import ChatInput from "../editor/ChatInput";
import Footer from "../editor/Footer";
import dynamic from "next/dynamic";

export type DesktopProp = {
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

export default function Mobile(props: DesktopProp) {
    const [open, setOpen] = useState(true);
    return (
        <div className="w-full h-[100dvh] flex flex-col bg-[#1f1f1f] relative">
            <Header
                activeTab={props.activeTab}
                setActiveTab={props.setActiveTab}
                handleDeploy={props.handleDeploy}
                handleSave={props.handleSave}
                site={props.selectedSite}
            />

            <div className='w-full flex z-50' style={{ height: 'calc(100% - 144px)' }}>
                <div className={`w-full bg-black h-full relative flex-col ${props.activeTab === 'chat' ? "flex" : "hidden"}`}>
                    <MonacoEditor value={props.code} onChange={props.setCode} />

                    {/* Input and Thinking Area */}
                    <div className="absolute bottom-3 left-0 w-full flex flex-col items-center justify-end gap-5">
                        {props.think && (
                            <div className="bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden ring-[4px] ring-transparent focus-within:ring-neutral-500/30 focus-within:border-neutral-600 w-full max-w-[90%]">
                                <div className="w-full p-4 bg-neutral-800 border-b border-neutral-700 flex items-center justify-between">
                                    <h1 className="text-zinc-400">Codaiq is thinking</h1>
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
                </div>
                <div
                    key={props.refreshKey}
                    className={`w-full h-full bg-black items-center justify-center ${props.activeTab === 'preview' ? "flex" : "hidden"}`}
                >
                    <div
                        className={`rounded-[40px] h-[90%] overflow-hidden border-[8px] border-zinc-500 shadow-2xl transition-all ${props.activeView === 'desktop'
                            ? 'max-w-[1500px] w-[90%]'
                            : 'w-[90%] max-w-[390px]'
                            }`}
                    >
                        <iframe ref={props.iframeRef} className="w-full h-full" srcDoc={props.code} />
                    </div>
                </div>
            </div>
            <Footer
                activeView={props.activeView}
                setActiveView={props.setActiveView}
                user={props.user}
                refresh={props.setRefreshKey} />
        </div>

    )
}