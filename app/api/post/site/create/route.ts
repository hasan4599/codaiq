import { devNextApp } from "@/server/devNextApp";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { IUser, User } from "@/model/user";
import Site from "@/model/site";
import connectMongo from "@/db/mongoose";
import fs from "fs/promises";
import { project } from "@/url";
import path from "path";

interface SiteProps {
    title: string;
    content: string;
}

export async function POST(req: NextRequest) {
    try {
        const { title, content }: SiteProps = await req.json();

        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        await connectMongo();
        const user: IUser | null = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const existingSite = await Site.findOne({ title });
        if (existingSite) {
            return NextResponse.json({ error: "A site with this title already exists." }, { status: 409 });
        }

        // Return early response
        const response = NextResponse.json({ message: "Site is being initialized in background", title });

        // Async background initialization
        (async () => {
            try {
                const newSite = await Site.create({
                    title,
                    status: "offline",
                });

                // Create folder for the site
                const siteFolder = path.join(project, title);
                await fs.mkdir(siteFolder, { recursive: true });

                // Write index.html with content
                const indexPath = path.join(siteFolder, "index.html");
                await fs.writeFile(indexPath, content, "utf-8");

                // Run devNextApp (adapted to static serving)
                const devResult = await devNextApp(title);
                if (!devResult.success) {
                    console.error("[DEV ERROR]", devResult.error);
                    await Site.findByIdAndUpdate(newSite._id, { status: "error" });
                    return;
                }

                await Site.findByIdAndUpdate(newSite._id, {
                    status: "online",
                    deployDomain: devResult.url, // note I renamed `domain` to `url` earlier
                });

                user.site.push({ id: newSite._id, name: title, role: "Admin", environment: "dev" });
                await user.save();

                console.log(`[SITE INITIALIZED]: ${title}`);
            } catch (err) {
                console.error("[BACKGROUND INIT ERROR]", err);
            }
        })();

        return response;
    } catch (err: any) {
        return NextResponse.json({ error: "Unexpected server error", detail: err.message }, { status: 500 });
    }
}
