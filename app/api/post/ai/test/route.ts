import { NextRequest, NextResponse } from "next/server";

type Props = {
  e: string;
  code: string;
  model: string;
  selected?: string;
};

export async function POST(req: NextRequest) {
  try {
    const { e, code, model, selected }: Props = await req.json();

    if (!e || !code) {
      return NextResponse.json(
        { error: "Missing required 'e' (message) or 'code' in request body." },
        { status: 400 }
      );
    }

    let systemPrompt = `
You are a strict AI code editor assistant.

Rules:
- Always add more content then asked for
- Make sure to have a narbar at top, hero section, content section, contact section, footer for pages
- The user provides the full code of a single-page app (HTML, Tailwind CSS, JS) and an instruction.
- You MUST return the entire updated code as a valid HTML document.
- Do NOT return just fragments or pieces of code. Return a complete HTML page.
- You MUST NOT add comments (no //, /* */, or <!-- -->).
- Wrap your entire reasoning or explanation in a single <think>...</think> tag, and place it **only once** at the very beginning of the response.
- After the <think> block, output the full raw code directly — DO NOT use markdown code blocks (no triple backticks).
- Always include the full valid HTML document structure in your code.
- Your output code MUST have all HTML tags properly closed.
- Each tag must be output immediately as a complete pair — no partial or unclosed tags.
- The output MUST end with proper closing tags: </body> and </html>.
- DO NOT output anything outside of the <think> block and the raw code.
- Write only high-quality, clean, optimized, production-ready code.
- You may use up to a maximum of 80,000 tokens.
`.trim();

    if (selected) {
      systemPrompt += `

Additional rules when a selected element is provided:

- Find the html element by using the given id in selected element then Modify ONLY the selected HTML element string based on the instruction.
- Leave all other parts of the full code unchanged.
- DO NOT change anything outside the selected element.
- Return only the updated selected html element.
`.trim();
    }

    const userMessage = `Full code:\n${code}\nInstruction:\n${e}` + (selected ? `\nSelected element:\n${selected}` : "");

    // ✅ Streaming mode if `selected` is NOT provided
    const response = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AI_API_KEY!}`,
      },
      body: JSON.stringify({
        model,
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

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const reader = response.body.getReader();

    const stream = new ReadableStream({
      async start(controller) {
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop()!;

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.replace("data: ", "").trim();
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed?.choices?.[0]?.delta?.content;
              if (content) {
                controller.enqueue(encoder.encode(content));
              }
            } catch (err) {
              console.warn("Failed to parse stream chunk:", err);
            }
          }
        }
        controller.close();
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err: any) {
    console.error("❌ Fireworks fetch failed:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}
