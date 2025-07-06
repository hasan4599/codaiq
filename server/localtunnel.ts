import localtunnel from 'localtunnel';

export async function createLocalTunnel(port: number, subdomain: string) {
  try {
    // start tunnel on the port with desired subdomain
    const tunnel = await localtunnel({ port, subdomain });

    console.log(`Tunnel running at ${tunnel.url}`);

    // You can listen for tunnel close events if needed
    tunnel.on('close', () => {
      console.log(`Tunnel for ${subdomain} closed`);
    });

    return {
      success: true,
      url: tunnel.url,
      tunnel,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || String(error),
    };
  }
}
