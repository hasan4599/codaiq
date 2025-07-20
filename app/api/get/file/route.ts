import Site, { ISite } from "@/model/site";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import { project } from "@/url";
import connectMongo from "@/db/mongoose"; // Make sure to connect to MongoDB

export async function GET(req: NextRequest) {
    try {
        await connectMongo();

        const url = new URL(req.url);
        const siteId = url.searchParams.get("id");

        if (!siteId) {
            return NextResponse.json({ error: "Site ID is required" }, { status: 400 });
        }

        const selectedSite: ISite | null = await Site.findById(siteId);
        if (!selectedSite) {
            return NextResponse.json({ error: "Site not found" }, { status: 404 });
        }

        const filePath = `${project}/${selectedSite.title}/index.html`;

        try {
            const fileContent = await fs.readFile(filePath, "utf-8");
            return NextResponse.json({ site: selectedSite, fileContent: fileContent }, { status: 200 });
        } catch (err) {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

    } catch (err) {
        console.error("Server error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
