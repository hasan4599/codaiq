'use client';

import { Fetch } from '@/hooks/fetch';
import { ISite } from '@/model/site';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface EditDomainModalProps {
    site: ISite;
    onClose: () => void;
}

export default function EditDomainModal({
    site,
    onClose,
}: EditDomainModalProps) {
    const [newDomain, setNewDomain] = useState(site.title);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!newDomain.trim()) {
            toast.error("Domain cannot be empty.");
            return;
        }

        setLoading(true);
        const toastId = toast.loading("Updating domain...");

        try {
            const res = await Fetch({
                host: "server",
                api: "post/site/domain/change",
                body: { id: site._id, title: newDomain.trim() },
                loading: () => { },
                method: "POST",
            });

            if (!res) {
                toast.error("Internal server error.", { id: toastId });
                return;
            }

            if (res.error) {
                toast.error(res.error, { id: toastId });
                return;
            }

            toast.success("Domain updated.", { id: toastId });
            onClose();
        } catch (err) {
            toast.error("Failed to update domain.", { id: toastId });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-6 rounded-lg shadow-lg border border-white/10 max-w-xl">
                <h2 className="text-white text-lg font-semibold mb-4">Change Domain</h2>
                <p className="text-gray-400 text-sm mb-4">
                    Enter a new domain name to replace <strong>{site.deployDomain}</strong>.
                </p>

                <input
                    type="text"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    className="w-full px-3 py-2 mb-4 rounded-md bg-zinc-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter new domain (e.g. newsite.codaiq.com)"
                />

                <div className="flex items-start gap-3 bg-yellow-100 text-yellow-900 text-sm p-4 rounded-md mb-6 border border-yellow-300 shadow-sm">
                    <AlertTriangle className="w-5 h-5 mt-0.5 text-yellow-700 shrink-0" />
                    <div>
                        <strong className="font-medium">Custom Domain Setup</strong>
                        <p className="mt-1 text-sm leading-5">
                            If you're using your own domain, make sure to add{' '}
                            <code className="font-mono bg-yellow-200 px-1 py-0.5 rounded">
                                89.117.57.53
                            </code>{' '}
                            as an <strong>A record</strong> in your DNS settings.
                        </p>
                    </div>
                </div>


                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm rounded-md bg-gray-700 text-white hover:bg-gray-600"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50"
                        disabled={loading}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>

    );
}
