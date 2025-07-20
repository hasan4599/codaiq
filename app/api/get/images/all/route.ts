import { NextResponse } from 'next/server';

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID!;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN2!;

export async function GET() {
    try {
        const cfRes = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/images/v1`,
            {
                headers: {
                    Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!cfRes.ok) {
            const errorBody = await cfRes.json();
            return NextResponse.json(
                { success: false, errors: errorBody },
                { status: cfRes.status }
            );
        }

        const data = await cfRes.json();

        return NextResponse.json(data.result, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, errors: error },
            { status: 500 }
        );
    }
}
