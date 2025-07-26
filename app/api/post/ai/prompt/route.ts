import { NextRequest, NextResponse } from "next/server";

type Props = {
  e: string;
  code: string;
  model: string;
};

export async function POST(req: NextRequest) {
  try {
    const { e, code, model }: Props = await req.json();

    if (!e || !code) {
      return NextResponse.json(
        { error: "Missing required 'e' (message) or 'code' in request body." },
        { status: 400 }
      );
    }

    const systemPrompt = `
You are a strict AI code editor assistant.

Rules:
- The user provides the full code of a single-page app (HTML, Tailwind CSS, JS) and an instruction.
- You MUST return the entire updated code as a valid HTML document.
- Do NOT return just fragments or pieces of code. Return a complete HTML page.
- You MUST NOT add comments (no //, /* */, or <!-- -->).
- Wrap your entire reasoning or explanation in a single <think>...</think> tag, and place it **only once** at the very beginning of the response.
- After the <think> block, output the full raw code directly — DO NOT use markdown code blocks (no triple backticks, no \`\`\`html).
- Always include the full valid HTML document structure in your code.
- Your output code MUST have **all HTML tags properly closed**, including self-closing tags where appropriate.
- Crucially, **each tag must be output immediately as a complete pair** — with both the start and matching end tag together — unless it's a self-closing tag. **No partial or unclosed tags are allowed at any point in the output.**
- The output MUST end with proper closing tags: \`</body>\` and \`</html>\`.
- DO NOT output anything outside of the <think> block and the raw code.
- Write only **high-quality, clean, and optimized code** that follows best practices and is production-ready.
- You may use up to a maximum of 80,000 tokens in your response to fully address the user’s request.

Example output:

<think>Applied the user’s request by updating the layout structure.</think>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My App</title>
  </head>
  <body>
    <div>
      <p>Hello</p>
    </div>
  </body>
</html>
    `.trim();

    const userMessage = `Full code:\n${code}\nInstruction:\n${e}`;

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
