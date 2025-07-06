import { cloneRepo } from "@/server/cloneRepo";
import { devNextApp } from "@/server/devNextApp";
import { NextRequest, NextResponse } from "next/server";

interface SiteProps {
    title: string;
    description: string;
    keywords: string[];
    authors: { name: string; url: string }[];
    creator: string;
    domain: string;
    repoURL: string;
}

export async function POST(req: NextRequest) {
    const { site }: { site: SiteProps } = await req.json();

    await cloneRepo(site.repoURL, site.title);
    await devNextApp(site.title);

    return NextResponse.json('done')
}