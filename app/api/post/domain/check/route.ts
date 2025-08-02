import { checkDomains } from "@/lib/checkDomains";
import { loginToOpenProvider } from "@/lib/useOpenProviderLogin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { domain } = await req.json();

        if (typeof domain !== "string" || !domain.includes(".")) {
            return NextResponse.json(
                { error: "Invalid domain format. Expected something like 'example.com'" },
                { status: 400 }
            );
        }

        // Split domain into name and extension
        const parts = domain.toLowerCase().split(".");
        if (parts.length < 2) {
            return NextResponse.json(
                { error: "Invalid domain format. Must contain at least one dot." },
                { status: 400 }
            );
        }

        const extension = parts.pop()!; // last part after last dot
        const name = parts.join(".");

        
        const login = await loginToOpenProvider(
            process.env.DOMAIN_EMAIL!,
            process.env.DOMAIN_PASSWORD!,
            "0.0.0.0"
        );

        console.log(login)
        const domainsToCheck = [{ name, extension }];

        
        const result = await checkDomains(login.data.token, domainsToCheck, true);

        
        return NextResponse.json(result.data.results, { status: 200 });
    } catch (error: any) {
        console.error("Domain check failed:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
