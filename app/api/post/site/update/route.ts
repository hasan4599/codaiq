import Site, { ISite } from "@/model/site";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import { project } from "@/url";
import connectMongo from "@/db/mongoose"; // Make sure to connect to MongoDB

export async function POST(req: NextRequest) {
    try {
        const { id, code } = await req.json();

        await connectMongo();

        const selectedSite: ISite | null = await Site.findById(id);
        if (!selectedSite) {
            return NextResponse.json({ error: "Site not found" }, { status: 404 });
        }

        const filePath = `${project}/${selectedSite.title}/index.html`;

        try {
            const fileContent = await fs.writeFile(filePath, code, "utf-8");
            return NextResponse.json({ site: selectedSite, fileContent: fileContent }, { status: 200 });
        } catch (err) {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

    } catch (err) {
        console.error("Server error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
