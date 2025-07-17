import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import { project } from "@/url";
import { updateNginxMap } from "./nginx.conf";
import { createARecord } from "./createARecord";

export function execCommand(command: string, options: { cwd?: string } = {}) {
  return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    const child = spawn(command, {
      shell: true,
      cwd: options.cwd,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(new Error(`Command failed with exit code ${code}: ${stderr}`));
      }
    });
  });
}

const DEV_DIR = project; // "/var/www/projects"

export async function devNextApp(projectId: string) {
  const projectPath = path.join(DEV_DIR, projectId);
  const hostname = `${projectId}.codaiq.com`;

  try {
    console.log(`[STATIC] Project path: ${projectPath}`);

    if (!fs.existsSync(projectPath)) {
      throw new Error(`[STATIC] Project folder does not exist.`);
    }

    const indexPath = path.join(projectPath, "index.html");
    if (!fs.existsSync(indexPath)) {
      throw new Error(`[STATIC] Missing index.html file.`);
    }

    console.log(`[STATIC] Updating Nginx config...`);
    await updateNginxMap(projectId, projectPath);

    console.log(`[NGINX] Reloading Nginx...`);
    await execCommand("nginx -t && systemctl reload nginx");

    await createARecord(projectId, "89.117.57.53");

    return {
      success: true,
      url: `https://${hostname}`,
      domain: hostname
    };
  } catch (err: any) {
    console.error(`[STATIC ERROR] ${err.message || err.stderr || err}`);
    return {
      success: false,
      error: err.message || err.stderr || String(err),
    };
  }
}
