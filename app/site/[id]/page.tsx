'use client';

import { useEffect, useState } from 'react';
import { ISite } from '@/model/site';
import { Fetch } from '@/hooks/fetch';
import { cn } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircle,
    faCog,
    faCloudUploadAlt,
    faClipboardList,
    faGlobe,
    faHammer,
    faListAlt,
    faPlay,
    faStop,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import Deploy from '@/components/pages/deploy';
import Logs from '@/components/pages/logs';
import Domain from '@/components/pages/domain';
import { Config } from '@/components/pages/config';
import { Sidebar } from '@/components/pages/sidebar';
import { Overview } from '@/components/pages/overview';
import Cached from '@/components/pages/cached';

const sidebarItems = [
    { key: 'overview', label: 'Project Overview', icon: faListAlt },
    { key: 'config', label: 'Project Configuration', icon: faCog },
    { key: 'deploys', label: 'Deploys', icon: faCloudUploadAlt },
    { key: 'logs', label: 'Logs', icon: faClipboardList },
    { key: 'domain', label: 'Domain Management', icon: faGlobe },
];

export default function SiteDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const [site, setSite] = useState<ISite | null>(null);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState<string>('overview');

    useEffect(() => {
        const load = async () => {
            const id = await params;
            const response: ISite | null = await Fetch({
                body: '',
                api: 'get/site/selected',
                method: 'GET',
                host: 'server',
                loading: (v) => setLoading(v),
                params: `id=${id.id}`,
            });
            if (response) setSite(response);
            setLoading(false);
        };
        load();
    }, [params]);

    if (loading || !site) {
        return <div className="p-10 text-center text-gray-400 animate-pulse">Loading site...</div>;
    }

    const statusColor = {
        online: 'text-green-500',
        offline: 'text-gray-400',
        deploying: 'text-blue-500',
    }[site.status];

    const ActionButton = ({
        icon,
        label,
        color,
        onClick,
    }: {
        icon: any;
        label: string;
        color?: string;
        onClick?: () => void;
    }) => (
        <button
            onClick={onClick}
            className={cn(
                'px-3 py-1 rounded-md flex items-center gap-2 text-sm transition hover:opacity-80',
                color || 'bg-gray-700 text-white'
            )}
        >
            <FontAwesomeIcon icon={icon} className="w-4 h-4" />
            {label}
        </button>
    );

    return (
        site && <div className="flex min-h-screen text-white">
            <Sidebar active={active} setActive={setActive} />
            <main className="flex-1 p-8 space-y-6">
                <AnimatePresence mode="wait">
                    {active === 'overview' && <Overview site={site} />}
                    {active === 'config' && <Config site={site} />}
                    {active === 'deploys' && <Deploy site={site} />}
                    {active === 'logs' && <Logs site={site} />}
                    {active === 'domain' && <Domain site={site} />}
                    {active === 'cached' && <Cached site={site} />}
                </AnimatePresence>
            </main>
        </div>
    );
}
