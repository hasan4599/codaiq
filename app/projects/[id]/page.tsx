'use client';

import { htmlcode } from '@/components/project/code';
import Desktop from '@/components/project/desktop';
import { addUniqueIdsToHtml } from '@/components/project/id';
import Mobile from '@/components/project/mobile';
import { Fetch } from '@/hooks/fetch';
import { ISite } from '@/model/site';
import { IUser } from '@/model/user';
import { server } from '@/url';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';


export default function AIPage({ params }: { params: Promise<{ id: string }> }) {
    const [code, setCode] = useState<{ html: string; think: string }>({
        html: htmlcode, think: ''
    });

    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<"chat" | "preview">("chat");
    const [user, setUser] = useState<IUser | null>(null);
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
    const [completed, setCompleted] = useState(false);
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
                    setUser(response)
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

            const uid = target.getAttribute('data-uid');
            if (!uid) {
                console.warn("Selected element has no data-uid");
                return;
            }

            setSelectedElementHtml(uid); // Store the UID string, not full outerHTML
        };

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

    useEffect(() => {
        if (code.html) {
            const htmlWithUIDs = addUniqueIdsToHtml(code.html);
            setCode(prev => ({ ...prev, html: htmlWithUIDs }));
        }
    }, [completed]);

    const handleSubmit = async (e: string) => {
        setLoading(true);
        toast.loading('Generating code...');

        try {
            const res = await fetch(`${server}/api/post/ai/prompt`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    e,
                    code: code.html,
                    model: selectedModel.id,
                    selected: selectedElementHtml,
                }),
            });

            if (!res.ok || !res.body) throw new Error("Failed to fetch response from server");

            const reader = res.body.getReader();
            const decoder = new TextDecoder();

            let thinkBuffer = "";
            let contentBuffer = "";
            let htmlBuffer = "";
            let thinkCaptured = false;

            const parser = new DOMParser();
            const doc = parser.parseFromString(code.html, "text/html");

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });

                if (selectedElementHtml) {
                    contentBuffer += chunk;
                    continue;
                }

                if (!thinkCaptured) {
                    thinkBuffer += chunk;
                    const endThink = thinkBuffer.indexOf("</think>");
                    if (endThink !== -1) {
                        const think = thinkBuffer.slice(0, endThink + 8);
                        const remainder = thinkBuffer.slice(endThink + 8);
                        thinkCaptured = true;
                        setCode(prev => ({ ...prev, think }));
                        htmlBuffer += remainder;
                    }
                } else {
                    htmlBuffer += chunk;
                }

                if (!selectedElementHtml) {
                    let partialHtml = htmlBuffer.trim();
                    partialHtml = partialHtml.replace(/<\/body>\s*<\/html>\s*$/i, "").trim();
                    partialHtml += "\n</body>\n</html>";
                    setCode(prev => ({ ...prev, html: partialHtml }));
                }
            }

            if (selectedElementHtml) {
                const thinkMatch = contentBuffer.match(/<think>[\s\S]*?<\/think>/i);
                const think = thinkMatch?.[0] || "";
                const htmlOnly = contentBuffer.replace(think, "").trim();

                const elementToReplace = doc.querySelector(`[data-uid="${selectedElementHtml}"]`);
                if (!elementToReplace) throw new Error("Selected element UID not found in code");

                const updatedDoc = parser.parseFromString(htmlOnly, "text/html");
                const updatedElement = updatedDoc.body.firstElementChild;
                if (!updatedElement) throw new Error("Invalid updated element HTML");

                elementToReplace.replaceWith(updatedElement);
                const finalHtml = "<!DOCTYPE html>\n" + doc.documentElement.outerHTML;

                setCode({ think, html: finalHtml });
            }

            setCompleted(c => !c);
            toast.success("Code generated successfully");
        } catch (err) {
            console.error("Streaming error:", err);
            toast.error("Failed to generate code");
        } finally {
            setLoading(false);
        }
    };

    const handleDeploy = async (title: string) => {
        if (selectedSite === null) {
            toast.loading("Deploying site...");
            const response = await Fetch({
                body: { title, content: code.html },
                api: 'post/site/create',
                method: "POST",
                host: 'server',
                loading: (v) => { },
            });

            if (response) {
                toast.success("Site deployed successfully!");
                window.location.replace(`https://${title}.codaiq.com/`);
            } else {
                toast.error("Failed to deploy site");
            }
        }
    };


    const handleSave = async () => {
        if (selectedSite) {
            const toastId = toast.loading("Saving site...");
            const response = await Fetch({
                body: { id: selectedSite._id, content: code.html },
                api: 'post/site/update',
                method: "POST",
                host: 'server',
                loading: (v) => { },
            });
            toast.dismiss(toastId);
            if (response) {
                toast.success(`Saved`);
            } else {
                toast.error("Failed to save site");
            }
        }
    };



    return (
        user && mounted && (mobile ? <Mobile
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

