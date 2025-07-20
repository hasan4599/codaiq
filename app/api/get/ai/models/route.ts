import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session: any = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json('Unauthorized', { status: 401 });
    };

    const models = await listFreeModels();
    return NextResponse.json(models, { status: 200 });
}

async function listFreeModels() {
    const res = await fetch("https://openrouter.ai/api/v1/models", {
        headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}` },
    });
    const json = await res.json();

    const freeModels = json.data.filter((m: any) =>
        m.pricing.prompt === "0" && m.pricing.completion === "0"
    ).map((m: any) => ({
        id: m.id,
        name: m.name,
        context_length: m.context_length,
    }));

    const deepSeekModel = {
        id: "tngtech/deepseek-r1t2-chimera:free",
        name: "TNG: DeepSeek R1T2 Chimera (free)",
        context_length: 163840,
    };

    // Filter out deepSeekModel if it exists in freeModels to avoid duplicates
    const filteredModels = freeModels.filter((m: { id: string; }) => m.id !== deepSeekModel.id);

    // Return deepSeekModel first, then the rest
    return [deepSeekModel, ...filteredModels];
}
