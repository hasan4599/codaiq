import Site, { ISite } from "@/model/site";
import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/db/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { IUser, User } from "@/model/user";
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

        const selectedSite: ISite | null = await Site.findById(id);
        if (!selectedSite) {
            console.warn(`Site not found with id: ${id}`);
            return NextResponse.json({ error: "Site not found" }, { status: 404 });
        }

        const existingSite = await Site.findOne({ title });
        if (existingSite && existingSite._id.toString() !== id) {
            return NextResponse.json({ error: "A site with that title already exists." }, { status: 409 });
        }


        const selectedUser: IUser | null = await User.findOne({ email: session.user.email });
        const siteTitle = isCustomDomain(title)
            ? title.trim().split(".")[0].toLowerCase()
            : title.trim().toLowerCase();

        if (selectedUser && selectedSite) {
            const selectedSiteInUserIndex = selectedUser.site.findIndex((i) => i.name === selectedSite.title);
            
            selectedUser.site[selectedSiteInUserIndex].name = siteTitle
            await selectedUser.save();
        } else {
            console.warn(`No user found with email: ${session.user.email}`);
        }

        const projectPath = path.join(DEV_DIR, title);
        const hostname = isCustomDomain(title) ? title : `${title}.codaiq.com`;

        selectedSite.title = siteTitle;
        selectedSite.deployDomain = hostname;

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
