'use client'

import { useEffect, useState } from "react";
import SiteCard from "../sites/SiteCard";
import { ISite } from "@/model/site";
import { Fetch } from "@/hooks/fetch";
import { EmptyState } from "../sites/EmptyState";
import { CreateSiteCard } from "../sites/CreateSiteCard";
import DeleteSiteModal from "../editor/DeleteSiteModal";

export default function Sites() {
    const [sites, setSites] = useState<ISite[]>([]);
    const [selectedSite, setSelectedSite] = useState<ISite | null>(null);

    useEffect(() => {
        const get = async () => {
            const response = await Fetch({ body: '', api: 'get/site/selected', method: "GET", host: 'server', loading: (v) => { } })
            if (response !== null) {
                setSites(response)
            }
        };
        get();
    }, []);

    if (!sites?.length) {
        return (
            <div className="container mx-auto p-6 w-full h-full flex items-center justify-center">
                <EmptyState />
            </div>
        );
    }
    return (
        <div className="w-full h-full overflow-y-auto flex items-start justify-start flex-wrap gap-4">
            {sites.map((site, index) => (
                <SiteCard key={index} site={site} onDelete={(v) => setSelectedSite(v)} />
            ))}
            <CreateSiteCard />
            {selectedSite && <DeleteSiteModal siteTitle={selectedSite.title} id={selectedSite._id as string} onClose={() => setSelectedSite(null)} />}
        </div>
    )
}