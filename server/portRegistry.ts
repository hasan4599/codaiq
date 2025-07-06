import fs from "fs";
import path from "path";

const PORT_FILE = path.resolve(__dirname, "port-registry.json");

const DEFAULT_START_PORTS = {
  dev: 4000,
  prod: 3001,
};

type Environment = "dev" | "prod";

interface PortMap {
  [env: string]: {
    [projectId: string]: number;
  };
}

function loadPorts(): PortMap {
  if (!fs.existsSync(PORT_FILE)) {
    return { dev: {}, prod: {} };
  }
  return JSON.parse(fs.readFileSync(PORT_FILE, "utf8"));
}

function savePorts(data: PortMap) {
  fs.writeFileSync(PORT_FILE, JSON.stringify(data, null, 2));
}

export function getOrAssignPort(projectId: string, env: Environment = "prod"): number {
  const ports = loadPorts();

  if (!ports[env]) ports[env] = {};
  const existing = ports[env][projectId];
  if (existing) return existing;

  const usedPorts = new Set(Object.values(ports[env]));
  let port = DEFAULT_START_PORTS[env];

  while (usedPorts.has(port)) port++;

  ports[env][projectId] = port;
  savePorts(ports);

  return port;
}
