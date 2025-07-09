import { exec, spawn } from "child_process";
import util from "util";
import path from "path";
import os from "os";
import { getOrAssignPort } from "./portRegistry";
import { getCloudflareTunnelCommand } from "./createCloudflareTunnel";
import { project, server } from "@/url";

const execAsync = util.promisify(exec);
const DEV_DIR = project;

export async function devNextApp(projectId: string) {
  const projectPath = path.join(DEV_DIR, projectId);
  const port = getOrAssignPort(projectId, "dev");
  const pm2Name = `dev-${projectId}`;
  const tunnelName = `dev-${projectId}-tunnel`;
  const hostname = `${projectId}.${server}`;

  const tunnelPm2Name = `tunnel-${projectId}`;

  const isFake = process.env.NODE_ENV === "development";
  const platform = os.platform();

  try {
    console.log(`[DEV] Project path: ${projectPath}`);
    console.log(`[DEV] Assigned port: ${port}`);
    console.log(`[DEV] PM2 process name: ${pm2Name}`);
    console.log(`[DEV] Platform detected: ${platform}`);

    if (isFake) {
      console.log(`[DEV] Fake mode active — manual start without PM2.`);

      console.log(`[DEV] Installing dependencies (npm install)...`);
      await execAsync("npm install", { cwd: projectPath });

      console.log(`[DEV] Starting dev server (npm run dev)...`);
      const child = spawn(`npm run dev -- -p ${port}`, {
        cwd: projectPath,
        stdio: "inherit",
        shell: true, // ✅ fix for ENOENT
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
    await execAsync("npm install", { cwd: projectPath });

    console.log(`[DEV] Starting dev server with PM2...`);
    await execAsync(`pm2 start npm --name "${pm2Name}" -- run dev -- -p ${port}`, { cwd: projectPath });

    console.log(`[DEV] Starting Cloudflare tunnel with PM2...`);
    const tunnelCmd = getCloudflareTunnelCommand(tunnelName, port, hostname);
    await execAsync(`pm2 start --name "${tunnelPm2Name}" -- ${tunnelCmd}`);

    return {
      success: true,
      port,
      pm2Name,
      tunnelUrl: `https://${hostname}`,
      tunnelPm2Name,
    };
  } catch (err: any) {
    console.error(`[DEV ERROR] ${err.stderr || err.message}`);
    return {
      success: false,
      error: err.stderr || err.message,
    };
  }
}
