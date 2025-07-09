export function detectLanguage(filename: string | null): string {
    if (!filename) return "plaintext";

    const ext = filename.toLowerCase();

    if (ext.endsWith(".tsx")) return "typescript";
    if (ext.endsWith(".ts")) return "typescript";
    if (ext.endsWith(".jsx")) return "javascript";
    if (ext.endsWith(".js") || ext.endsWith(".cjs") || ext.endsWith(".mjs")) return "javascript";
    if (ext.endsWith(".json")) return "json";
    if (ext.endsWith(".css")) return "css";
    if (ext.endsWith(".scss")) return "scss";
    if (ext.endsWith(".md") || ext.endsWith(".markdown")) return "markdown";
    if (ext.endsWith(".html")) return "html";
    if (ext.endsWith(".xml")) return "xml";
    if (ext.endsWith(".yml") || ext.endsWith(".yaml")) return "yaml";
    if (ext.endsWith(".sh") || ext.endsWith(".bash")) return "shell";
    if (ext.endsWith(".env")) return "dotenv";
    if (ext.endsWith(".sql")) return "sql";

    return "plaintext";
}
