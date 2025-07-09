import {
    FileCode2,
    FileText,
    FileType2,
    FileTerminal,
    File,
} from "lucide-react";

export function getIconForFile(name: string) {
    if (name.endsWith(".tsx") || name.endsWith(".ts")) return <FileCode2 className="w-4 h-4 text-blue-400" />;
    if (name.endsWith(".css")) return <FileType2 className="w-4 h-4 text-pink-400" />;
    if (name.endsWith(".md")) return <FileTerminal className="w-4 h-4 text-yellow-400" />;
    if (name.endsWith(".json")) return <FileText className="w-4 h-4 text-emerald-400" />;
    if (name.endsWith(".js") || name.endsWith(".cjs") || name.endsWith(".mjs")) return <FileType2 className="w-4 h-4 text-orange-400" />;
    if (name.startsWith(".env")) return <FileText className="w-4 h-4 text-gray-400" />;
    return <File className="w-4 h-4 text-gray-400" />;
}