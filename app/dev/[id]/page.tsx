"use client";

import { useEffect, useState } from "react";
import { buildFileTree } from "@/components/dev/buildFileTree";
import { FileTree } from "@/components/dev/FileTree";
import { ISite } from "@/model/site";
import { Fetch } from "@/hooks/fetch";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { project } from "@/url";
import { FileMeta } from "@/app/api/get/dev/scan/route";
const CodeEditor = dynamic(() => import("@/components/dev/CodeEditor"), {
    ssr: false,
});

export default function Dev({ params }: { params: Promise<{ id: string }> }) {
    const [site, setSite] = useState<ISite | null>(null);
    const [selectedFile, setSelectedFile] = useState<FileMeta | null>(null);
    const [code, setCode] = useState("");
    const [previewWidth, setPreviewWidth] = useState<number | string>("100%");
    const [files, setFiles] = useState<FileMeta[]>([]);
    const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
        pages: true,
        styles: true,
    });
    const [hasMounted, setHasMounted] = useState(false);
    const normalizedFiles = files.map((f) => ({
        ...f,
        name: f.name.replace(/\\/g, "/"),
    }));
    const [loading, setLoading] = useState(false);
    const fileTree = buildFileTree(normalizedFiles);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        const get = async () => {
            const id = await params;
            const response: ISite | null = await Fetch({
                body: "",
                api: "get/site/selected",
                method: "GET",
                host: "server",
                loading: (v) => setLoading(v),
                params: `id=${id.id}`,
            });
            if (response !== null) {
                setSite(response);
                const res = await Fetch({
                    body: "",
                    api: "get/dev/scan",
                    method: "GET",
                    host: "server",
                    loading: (v) => setLoading(v),
                    params: `title=${response.metadata.title}`,
                });
                if (res !== null) {
                    setFiles(res);
                }
            }
        };
        get();
    }, [params]);

    const handleSelectFile = async (file: FileMeta) => {
        if (file && site) {
            const response: { content: any } | null = await Fetch({
                body: "",
                api: "get/dev/file",
                method: "GET",
                host: "server",
                loading: (v) => setLoading(v),
                params: `title=${site.metadata.title}&file=${file.name}`,
            });
            if (response) {
                setSelectedFile(file);
                setCode(response.content);
            }
        }
    };

    const toggleFolder = (folderPath: string) => {
        setOpenFolders((prev) => ({ ...prev, [folderPath]: !prev[folderPath] }));
    };

    return (
        <div className="flex h-screen bg-gray-950 text-white font-sans text-sm">
            {/* Sidebar */}
            <div className="w-1/6 border-r border-gray-800 p-4 overflow-y-auto bg-gray-900">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-gray-400 text-xs uppercase tracking-widest">
                        Explorer
                    </h2>
                    {loading && (
                        <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                    )}
                </div>
                <FileTree
                    tree={fileTree}
                    openFolders={openFolders}
                    toggleFolder={toggleFolder}
                    onSelect={handleSelectFile}
                    selectedFileName={selectedFile && selectedFile.name}
                />
            </div>

            {/* Editor */}
            <div className="w-2/4 h-full">
                {hasMounted && selectedFile && site && code && (
                    <CodeEditor
                        code={code}
                        setCode={setCode}
                        selectedFile={selectedFile}
                        files={files}
                        projectAbsolutePath={`${project}/${site.metadata.title ?? ""}`}
                    />
                )}
            </div>

            {/* Preview */}
            <div className="w-2/5 bg-gray-800 flex flex-col border-l border-gray-700">
                {/* Preview Controls */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-gray-900">
                    <div className="flex gap-2 text-xs text-gray-300">
                        {[
                            { label: "Mobile", width: 375 },
                            { label: "Default", width: "100%" },
                        ].map((view) => (
                            <button
                                key={view.label}
                                className={`px-2 py-1 rounded hover:bg-gray-700 ${previewWidth === view.width ? "bg-gray-700 text-white" : ""
                                    }`}
                                onClick={() => setPreviewWidth(view.width)}
                            >
                                {view.label}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => window.open(site?.devTunnelUrl, "_blank")}
                        className="text-xs text-blue-400 hover:underline"
                    >
                        Pop Out
                    </button>
                </div>

                {/* Responsive iframe preview */}
                <div className="flex justify-center items-center flex-grow bg-black overflow-auto">
                    {site?.devTunnelUrl && (
                        <iframe
                            src={site.devTunnelUrl}
                            className="border-0 bg-white"
                            title="Live Preview"
                            style={{
                                width:
                                    typeof previewWidth === "number"
                                        ? `${previewWidth}px`
                                        : "100%",
                                height: "100%",
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
