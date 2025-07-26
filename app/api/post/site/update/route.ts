import Site, { ISite } from "@/model/site";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import { project } from "@/url";
import connectMongo from "@/db/mongoose";

export async function POST(req: NextRequest) {
  try {
    const { id, content } = await req.json();

    await connectMongo();

    const selectedSite: ISite | null = await Site.findById(id);
    if (!selectedSite) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    const dirPath = `${project}/${selectedSite.title}`;
    const filePath = `${dirPath}/index.html`;
    console.log(dirPath, filePath)
    try {
      // Ensure the directory exists
      await fs.mkdir(dirPath, { recursive: true });

      // Write the file
      await fs.writeFile(filePath, content, "utf-8");

      return NextResponse.json("saved", { status: 200 });
    } catch (err) {
      console.error("File write error:", err);
      return NextResponse.json({ error: "Failed to write file" }, { status: 500 });
    }
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
