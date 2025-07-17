'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '@/lib/utils';
import {
    faListAlt,
    faCog,
    faCloudUploadAlt,
    faClipboardList,
    faGlobe,
    faDatabase,
} from '@fortawesome/free-solid-svg-icons';


export const sidebarItems = [
    { key: 'overview', label: 'Project Overview', icon: faListAlt },
    { key: 'config', label: 'Project Configuration', icon: faCog },
    { key: 'deploys', label: 'Deploys', icon: faCloudUploadAlt },
    { key: 'logs', label: 'Logs', icon: faClipboardList },
    { key: 'domain', label: 'Domain Management', icon: faGlobe },
    { key: 'cached', label: 'Cached', icon: faDatabase },
];


export function Sidebar({ active, setActive }: { active: string; setActive: (key: string) => void }) {
    return (
        <aside className="w-60 bg-gray-950 border-r border-gray-800 p-6 space-y-4">
            <h2 className="text-lg font-semibold mb-4">Project Menu</h2>
            <ul className="space-y-2">
                {sidebarItems.map((item) => (
                    <li key={item.key}>
                        <button
                            onClick={() => setActive(item.key)}
                            className={cn(
                                'flex items-center gap-2 px-3 py-2 rounded-md w-full text-left text-sm transition',
                                active === item.key ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 text-gray-400'
                            )}
                        >
                            <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
