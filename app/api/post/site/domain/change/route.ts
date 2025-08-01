import Site, { ISite } from "@/model/site";
import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/db/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { replaceNginxMapDomain } from "@/server/nginx.conf";
import { execCommand } from "@/server/devNextApp";
import { project } from "@/url";
import path from "path";

const DEV_DIR = project;

export async function POST(req: NextRequest) {
    try {
        const session: any = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            console.warn("Unauthorized access attempt.");
            return NextResponse.json("Unauthorized", { status: 401 });
        }

        const { id, title } = await req.json();
        await connectMongo();

        const hostname = isCustomDomain(title) ? title : `${title}.codaiq.com`;

        const selectedSite: ISite | null = await Site.findById(id);
        if (!selectedSite) {
            console.warn(`Site not found with id: ${id}`);
            return NextResponse.json({ error: "Site not found" }, { status: 404 });
        }

        const existingSite = await Site.findOne({ deployDomain: hostname });
        if (existingSite && existingSite._id.toString() !== id) {
            return NextResponse.json({ error: "A site with that title already exists." }, { status: 409 });
        }

        const projectPath = path.join(DEV_DIR, selectedSite.title);
        

        selectedSite.deployDomain = `https://${hostname}`;

        await selectedSite.save();

        await replaceNginxMapDomain(hostname, projectPath);

        await execCommand("nginx -t && systemctl reload nginx");



        return NextResponse.json("deleted?", { status: 200 });
    } catch (err) {
        console.error("Server error during site deletion:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

function isCustomDomain(input: string): boolean {
    // Very basic domain check: contains at least one dot, and no spaces
    return /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.trim());
}
