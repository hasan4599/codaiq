interface RegisterDomainOptions {
  token: string;
  name: string;
  extension: string;
  handle: string;
  period?: number;
  autorenew?: "default" | "off" | "on";
  nameServers?: { name: string }[];
}

export async function registerDomain({
  token,
  name,
  extension,
  handle,
  period = 1,
  autorenew = "default",
  nameServers = [],
}: RegisterDomainOptions): Promise<any> {
  const response = await fetch("https://api.openprovider.eu/v1beta/domains", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      admin_handle: handle,
      billing_handle: handle,
      owner_handle: handle,
      tech_handle: handle,
      domain: { name, extension },
      period: period.toString(),
      name_servers: nameServers,
      autorenew,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to register domain: ${errorText}`);
  }

  return await response.json();
}
