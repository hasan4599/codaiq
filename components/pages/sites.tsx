'use client'

import { useEffect, useState } from "react";
import SiteCard from "../sites/SiteCard";
import { NewSiteButton } from "../sites/NewSiteButton";
import { ISite } from "@/model/site";
import { Fetch } from "@/hooks/fetch";
import { EmptyState, SiteProps } from "../sites/EmptyState";

export default function Sites() {
    const [sites, setSites] = useState<ISite[]>([]);
    const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);

    useEffect(() => {
        const get = async () => {
            const response = await Fetch({ body: '', api: 'get/site/selected', method: "GET", host: 'server', loading: (v) => { } })
            if (response !== null) {
                setSites(response)
            }
        };
        get();
    }, []);

    const handleCreateProject = async (site: SiteProps) => {
        const response = await Fetch({ body: site, api: 'post/site/create', method: "POST", host: 'server', loading: (v) => { } })
        if (response) {
            
        }
    }


    if (!sites?.length) {
        return (
            <div className="container mx-auto p-6 w-full h-full flex items-center justify-center">
                <EmptyState onCreate={(v) => handleCreateProject(v)} />
            </div>
        );
    }
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full overflow-y-auto">
                {sites.map((site, index) => (
                    <SiteCard key={index} site={site} />
                ))}
            </div>
            <NewSiteButton />
        </>
    )
}