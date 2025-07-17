import fs from "fs/promises";
import yaml from "yaml";

const CLOUDFLARE_CONFIG_PATH = "/root/.cloudflared/config.yml"; // Adjust path if different

export async function updateTunnelConfig(hostname: string, port: number) {
  // Read existing config.yml
  let file = await fs.readFile(CLOUDFLARE_CONFIG_PATH, "utf8");
  const config = yaml.parse(file);

  if (!config.ingress) {
    config.ingress = [];
  }

  // Remove any existing rule for this hostname to avoid duplicates
  config.ingress = config.ingress.filter((rule: any) => rule.hostname !== hostname);

  // Insert new ingress rule at the beginning
  config.ingress.unshift({
    hostname,
    service: `http://localhost:${port}`,
  });

  // Ensure fallback rule at the end
  if (!config.ingress.some((rule: any) => rule.service && rule.service.startsWith("http_status"))) {
    config.ingress.push({ service: "http_status:404" });
  }

  // Convert back to YAML string
  const newYaml = yaml.stringify(config);

  // Write updated config back to file
  await fs.writeFile(CLOUDFLARE_CONFIG_PATH, newYaml, "utf8");
}
