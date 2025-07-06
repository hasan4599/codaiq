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
    await execAsync("npm install", { cwd: projectPath });

    const command = `pm2 start npm --name "${pm2Name}" -- run dev -- -p ${port}`;
    await execAsync(command, { cwd: projectPath });

    const tunnelResult = await createLocalTunnel(port, subdomain);
    if (!tunnelResult.success) throw new Error(tunnelResult.error);

    return {
      success: true,
      port,
      pm2Name,
      tunnelUrl: tunnelResult.url,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.stderr || err.message,
    };
  }
}
