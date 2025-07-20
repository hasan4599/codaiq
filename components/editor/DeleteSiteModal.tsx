'use client';

import { Fetch } from '@/hooks/fetch';
import { toast } from 'sonner';

interface DeleteSiteModalProps {
    siteTitle: string;
    onClose: () => void;
    id: string;
}

export default function DeleteSiteModal({
    siteTitle,
    onClose,
    id,
}: DeleteSiteModalProps) {
    const handleDelete = async () => {
        const toastId = toast.loading('Deleting site...');
        try {
            const res = await Fetch({
                host: 'server',
                api: 'post/site/delete',
                body: { id },
                loading: () => { },
                method: 'POST',
            });

            if (res?.success) {
                toast.success('Site deleted successfully.', { id: toastId });
                onClose();
            } else {
                toast.error(res?.message || 'Failed to delete site.', { id: toastId });
            }
        } catch (err) {
            toast.error('Something went wrong while deleting.', { id: toastId });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-6 rounded-lg shadow-lg border border-white/10 w-80">
                <h2 className="text-white text-lg font-semibold mb-4">Delete Site?</h2>
                <p className="text-gray-400 text-sm mb-6">
                    Are you sure you want to delete <strong>{siteTitle}</strong>? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm rounded-md bg-gray-700 text-white hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-500"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
