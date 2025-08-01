import { NextRequest, NextResponse } from "next/server";

type Props = {
    e: string;
    code: string;
    selected: string;
    model: string;
};

export async function POST(req: NextRequest) {
    let fullText = "";
    try {
        const { e, code, selected, model }: Props = await req.json();

        if (!e || !code || !selected) {
            return NextResponse.json(
                { error: "Missing required 'e', 'code', or 'selected' in request body." },
                { status: 400 }
            );
        }

        const systemPrompt = `
You are a strict AI code editor assistant.

Modify ONLY the provided selected HTML element string based on the instruction inside of the full code.
Leave the rest of the code unchanged.

Return the full updated code as a raw string.
Do NOT return JSON, keys, or any extra text.
Output MUST be exactly the updated full code, no explanations, no comments.
`.trim();

        const userMessage = `Full code:\n${code}\nSelected element:\n${selected}\nInstruction:\n${e}`;

        const response = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.AI_API_KEY!}`,
            },
            body: JSON.stringify({
                model: model,
                stream: true,
                temperature: 1,
                max_tokens: 100000,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userMessage },
                ],
            }),
        });

        if (!response.ok || !response.body) {
            throw new Error(`Fireworks response error: ${response.statusText}`);
        }

        const decoder = new TextDecoder();
        const reader = response.body.getReader();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });

            for (const line of chunk.split("\n")) {
                if (!line.startsWith("data: ")) continue;
                const data = line.replace("data: ", "").trim();
                if (data === "[DONE]") continue;

                try {
                    const json = JSON.parse(data);
                    const content = json?.choices?.[0]?.delta?.content;
                    if (content) fullText += content;
                } catch {
                    // ignore parse errors for partial chunks
                }
            }
        }

        // fullText now contains only the raw updated full code string

        return NextResponse.json(fullText);

    } catch (err: any) {
        console.error("❌ Fireworks fetch failed:", err);
        return NextResponse.json(
            { error: "Internal Server Error", details: err.message, response: fullText },
            { status: 500 }
        );
    }
}

