import { checkDomains } from "@/lib/checkDomains";
import { registerDomain } from "@/lib/registerDomain";
import { loginToOpenProvider } from "@/lib/useOpenProviderLogin";
import { NextRequest, NextResponse } from "next/server";

type Body = {
    name: string;
    extension: string;
    period?: number;
    autorenew?: "default" | "off" | "on";
    nameServers?: { name: string }[];
}

export async function POST(req: NextRequest) {
    try {
        const { name, extension, period, autorenew, nameServers }: Body = await req.json();

        const login = await loginToOpenProvider(
            process.env.DOMAIN_EMAIL!,
            process.env.DOMAIN_PASSWORD!,
            "0.0.0.0"
        );

        const result = await registerDomain({
            token: login.data.token,
            name,
            extension,
            handle: '308937',
            autorenew,
            nameServers,
            period
        });

        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        console.error("Domain check failed:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
