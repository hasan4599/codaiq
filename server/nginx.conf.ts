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

  // Normalize newProjectId to full domain (if only subdomain given)
  const newDomain = newProjectId.includes('.') ? newProjectId.toLowerCase() : `${newProjectId.toLowerCase()}.codaiq.com`;

  let mapContent = fs.readFileSync(MAP_FILE, "utf-8");
  const lines = mapContent.split("\n");

  const updatedLines = lines.map((line) => {
    const trimmed = line.trim();

    // Match lines like: domain /path;
    const match = trimmed.match(/^([^\s]+)\s+([^\s]+);$/);
    if (!match) return line;

    const [fullMatch, domain, path] = match;

    // Only replace the domain if the path matches AND domain differs
    if (path === projectPath && domain.toLowerCase() !== newDomain) {
      console.log(`[NGINX] Replacing domain ${domain} → ${newDomain} for path ${projectPath}`);
      // Replace only the domain part (not the path)
      return line.replace(domain, newDomain);
    }

    return line;
  });

  const updatedContent = updatedLines.join("\n");
  fs.writeFileSync(MAP_FILE, updatedContent, "utf-8");

  console.log(`[NGINX] Map updated with new domain: ${newDomain} → ${projectPath}`);
}

