import { exec } from "child_process";
import util from "util";
import path from "path";
import { getOrAssignPort } from "./portRegistry";

const execAsync = util.promisify(exec);
const DEV_DIR = "/var/www/projects";

export async function devNextApp(projectId: string) {
  const projectPath = path.join(DEV_DIR, projectId);
  const port = getOrAssignPort(projectId, "dev");
  const pm2Name = `dev-${projectId}`;

  // Use a flag to control fake mode (based on NODE_ENV or any custom env)
  const isFake = process.env.NODE_ENV === "development";

  try {
    console.log(`[DEV] Project path: ${projectPath}`);
    console.log(`[DEV] Assigned port: ${port}`);
    console.log(`[DEV] PM2 process name: ${pm2Name}`);

    if (isFake) {
      console.log(`[DEV] Fake mode active — skipping install and PM2 start.`);
      return {
        success: true,
        port,
        pm2Name: `${pm2Name}-fake`,
      };
    }

    console.log(`[DEV] Installing dependencies...`);
    await execAsync("npm install", { cwd: projectPath });

    console.log(`[DEV] Starting dev server with PM2...`);
    const command = `pm2 start npm --name "${pm2Name}" -- run dev -- -p ${port}`;
    await execAsync(command, { cwd: projectPath });

    return {
      success: true,
      port,
      pm2Name,
    };
  } catch (err: any) {
    console.error(`[DEV ERROR] ${err.stderr || err.message}`);
    return {
      success: false,
      error: err.stderr || err.message,
    };
  }
}
