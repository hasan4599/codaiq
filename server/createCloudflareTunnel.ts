import { exec } from "child_process";
import util from "util";
const execAsync = util.promisify(exec);

/**
 * Create a cloudflared tunnel
 * @param tunnelName - should match your dev app, e.g. `dev-myapp`
 * @param port - the local port to expose
 * @param hostname - the public hostname like dev-myapp.codaiq.com
 */
export async function createCloudflareTunnel(tunnelName: string, port: number, hostname: string) {
  const command = `cloudflared tunnel --url http://localhost:${port} --no-autoupdate --name ${tunnelName} --hostname ${hostname}`;
  try {
    await execAsync(command);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.stderr || err.message };
  }
}
