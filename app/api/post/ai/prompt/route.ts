import { NextRequest, NextResponse } from "next/server";

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
const DEEPSEEK_API_KEY = process.env.AI_API_KEY!;

export async function POST(req: NextRequest) {
    const { e, code } = await req.json();

    if (!e || !code) {
        return NextResponse.json(
            { error: "Missing required 'e' (message) or 'code' in request body." },
            { status: 400 }
        );
    }

    const systemPrompt = `
You are a strict AI code editor assistant. 

The user will provide an HTML, CSS (Tailwind), and JavaScript single-page app, along with an instruction.

You must return ONLY the full modified code with the user's change applied. 
⚠️ Absolutely NO explanations, NO extra output, and NO comments — not even HTML comments. Just clean, working code.

If you include anything else besides valid code, the output will be discarded.

Remember:
- Return ONLY a complete code file.
- Do NOT include explanations, notes, or ANY comments.
`.trim();


    const payload = {
        model: "deepseek-chat", // or whatever model ID you use
        stream: true,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Here is the code:\n\n${code}` },
            { role: "user", content: `Apply the following instruction, and return ONLY the updated full code without any explanation, without any comments, and nothing else:\n\n${e}` },
        ],
        temperature: 0.7,
        max_tokens: 1500,
    };

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
        async start(controller) {
            try {
                const res = await fetch(DEEPSEEK_API_URL, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                if (!res.ok || !res.body) {
                    controller.enqueue(
                        encoder.encode(`❌ DeepSeek API error: ${res.status}`)
                    );
                    controller.close();
                    return;
                }

                const reader = res.body.getReader();

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });

                    // Skip keep-alive pings or malformed chunks
                    for (const line of chunk.split("\n")) {
                        const trimmed = line.trim();
                        if (!trimmed || !trimmed.startsWith("data:")) continue;

                        const json = trimmed.replace(/^data:\s*/, "");
                        if (json === "[DONE]") break;

                        try {
                            const parsed = JSON.parse(json);
                            const text = parsed?.choices?.[0]?.delta?.content;
                            if (text) controller.enqueue(encoder.encode(text));
                        } catch {
                            // Ignore malformed chunks
                        }
                    }
                }

                controller.close();
            } catch (err: any) {
                controller.enqueue(
                    encoder.encode(`❌ Internal error: ${err.message}`)
                );
                controller.close();
            }
        },
    });

    return new NextResponse(stream, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Transfer-Encoding": "chunked",
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no", // for nginx
        },
    });
}
