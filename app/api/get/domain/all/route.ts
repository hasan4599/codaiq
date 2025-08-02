import { loginToOpenProvider } from "@/lib/useOpenProviderLogin";
import { NextRequest, NextResponse } from "next/server";

interface Domain {
    name: string;
    extension: string;
    status: string;
}

interface OpenProviderListDomainsResponse {
    code: number;
    desc: string;
    data: {
        results: Domain[];
        total: number;
    };
}

export async function GET(req: NextRequest) {
    const result = await loginToOpenProvider(process.env.DOMAIN_EMAIL!, process.env.DOMAIN_PASSWORD!, '0.0.0.0');
    const domains = await listDomains(result.data.token);

    return NextResponse.json(domains, { status: 200 });

}

async function listDomains(token: string): Promise<OpenProviderListDomainsResponse> {
    const response = await fetch('https://api.openprovider.eu/v1beta/domains', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to list domains: ${errorText}`);
    }

    const data = await response.json();
    return data;
}