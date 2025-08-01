import { useState } from "react";
import { DesktopProp } from "./mobile";
import Header from "../editor/header";
const MonacoEditor = dynamic(() => import('@/components/editor/EditorPage'), {
    ssr: false,
});
import { ChevronDown } from "lucide-react";
import ChatInput from "../editor/ChatInput";
import Footer from "../editor/Footer";
import dynamic from "next/dynamic";

export default function Desktop(props: DesktopProp) {
    const [open, setOpen] = useState(true);
    return (
        <div className="w-full h-screen flex flex-col bg-gradient-to-br from-[#06081c] via-[#08071d] to-[#140625]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
                <div className="absolute -top-32 -left-20 h-[28rem] w-[28rem] rounded-full bg-[#0d1b4f] opacity-40 blur-3xl"></div>
                <div className="absolute bottom-[-10rem] right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-[#26004d] opacity-40 blur-3xl"></div>
            </div>
            <Header
                activeTab={props.activeTab}
                setActiveTab={props.setActiveTab}
                handleDeploy={props.handleDeploy}
                handleSave={props.handleSave}
                site={props.selectedSite}

            />
            <div className='w-full flex z-50' style={{ height: 'calc(100% - 144px)' }}>
                {props.activeTab === 'chat' && <div className="w-[500px] bg-black h-full relative">
                    <MonacoEditor value={props.code} onChange={props.setCode} />
                    <div className='bottom-24 left-0 fixed w-[500px] flex flex-col items-center justify-end gap-5'>
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
                <div key={props.refreshKey} className={`h-full bg-black flex items-center justify-center`} style={{ width: props.activeTab === 'chat' ? 'calc(100% - 500px)' : '100%' }}>
                    {props.activeTab === 'chat' ? <div className={`rounded-[40px] h-[90%] overflow-hidden border-[8px] border-zinc-500 shadow-2xl transition-all ${props.activeView === 'desktop'
                        ? 'w-[90%]'
                        : 'w-[90%] max-w-[440px]'
                        }`}>
                        <iframe ref={props.iframeRef} className="w-full h-full" srcDoc={props.code} />
                    </div> : <div className={`overflow-hidden transition-all ${props.activeView === 'desktop'
                        ? 'w-full h-full'
                        : 'w-[90%] max-w-[440px] h-[90%] rounded-[40px] border-[8px] border-zinc-500 shadow-2xl '
                        }`}>
                        <iframe ref={props.iframeRef} className="w-full h-full" srcDoc={props.code} />
                    </div>}
                </div>

            </div>
            <Footer
                activeView={props.activeView}
                setActiveView={props.setActiveView}
                user={props.user}
                refresh={props.setRefreshKey} />
        </div>
    )
};