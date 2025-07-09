import { spawn } from "child_process";
import path from "path";
import os from "os";
import { getOrAssignPort } from "./portRegistry";
import { getCloudflareTunnelCommand } from "./createCloudflareTunnel";
import { project, server } from "@/url";

function execCommand(command: string, options: { cwd?: string } = {}) {
  return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    const child = spawn(command, {
      shell: true,        // important for commands like "pm2 start ..."
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

const DEV_DIR = project;

export async function devNextApp(projectId: string) {
  const projectPath = path.join(DEV_DIR, projectId);
  const port = getOrAssignPort(projectId, "dev");
  const pm2Name = `dev-${projectId}`;
  const tunnelName = `dev-${projectId}-tunnel`;
  const hostname = `${projectId}.${server}`;
  const tunnelPm2Name = `tunnel-${projectId}`;

  const platform = os.platform();
  const isFake = platform === "win32"; // Fake mode only on Windows

  try {
    console.log(`[DEV] Project path: ${projectPath}`);
    console.log(`[DEV] Assigned port: ${port}`);
    console.log(`[DEV] PM2 process name: ${pm2Name}`);
    console.log(`[DEV] Platform detected: ${platform}`);

    if (isFake) {
      console.log(`[DEV] Fake mode active — manual start without PM2.`);

      console.log(`[DEV] Installing dependencies (npm install)...`);
      await execCommand("npm install", { cwd: projectPath });

      console.log(`[DEV] Starting dev server (npm run dev)...`);
      const child = spawn(`npm run dev -- -p ${port}`, {
        cwd: projectPath,
        stdio: "inherit",
        shell: true,
      });

      child.on("error", (err) => {
        console.error(`[FAKE DEV ERROR] ${err.message}`);
      });

      child.on("exit", (code, signal) => {
        console.log(`[FAKE DEV] Process exited with code ${code} and signal ${signal}`);
      });

      return {
        success: true,
        port,
        pm2Name: `${pm2Name}-fake`,
        tunnelPm2Name: `${tunnelPm2Name}-fake`,
        tunnelUrl: `http://localhost:${port}`,
      };
    }

    console.log(`[DEV] Installing dependencies...`);
    await execCommand("npm install", { cwd: projectPath });

    console.log(`[DEV] Starting dev server with PM2...`);
    await execCommand(`pm2 start npm --name "${pm2Name}" -- run dev -- -p ${port}`, { cwd: projectPath });

    console.log(`[DEV] Starting Cloudflare tunnel with PM2...`);
    const tunnelCmd = getCloudflareTunnelCommand(tunnelName, port, hostname);
    await execCommand(`pm2 start --name "${tunnelPm2Name}" -- ${tunnelCmd}`);

    return {
      success: true,
      port,
      pm2Name,
      tunnelUrl: `https://${hostname}`,
      tunnelPm2Name,
    };
  } catch (err: any) {
    console.error(`[DEV ERROR] ${err.message || err.stderr || err}`);
    return {
      success: false,
      error: err.message || err.stderr || String(err),
    };
  }
}
