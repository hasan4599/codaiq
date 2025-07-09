"use client";

import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

export default function MonacoEditor({
  language = "typescript",
  value,
  onChange,
}: {
  language?: string;
  value: string;
  onChange: (code: string | undefined) => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 animate-pulse">
        <div className="text-sm">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative border border-gray-800 rounded-md overflow-hidden shadow-lg bg-[#1e1e1e] transition-opacity duration-300">
      {/* Editor */}
      <Editor
        height="100%"
        defaultLanguage={language}
        defaultValue={value}
        theme="vs-dark"
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "Fira Code, monospace",
          automaticLayout: true,
          scrollBeyondLastLine: false,
          padding: { top: 16 },
        }}
      />
    </div>
  );
}
