import { exec } from "child_process";
import util from "util";
import path from "path";
import { getOrAssignPort } from "./portRegistry";

const execAsync = util.promisify(exec);
const DEV_DIR = "/var/www/projects";

export async function devNextApp(projectId: string): Promise<{
  success: boolean;
  port?: number;
  pm2Name?: string;
  error?: string;
}> {
  const projectPath = path.join(DEV_DIR, projectId);
  const port = getOrAssignPort(projectId, "dev");
  const pm2Name = `dev-${projectId}`;

  try {
    // Step 1: Install dependencies
    console.log(`[DEV] Installing dependencies for ${projectId}...`);
    await execAsync("npm install", { cwd: projectPath });

    // Step 2: Start the app in dev mode
    console.log(`[DEV] Starting dev server on port ${port}...`);
    const command = `pm2 start npm --name "${pm2Name}" -- run dev -- -p ${port}`;
    await execAsync(command, { cwd: projectPath });

    return {
      success: true,
      port,
      pm2Name,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.stderr || err.message,
    };
  }
}
