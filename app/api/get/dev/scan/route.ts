import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { project } from "@/url";

export type FileMeta = { name: string; size: number; isDirectory: boolean };

export async function GET(req: NextRequest) {
    const title = req.nextUrl.searchParams.get("title");
    if (!title) {
        return NextResponse.json({ error: "Missing site title in ?title=" }, { status: 400 });
    }

    const BASE_PATH = project;
    const sitePath = path.resolve(BASE_PATH, title);

    try {
        const stat = await fs.stat(sitePath);
        if (!stat.isDirectory()) {
            return NextResponse.json({ error: "Path exists but is not a directory" }, { status: 400 });
        }

        const files = await readFilesMetadataRecursive(sitePath, sitePath);
        return NextResponse.json(files);
    } catch (err: any) {
        return NextResponse.json({ error: "Failed to read project folder", detail: err.message }, { status: 500 });
    }
}

async function readFilesMetadataRecursive(baseDir: string, currentDir: string): Promise<FileMeta[]> {
    try {
        const entries = await fs.readdir(currentDir, { withFileTypes: true });

        const allFiles = await Promise.all(
            entries.map(async (entry) => {
                const fullPath = path.join(currentDir, entry.name);
                const relativePath = path.relative(baseDir, fullPath);
                const entryStat = await fs.stat(fullPath);

                if (entry.isDirectory()) {
                    return await readFilesMetadataRecursive(baseDir, fullPath);
                } else {
                    return [{ name: relativePath, size: entryStat.size, isDirectory: false }];
                }
            })
        );

        return allFiles.flat();
    } catch {
        return [];
    }
}
