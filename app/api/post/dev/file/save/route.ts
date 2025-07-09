import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { project } from "@/url";

export async function POST(req: NextRequest) {
  const { title, file, content } = await req.json();

  if (!title || !file || content === undefined) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const filePath = path.resolve(project, title, file);

  try {
    await fs.writeFile(filePath, content, "utf-8");
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
