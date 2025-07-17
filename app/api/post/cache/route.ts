import connectMongo from "@/db/mongoose";
import Site, { ISite } from "@/model/site";
import { NextRequest, NextResponse } from "next/server";
import { rm } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
    const { id } = await req.json();
    const projectRoot = '/var/www/projects';

    await connectMongo();
    const selectedSite: ISite | null = await Site.findById(id);

    if (!selectedSite) {
        return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    const dirName = selectedSite.metadata.title;
    const cachePath = path.join(projectRoot, dirName, '.next');
    console.log('Deleting cachePath:', cachePath);
    try {
        await rm(cachePath, { recursive: true, force: true });
        return NextResponse.json(".next cache cleared", { status: 200 });
    } catch (error) {
        console.error("Error clearing cache:", error);
        return NextResponse.json({ error: "Failed to clear .next cache" }, { status: 500 });
    }
}
