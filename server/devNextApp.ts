import { exec } from "child_process";
import util from "util";
import path from "path";
import { getOrAssignPort } from "./portRegistry";
import { createLocalTunnel } from "./localtunnel";

const execAsync = util.promisify(exec);
const DEV_DIR = "/var/www/projects";

export async function devNextApp(projectId: string) {
  const projectPath = path.join(DEV_DIR, projectId);
  const port = getOrAssignPort(projectId, "dev");
  const pm2Name = `dev-${projectId}`;
  const subdomain = `dev-${projectId}`;

  try {
    console.log(`[DEV] Project path: ${projectPath}`);
    console.log(`[DEV] Assigned port: ${port}`);
    console.log(`[DEV] PM2 process name: ${pm2Name}`);

    console.log(`[DEV] Installing dependencies...`);
    await execAsync("npm install", { cwd: projectPath });

    console.log(`[DEV] Starting dev server with PM2...`);
    const command = `pm2 start npm --name "${pm2Name}" -- run dev -- -p ${port}`;
    await execAsync(command, { cwd: projectPath });

    console.log(`[DEV] Creating localtunnel on port ${port}...`);
    const tunnelResult = await createLocalTunnel(port, subdomain);
    if (!tunnelResult.success) throw new Error(tunnelResult.error);

    console.log(`[DEV] Tunnel created at: ${tunnelResult.url}`);

    return {
      success: true,
      port,
      pm2Name,
      tunnelUrl: tunnelResult.url,
    };
  } catch (err: any) {
    console.error(`[DEV ERROR] ${err.stderr || err.message}`);
    return {
      success: false,
      error: err.stderr || err.message,
    };
  }
}
