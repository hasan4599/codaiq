import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session: any = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json('Unauthorized', { status: 401 });
    }

    const models = await listFormattedModels();
    return NextResponse.json(models, { status: 200 });
}

async function listFormattedModels() {
    const res = await fetch("https://api.fireworks.ai/inference/v1/models", {
        headers: { Authorization: `Bearer ${process.env.AI_API_KEY}` },
    });

    const json = await res.json();

    return json.data.map((m: any) => ({
        id: m.id,
        name: m.id.split("/").pop() ?? m.id,
        context_length: m.context_length ?? 0,
    }));
}
