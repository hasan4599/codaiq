'use client';

import { Fetch } from '@/hooks/fetch';

import {
    Paintbrush,
    UserPlus2,
    Settings,
    ArrowUp,
    MousePointerClick,
    X,
    Image,
    Loader
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function ChatInput({
    submit,
    models,
    onSelectModel,
    editMode,
    setEditMode,
    selectedElement,
    setSelectedElementHtml,
    loading
}: {
    submit: (e: string) => void;
    models: { id: string; name: string; context_length: number }[];
    onSelectModel: (model: { id: string; name: string; context_length: number }) => void;
    editMode: boolean;
    setEditMode: (value: boolean) => void;
    selectedElement: string | null;
    setSelectedElementHtml: () => void;
    loading: boolean;
}) {
    const [input, setInput] = useState('');
    const [showModelMenu, setShowModelMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showImageModal, setShowImageModal] = useState(false);
    const [imageTab, setImageTab] = useState<'upload' | 'view'>('upload');
    const [uploadedImages, setUploadedImages] = useState<{ id: string; filename: string; variants: string[] }[]>([]);

    useEffect(() => {
        const get = async () => {
            const res = await Fetch({
                body: '',
                api: 'get/images/all',
                method: 'GET',
                loading: (v) => { },
                host: 'server'
            });
            if (res) {
                setUploadedImages(res.images)
            }
        }
        get();
    }, []);

    const onInputChange = (value: string) => {
        setInput(value);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        submit(input);
        setInput('');
    };

    const filteredModels = models.filter((model) =>
        model.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    function getTagNameFromHTML(htmlString: string): string {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = htmlString.trim();
        return wrapper.firstElementChild?.tagName.toLowerCase() || 'unknown';
    }

    async function ImageUpload(file: File) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await Fetch({
                body: formData,
                formData: true,
                api: 'post/images/upload',
                method: 'POST',
                loading: (v) => { }, // you can add loading state here
                host: 'server'
            });

            if (res?.success && res.result?.variants?.length > 0) {
                setUploadedImages((prev) => [...prev, res.result.variants[0]]);
                toast.success(`Uploaded: ${file.name}`);
            } else {
                toast.error('Upload failed: ' + (res.errors?.[0]?.message || 'Unknown error'));
            }
        } catch (err) {
            toast.error('Error uploading image');
            console.error(err);
        }
    }

    return (
        <>
            <form
                onSubmit={onSubmit}
                className="absolute bottom-5 left-[4%] bg-neutral-800 border border-neutral-700 rounded-2xl ring-[4px] focus-within:ring-neutral-500/30 focus-within:border-neutral-600 ring-transparent z-10 w-[90%] group"
            >
                {selectedElement && (
                    <div className='px-4 py-1 text-[14px] bg-[#1d1d1d86] rounded-full inline-flex items-center justify-center border border-zinc-500 space-x-2 mx-4 mt-3'>
                        <h1>{getTagNameFromHTML(selectedElement)}</h1>
                        <X
                            className="cursor-pointer hover:text-red-500"
                            size={14}
                            onClick={() => {
                                setSelectedElementHtml();
                            }}
                        />
                    </div>
                )}

                {/* Input Field */}
                <div className="w-full relative flex items-center justify-between">
                    {loading ? (
                        <div className="flex items-center space-x-2 px-4 py-3">
                            <Loader className="h-4 w-4 text-white animate-spin" />
                            <span className="text-sm text-white">AI is thinking...</span>
                        </div>
                    ) : (
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => onInputChange(e.target.value)}
                            className="w-full bg-transparent text-sm outline-none text-white placeholder:text-neutral-400 p-4"
                            placeholder="Ask Codaiq anything..."
                        />
                    )}
                </div>

                {/* Footer with buttons */}
                <div className="flex items-center justify-between gap-2 px-4 pb-3 relative">
                    {/* Left-side buttons */}
                    <div className="flex-1 flex items-center justify-start gap-1.5 relative">
                        {/* Paintbrush Toggle */}
                        <button
                            type="button"
                            onClick={() => setShowModelMenu((prev) => !prev)}
                            className="inline-flex items-center justify-center size-7 rounded-full border !border-neutral-600 text-neutral-400 hover:!border-neutral-500 hover:!text-neutral-300 transition bg-background dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
                        >
                            <Paintbrush className="size-4" />
                        </button>

                        {/* Dropdown Panel */}
                        {showModelMenu && (
                            <div className="absolute bottom-10 left-0 w-96 z-50 rounded-xl border border-neutral-700 bg-neutral-900 p-2 shadow-xl">
                                <input
                                    type="text"
                                    placeholder="Search models..."
                                    className="w-full mb-2 px-3 py-1.5 text-sm rounded-md bg-neutral-800 text-white placeholder:text-neutral-400 outline-none border border-neutral-700 focus:ring-1 focus:ring-neutral-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />

                                <div className="max-h-60 overflow-y-auto space-y-1">
                                    {filteredModels.slice(0, 10).map((model) => (
                                        <button
                                            key={model.id}
                                            type="button"
                                            className="w-full text-left px-3 py-1.5 text-xs rounded-md text-neutral-300 hover:bg-neutral-800 transition flex justify-between items-center"
                                            onClick={() => {
                                                setSearchQuery('');
                                                setShowModelMenu(false);
                                                onSelectModel(model);
                                            }}
                                        >
                                            <span>{model.name}</span>
                                            <span className="text-[11px] text-neutral-500">{model.context_length} tokens</span>
                                        </button>
                                    ))}
                                    {filteredModels.length === 0 && (
                                        <div className="text-xs text-neutral-500 text-center py-2">
                                            No models found
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Edit Mode Button */}
                        <button
                            type="button"
                            onClick={() => setEditMode(!editMode)}
                            className={`inline-flex items-center justify-center size-7 rounded-full border text-neutral-400 transition ${editMode
                                ? 'bg-green-600/40 border-green-500 text-white'
                                : 'bg-background dark:bg-input/30 border-neutral-600 hover:border-neutral-500 hover:text-neutral-300'
                                }`}
                        >
                            <MousePointerClick className="size-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowImageModal(true)}
                            className="inline-flex items-center justify-center size-7 rounded-full border border-neutral-600 text-neutral-400 hover:border-neutral-500 hover:text-neutral-300 transition bg-background dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
                            title="Image options"
                        >
                            <Image className="size-4" />
                        </button>
                    </div>

                    {/* Right-side buttons */}
                    <div className="flex items-center justify-end gap-2">
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="inline-flex items-center justify-center size-7 rounded-full bg-zinc-500 text-primary-foreground shadow-xs hover:bg-zinc-500/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ArrowUp className="size-4" />
                        </button>
                    </div>
                </div>
            </form>
            {showImageModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center">
                    <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 w-[95%] max-w-5xl min-h-[450px] flex relative shadow-xl">

                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-neutral-400 hover:text-red-400 transition"
                            onClick={() => setShowImageModal(false)}
                        >
                            <X size={20} />
                        </button>

                        {/* Sidebar Tabs */}
                        <div className="w-1/4 pr-6 border-r border-neutral-700 flex flex-col space-y-3">
                            <h2 className="text-xl font-bold text-white mb-4">Image Manager</h2>
                            {[
                                { key: 'upload', label: 'Upload Images' },
                                { key: 'view', label: 'View Images' },
                            ].map(({ key, label }) => (
                                <button
                                    key={key}
                                    onClick={() => setImageTab(key as 'upload' | 'view')}
                                    className={`w-full text-left px-4 py-2 rounded-lg font-medium transition
                                    ${imageTab === key
                                            ? 'bg-neutral-800 text-white border border-zinc-500'
                                            : 'bg-neutral-800/50 text-neutral-300 hover:bg-neutral-700'
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        {/* Right Panel */}
                        <div className="w-3/4 pl-6 overflow-y-auto">
                            {/* Upload Tab */}
                            {imageTab === 'upload' && (
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4">Upload your images</h3>
                                    <label className="block text-sm text-neutral-400 mb-2">
                                        Select image(s) to upload
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="block w-full text-sm text-neutral-200 file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0 file:text-sm file:font-semibold
                         file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                                        onChange={async (e) => {
                                            const files = e.target.files;
                                            if (files) {
                                                for (const file of Array.from(files)) {
                                                    await ImageUpload(file);
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            )}

                            {/* View Tab */}
                            {imageTab === 'view' && (
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4">Your uploaded images</h3>
                                    {uploadedImages.length > 0 ? (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto pr-2">
                                            {uploadedImages.map((img, i) => (
                                                <div
                                                    key={img.id}
                                                    className="relative group rounded-lg overflow-hidden border border-neutral-700 cursor-pointer"
                                                    onClick={async () => {
                                                        const url = img.variants?.[0];
                                                        if (url) {
                                                            await navigator.clipboard.writeText(url);
                                                            import('sonner').then(({ toast }) => {
                                                                toast.success('Image URL copied to clipboard');
                                                            });
                                                        }
                                                    }}
                                                >
                                                    <img
                                                        src={img.variants?.[0] || ''}
                                                        alt={img.filename || `Image ${i + 1}`}
                                                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                                                    />
                                                    <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-black/60 text-xs text-white truncate">
                                                        {img.filename}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-neutral-400">No images uploaded yet.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}
