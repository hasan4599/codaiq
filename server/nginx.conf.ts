import fs from "fs";

const MAP_FILE = "/etc/nginx/conf.d/project-map.conf";
const BACKUP_FILE = `${MAP_FILE}.bak`;

function backupMapFile() {
  fs.copyFileSync(MAP_FILE, BACKUP_FILE);
  console.log(`[NGINX] Backup created: ${BACKUP_FILE}`);
}

export async function updateNginxMap(projectId: string, projectPath: string) {
  const domain = `${projectId}.codaiq.com`;

  backupMapFile();

  let mapContent = fs.readFileSync(MAP_FILE, "utf-8");

  if (mapContent.includes(domain)) {
    console.log(`[NGINX] Domain already exists in map.`);
    return;
  }

  // Inject the new line before the final closing brace
  const updated = mapContent.replace(/}\s*$/, `    ${domain} ${projectPath};\n}`);
  fs.writeFileSync(MAP_FILE, updated, "utf-8");

  console.log(`[NGINX] Map updated with: ${domain} → ${projectPath}`);
  // execSync("nginx -s reload"); // Uncomment if you want auto-reload
}

export async function removeFromNginxMap(projectId: string) {
  const domain = `${projectId}.codaiq.com`;

  backupMapFile();

  let mapContent = fs.readFileSync(MAP_FILE, "utf-8");

  if (!mapContent.includes(domain)) {
    console.log(`[NGINX] Domain not found in map.`);
    return;
  }

  const updated = mapContent
    .split("\n")
    .filter((line) => !line.trim().startsWith(domain))
    .join("\n");

  fs.writeFileSync(MAP_FILE, updated, "utf-8");
  console.log(`[NGINX] Domain removed: ${domain}`);
  // execSync("nginx -s reload");
}

export async function replaceNginxMapDomain(newProjectId: string, projectPath: string) {
  backupMapFile();

  let mapContent = fs.readFileSync(MAP_FILE, "utf-8");
  const lines = mapContent.split("\n");

  const updatedLines = lines.map((line) => {
    const trimmed = line.trim();

    // Match lines like: some.domain.com /some/path;
    const match = trimmed.match(/^([^\s]+)\s+([^\s]+);$/);
    if (!match) return line;

    const [_, domain, path] = match;

    if (path === projectPath && domain !== newProjectId) {
      console.log(`[NGINX] Replacing domain ${domain} → ${newProjectId} for path ${projectPath}`);
      return line.replace(domain, newProjectId);
    }

    return line;
  });

  const updated = updatedLines.join("\n");
  fs.writeFileSync(MAP_FILE, updated, "utf-8");

  console.log(`[NGINX] Map updated with new domain: ${newProjectId} → ${projectPath}`);
  // execSync("nginx -s reload");
}
