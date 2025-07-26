import { NextRequest, NextResponse } from "next/server";

type Props = {
    e: string;
    code: string;
    selected: string;
    model: string;
};

export async function POST(req: NextRequest) {
    try {
        const { e, code, selected , model}: Props = await req.json();

        if (!e || !code || !selected) {
            return NextResponse.json(
                { error: "Missing required 'e', 'code', or 'selected' in request body." },
                { status: 400 }
            );
        }

        const systemPrompt = `
You are a strict AI code editor assistant.

Rules:
- The user provides the full code of a single-page app (HTML, Tailwind CSS, JS), a specific HTML element string "selected" to target, and an instruction.
- Modify ONLY the provided selected element string according to the instruction.
- Return a valid JSON object with two keys, exactly in this order:
  1. "updatedHtml": the full updated selected element HTML string.
  2. "updatedLines": an array of [startLine, endLine] pairs indicating the line ranges updated in the original code.
- Do NOT change the keys or their order.
- Do NOT return extra fields, messages, explanations, or formatting.
- Do NOT include any comments or surrounding markdown.
- ONLY return valid JSON.

Example output:

{
  "updatedHtml": "<div class='updated'>Updated content</div>",
  "updatedLines": [[10, 12]]
}
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
        let fullText = "";

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
                } catch (err) {
                    console.warn("Skipping invalid JSON chunk:", err);
                }
            }
        }
        console.log(fullText)
        const jsonStart = fullText.indexOf("{");
        const jsonEnd = fullText.lastIndexOf("}");

        if (jsonStart === -1 || jsonEnd === -1) {
            throw new Error("Failed to extract valid JSON from AI output");
        }

        const jsonSubstring = fullText.slice(jsonStart, jsonEnd + 1);
        const parsed = JSON.parse(jsonSubstring);

        return NextResponse.json(parsed);

    } catch (err: any) {
        console.error("❌ Fireworks fetch failed:", err);
        return NextResponse.json(
            { error: "Internal Server Error", details: err.message },
            { status: 500 }
        );
    }
}
