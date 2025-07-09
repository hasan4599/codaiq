export function getCloudflareTunnelCommand(tunnelName: string, port: number, hostname: string) {
  return `cloudflared tunnel --url http://localhost:${port} --no-autoupdate --name ${tunnelName} --hostname ${hostname}`;
}