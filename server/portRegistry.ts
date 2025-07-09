import fs from "fs";
import path from "path";

// Debug-safe __dirname for ESM (in case you're using ts-node or ESM loaders)
const PORT_FILE = path.resolve(process.cwd(), "server", "port-registry.json");

const DEFAULT_START_PORTS = {
  dev: 10000,
  prod: 13000,
};

type Environment = "dev" | "prod";

interface PortMap {
  [env: string]: {
    [projectId: string]: number;
  };
}

function loadPorts(): PortMap {
  if (!fs.existsSync(PORT_FILE)) {
    console.log("⛔ port-registry.json not found, initializing...");
    return { dev: {}, prod: {} };
  }

  try {
    const content = fs.readFileSync(PORT_FILE, "utf8");
    return JSON.parse(content);
  } catch (err) {
    console.error("❌ Failed to load port-registry.json:", err);
    return { dev: {}, prod: {} };
  }
}

function savePorts(data: PortMap) {
  try {
    fs.writeFileSync(PORT_FILE, JSON.stringify(data, null, 2));
    console.log("✅ Saved ports to", PORT_FILE);
  } catch (err) {
    console.error("❌ Failed to write port-registry.json:", err);
  }
}

export function getOrAssignPort(projectId: string, env: Environment = "prod"): number {
  const ports = loadPorts();
  console.log(`🔍 Looking up port for ${projectId} in ${env}`);

  if (!ports[env]) ports[env] = {};

  const existing = ports[env][projectId];
  if (existing) {
    console.log(`✅ Existing port for ${projectId}: ${existing}`);
    return existing;
  }

  const usedPorts = new Set(Object.values(ports[env]));
  let port = DEFAULT_START_PORTS[env];

  while (usedPorts.has(port)) port++;

  ports[env][projectId] = port;
  console.log(`🆕 Assigned port ${port} to project ${projectId} in ${env}`);

  savePorts(ports);

  return port;
}
