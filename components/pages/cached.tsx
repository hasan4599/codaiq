'use client'

import { Fetch } from '@/hooks/fetch'
import { ISite } from '@/model/site'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'sonner'

export default function Cached({ site }: { site: ISite }) {
    const fakeCache = [
        {
            key: '.next/cache/webpack/index.txt',
            type: 'Build Cache',
            location: '.next/',
            lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 2),
        },
        {
            key: 'node_modules/.cache/eslint/.eslintcache',
            type: 'Tooling Cache',
            location: 'node_modules/.cache/',
            lastAccessed: new Date(Date.now() - 1000 * 60 * 15),
        },
    ]

    const handleCache = async () => {
        const res: string | null = await Fetch({
            body: { id: site._id },
            method: 'POST',
            host: 'server',
            api: 'post/cache',
            loading: (v) => { }
        });
        if (res) toast.success(res);
        else toast.error('Failed to clear');
    }
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold mb-1">Cached Assets</h2>
                    <p className="text-sm text-gray-400">
                        These are static or build-time files cached by your framework and tools. You can clear them to force a rebuild or fresh load.
                    </p>
                </div>
                <button
                    className="text-sm px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
                    onClick={handleCache}
                >
                    Clear Cache
                </button>
            </div>

            <div className="overflow-auto rounded-lg border border-gray-800">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-800 text-gray-300">
                        <tr>
                            <th className="px-4 py-2">File</th>
                            <th className="px-4 py-2">Type</th>
                            <th className="px-4 py-2">Location</th>
                            <th className="px-4 py-2">Last Accessed</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800 text-gray-400">
                        {fakeCache.map((item) => (
                            <tr key={item.key}>
                                <td className="px-4 py-2">{item.key}</td>
                                <td className="px-4 py-2">{item.type}</td>
                                <td className="px-4 py-2">{item.location}</td>
                                <td className="px-4 py-2">
                                    {formatDistanceToNow(item.lastAccessed, { addSuffix: true })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
