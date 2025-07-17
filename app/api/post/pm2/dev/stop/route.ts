import connectMongo from "@/db/mongoose";
import Site, { ISite } from "@/model/site";
import { execCommand } from "@/server/devNextApp";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { id } = await req.json();

    await connectMongo();
    const selectedSite: ISite | null = await Site.findById(id);

    if (selectedSite) {
        const pm2Name = selectedSite.devPm2Name;
        console.log(`[DEV] Stoping dev server with PM2...`);
        await execCommand(`pm2 stop "${pm2Name}"`);
    }
    return NextResponse.json('[DEV] Stoping dev server with PM2...', { status: 200 });
}