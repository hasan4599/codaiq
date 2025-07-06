import { cloneRepo } from "@/server/cloneRepo";
import { devNextApp } from "@/server/devNextApp";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { User } from "@/model/user";
import Site from "@/model/site";

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
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const site: SiteProps = await req.json();

        // Clone repo
        const cloneResult = await cloneRepo(site.repoURL, site.title);
        if (!cloneResult.success) {
            return NextResponse.json({ error: "Failed to clone repo", detail: cloneResult.error }, { status: 500 });
        }

        // Start dev server + tunnel
        const devResult = await devNextApp(site.title);
        if (!devResult.success) {
            return NextResponse.json({ error: "Failed to start dev server", detail: devResult.error }, { status: 500 });
        }

        const newSite = await Site.create({
            metadata: {
                title: site.title,
                description: site.description,
                keywords: site.keywords,
                authors: site.authors,
                creator: site.creator,
                metadataBase: site.domain,
            },
            status: "online",
            repoURL: site.repoURL,
            devPort: devResult.port,
            devPm2Name: devResult.pm2Name,
            devTunnelUrl: devResult.tunnelUrl,
        });

        // Link site to user
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        user.sites.push(newSite._id);
        await user.save();

        return NextResponse.json({
            message: "Site initialized and saved successfully",
            site: newSite,
            port: devResult.port,
            pm2Name: devResult.pm2Name,
            tunnelUrl: devResult.tunnelUrl,
        });

    } catch (err: any) {
        return NextResponse.json({ error: "Unexpected server error", detail: err.message }, { status: 500 });
    }
}
