import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;

type Props = {
    e: string;
    code: string;
    model: string;
    selected?: string;
}

export async function POST(req: NextRequest) {
    try {
        const { e, code, model, selected }: Props = await req.json();

        console.log("📝 Received request with:", { e, model, codeSnippetLength: code?.length });

        if (!e || !code) {
            console.warn("⚠️ Missing 'e' (instruction) or 'code' in request body");
            return NextResponse.json(
                { error: "Missing required 'e' (message) or 'code' in request body." },
                { status: 400 }
            );
        }

        const systemPrompt = `
You are a strict AI code editor assistant.

The user provides:
- The full code of a single-page app (HTML, Tailwind CSS, JS),
- An HTML snippet from that code (called "selected").

Your task:
- Apply the user's instruction ONLY inside the "selected" snippet.
- Return the FULL updated code with changes applied only inside the selected snippet.
- Do NOT change anything outside the selected snippet.
- Return ONLY the full updated code.
- No explanations, comments, or extra output allowed.
`.trim();

        const messages = [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Full code:\n${code}` },
            { role: "user", content: `Selected snippet:\n${selected}` },
            { role: "user", content: `Instruction:\n${e}` },
            {
                role: "user",
                content: "Return ONLY the full updated code. No explanation, no reasoning, no extra text."
            },
            {
                role: "user",
                content: `Return ONLY the full updated code with changes applied ONLY inside the selected snippet. No other text or explanation.`,
            },
        ];

        const payload = {
            model,
            stream: true,
            messages: messages,
            temperature: 0.7,
            max_tokens: 160000,
        };

        console.log("📡 Sending payload to OpenRouter:", { model });

        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    const res = await fetch(OPENROUTER_API_URL, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                            "Content-Type": "application/json",
                            "HTTP-Referer": "https://codaiq.com", // Optional but recommended
                            "X-Title": "codaiq", // Optional
                        },
                        body: JSON.stringify(payload),
                    });

                    console.log("✅ OpenRouter API response status:", res.status);

                    if (!res.ok || !res.body) {
                        console.error("❌ OpenRouter API error:", res.statusText);
                        controller.enqueue(
                            encoder.encode(`❌ OpenRouter API error: ${res.status} ${res.statusText}`)
                        );
                        controller.close();
                        return;
                    }

                    const reader = res.body.getReader();
                    let buffer = "";

                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        const chunk = decoder.decode(value, { stream: true });
                        buffer += chunk;

                        const lines = buffer.split("\n");

                        // Keep incomplete last line in buffer
                        buffer = lines.pop() ?? "";

                        for (const line of lines) {
                            const trimmed = line.trim();
                            if (!trimmed.startsWith("data:")) continue;

                            const json = trimmed.slice(5).trim();
                            if (json === "[DONE]") {
                                controller.close();
                                return;
                            }

                            try {
                                const parsed = JSON.parse(json);
                                const text = parsed?.choices?.[0]?.delta?.content;
                                if (text) {
                                    const clean = text
                                        .split("\n")
                                        .filter((line: string) => !/^```/.test(line.trim()))
                                        .join("\n");
                                    controller.enqueue(encoder.encode(clean));
                                }
                            } catch (err) {
                                console.error("❌ Failed to parse chunk:", err);
                            }
                        }
                    }


                    controller.close();
                } catch (err: any) {
                    console.error("❌ OpenRouter fetch failed:", err);
                    controller.enqueue(encoder.encode(`❌ Internal error: ${err.message}`));
                    controller.close();
                }
            },
        });

        console.log("🚀 Returning stream response");

        return new NextResponse(stream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Transfer-Encoding": "chunked",
                "Cache-Control": "no-cache",
                "X-Accel-Buffering": "no",
            },
        });
    } catch (err: any) {
        console.error("❌ Unexpected server error:", err);
        return NextResponse.json(
            { error: "Internal Server Error", details: err.message },
            { status: 500 }
        );
    }
}