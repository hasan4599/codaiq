import fs from "fs";

const MAP_FILE = "/etc/nginx/conf.d/project-map.conf";

export async function updateNginxMap(projectId: string, projectPath: string) {
  const domain = `${projectId}.codaiq.com`;

  let mapContent = fs.readFileSync(MAP_FILE, "utf-8");

  if (mapContent.includes(domain)) {
    console.log(`[NGINX] Domain already exists in map.`);
    return;
  }

  // Inject the new line before the final closing brace
  const updated = mapContent.replace(/}\s*$/, `    ${domain} ${projectPath};\n}`);

  fs.writeFileSync(MAP_FILE, updated, "utf-8");
  console.log(`[NGINX] Map updated with: ${domain} → ${projectPath}`);
}
