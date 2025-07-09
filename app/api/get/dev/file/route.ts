import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { project } from "@/url";

export async function GET(req: NextRequest) {
  const title = req.nextUrl.searchParams.get("title");
  const filePath = req.nextUrl.searchParams.get("file");

  if (!title || !filePath) {
    return NextResponse.json({ error: "Missing title or file path" }, { status: 400 });
  }

  const BASE_PATH = project;
  const fullPath = path.resolve(BASE_PATH, title, filePath);

  try {
    const stat = await fs.stat(fullPath);
    if (!stat.isFile()) {
      return NextResponse.json({ error: "Requested path is not a file" }, { status: 400 });
    }

    // Optional: Limit max file size here
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (stat.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large to read" }, { status: 413 });
    }

    const content = await fs.readFile(fullPath, "utf-8");
    return NextResponse.json({ content });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to read file", detail: err.message }, { status: 500 });
  }
}
