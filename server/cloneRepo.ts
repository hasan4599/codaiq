import { exec } from "child_process";
import path from "path";
import fs from "fs";
import os from "os";
import util from "util";
import { project } from "@/url";

const execAsync = util.promisify(exec);

export async function cloneRepo(
    repoUrl: string,
    projectId: string
): Promise<{
    success: boolean;
    message?: string;
    error?: string;
}> {
    const PROJECTS_DIR = project;
    const targetPath = path.join(PROJECTS_DIR, projectId);

    try {
        // Ensure parent directory exists
        if (!fs.existsSync(PROJECTS_DIR)) {
            fs.mkdirSync(PROJECTS_DIR, { recursive: true });
        }

        // Remove existing directory if needed
        if (fs.existsSync(targetPath)) {
            fs.rmSync(targetPath, { recursive: true, force: true });
        }

        // Clone the repo
        const { stdout } = await execAsync(`git clone ${repoUrl} ${targetPath}`);
        return {
            success: true,
            message: stdout,
        };
    } catch (err: any) {
        return {
            success: false,
            error: err.stderr || err.message,
        };
    }
}
