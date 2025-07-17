import axios from "axios";

const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN!;
const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID!;
const CF_API = `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records`;

export async function createARecord(subdomain: string, ip: string) {
  const name = `${subdomain}.codaiq.com`;

  console.log(`[CF DNS] Starting creation of A record:`);
  console.log(`  Subdomain: ${subdomain}`);
  console.log(`  Full name: ${name}`);
  console.log(`  IP address: ${ip}`);
  console.log(`  Zone ID: ${ZONE_ID}`);
  console.log(`  API URL: ${CF_API}`);
  console.log(`  API Token (full): ${CLOUDFLARE_API_TOKEN}`);

  try {
    const response = await axios.post(
      CF_API,
      {
        type: "A",
        name,
        content: ip,
        ttl: 300,
        proxied: true,
      },
      {
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`[CF DNS] API response status: ${response.status}`);
    console.log(`[CF DNS] API response data:`, response.data);

    if (response.data.success) {
      console.log(`[CF DNS] ✅ Created A record for ${name} → ${ip}`);
    } else {
      console.error(`[CF DNS] ❌ Failed to create record:`, response.data.errors);
    }
  } catch (error: any) {
    if (error.response) {
      console.error(`[CF DNS ERROR] Response status: ${error.response.status}`);
      console.error(`[CF DNS ERROR] Response data:`, error.response.data);
    } else {
      console.error(`[CF DNS ERROR]`, error.message || error);
    }
  }
}
