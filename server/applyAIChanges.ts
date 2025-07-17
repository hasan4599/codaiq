import fs from "fs";
import path from "path";

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"; // adjust if different
const DEEPSEEK_API_KEY = process.env.AI_API_KEY!; // required

export async function applyAIChanges(projectPath: string, message: string): Promise<void> {
  const filePath = path.join(projectPath, "app", "page.tsx");

  if (!fs.existsSync(filePath)) {
    console.error("❌ File not found:", filePath);
    return;
  }

  const originalCode = fs.readFileSync(filePath, "utf8");
  const structure = getProjectStructure(projectPath).join("\n");

  const systemPrompt = `
You are an expert AI developer working on Next.js apps.
Based on the user's request, the project file structure, and the provided source code,
return the updated version of the file **with only the necessary changes applied**.

⚠️ Return ONLY the full new content of the file. Do not explain or add commentary.`;

  const payload = {
    model: "deepseek-chat", // or whatever DeepSeek uses (check their docs, e.g. `deepseek-chat` or `deepseek-coder`)
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Here is the current project file structure:\n\n${structure}\n\nAnd here is the content of app/page.tsx:\n\n${originalCode}` },
      { role: "user", content: message },
    ],
    temperature: 0.7,
    max_tokens: 800,
  };

  const res = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`❌ DeepSeek API error: ${res.status} - ${errorText}`);
  }

  const data = await res.json();
  const updatedCode = data.choices?.[0]?.message?.content;

  if (!updatedCode) {
    throw new Error("AI did not return updated code.");
  }

  fs.writeFileSync(filePath, updatedCode, "utf-8");
  console.log("✅ AI changes applied to", filePath);
}

// Recursively scan project files and folders
function getProjectStructure(dir: string, base = ""): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let result: string[] = [];

  for (const entry of entries) {
    const relativePath = path.join(base, entry.name);

    if (entry.isDirectory()) {
      result.push(`${relativePath}/`);
      result = result.concat(getProjectStructure(path.join(dir, entry.name), relativePath));
    } else {
      result.push(relativePath);
    }
  }

  return result;
}
