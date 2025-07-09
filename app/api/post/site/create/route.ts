import { cloneRepo } from "@/server/cloneRepo";
import { devNextApp } from "@/server/devNextApp";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { IUser, User } from "@/model/user";
import Site from "@/model/site";
import connectMongo from "@/db/mongoose";

interface SiteProps {
    title: string;
    description: string;
    keywords: string[] | string;
    authors: { name: string; url: string }[];
    creator: string;
    repoURL: string;
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const site: SiteProps = await req.json();

        // Early connect to MongoDB and user validation
        await connectMongo();
        const user: IUser | null = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Send the response immediately
        const response = NextResponse.json({ message: "Site is being initialized in background" });

        // Start background process
        (async () => {
            try {
                const cloneResult = await cloneRepo(site.repoURL, site.title);
                if (!cloneResult.success) {
                    console.error("[CLONE ERROR]", cloneResult.error);
                    return;
                }

                const devResult = await devNextApp(site.title);
                if (!devResult.success) {
                    console.error("[DEV ERROR]", devResult.error);
                    return;
                }

                const newSite = await Site.create({
                    metadata: {
                        title: site.title,
                        description: site.description,
                        keywords: Array.isArray(site.keywords)
                            ? site.keywords
                            : site.keywords.split(",").map((kw: string) => kw.trim()),
                        authors: site.authors,
                        creator: site.creator,
                    },
                    status: "online",
                    repoURL: site.repoURL,
                    devPort: devResult.port,
                    devPm2Name: devResult.pm2Name,
                    devTunnelUrl: devResult.tunnelUrl,
                });

                user.site.push({ id: newSite._id, name: site.title, role: 'Admin', environment: 'dev' });
                await user.save();

                console.log(`[SITE INITIALIZED]: ${site.title} on port ${devResult.port}`);
            } catch (err) {
                console.error("[BACKGROUND INIT ERROR]", err);
            }
        })();

        return response;

    } catch (err: any) {
        return NextResponse.json({ error: "Unexpected server error", detail: err.message }, { status: 500 });
    }
}
