"use client";

import { useCallback, useEffect, useRef } from "react";
import { Editor, useMonaco } from "@monaco-editor/react";
import * as monacoEditor from "monaco-editor";
import { detectLanguage } from "@/components/dev/detectLanguage";
import { FileMeta } from "@/app/api/get/dev/scan/route";
import { Fetch } from "@/hooks/fetch";

type CodeEditorProps = {
  code: string;
  setCode: (code: string) => void;
  selectedFile: FileMeta;
  files: FileMeta[];
  projectAbsolutePath: string;
};

function pathToFileUri(path: string): string {
  let normalizedPath = path.replace(/\\/g, "/");
  const isWindows = /^[a-zA-Z]:\//.test(normalizedPath);
  if (isWindows) {
    if (!normalizedPath.startsWith("/")) {
      normalizedPath = "/" + normalizedPath;
    }
    return `file://${normalizedPath}`;
  } else {
    return `file://${normalizedPath}`;
  }
}

export default function CodeEditor({ code, setCode, selectedFile, files, projectAbsolutePath }: CodeEditorProps) {
  const monacoInstance = useMonaco();
  const extraLibsRef = useRef<monacoEditor.IDisposable[]>([]);
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  // Normalize file paths (replace backslashes with forward slashes)
  const normalizedFiles = files.map((f) => ({
    ...f,
    name: f.name.replace(/\\/g, "/"),
  }));

  useEffect(() => {
    if (!monacoInstance || files.length === 0) return;

    // Dispose old libs
    extraLibsRef.current.forEach((d) => d.dispose());
    extraLibsRef.current = [];

    // Disable TS/JS diagnostics (errors/warnings)
    monacoInstance.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

    // Disable JS diagnostics if available
    const jsDefaults = (monacoInstance.languages as any).javascript?.javascriptDefaults;
    if (jsDefaults) {
      jsDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true,
      });
    }

    monacoInstance.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monacoInstance.languages.typescript.ScriptTarget.ESNext,
      module: monacoInstance.languages.typescript.ModuleKind.ESNext,
      moduleResolution: monacoInstance.languages.typescript.ModuleResolutionKind.NodeJs,
      baseUrl: pathToFileUri(projectAbsolutePath),
      paths: { "@/*": ["src/*", "app/*"] },
      allowJs: true,
      jsx: monacoInstance.languages.typescript.JsxEmit.React,
      esModuleInterop: true,
      strict: true,
      noEmit: true,
      typeRoots: ["node_modules/@types"],
      lib: ["esnext", "dom", "dom.iterable", "esnext.asynciterable", "jsx"],
    });

    const reactTypings = `
    declare module 'react' {
      export * from 'react';
      const React: typeof import('react');
      export default React;
    }
    declare const React: typeof import('react');
  `;

    const reactTypingsDisposable = monacoInstance.languages.typescript.typescriptDefaults.addExtraLib(
      reactTypings,
      "file:///react.d.ts"
    );
    extraLibsRef.current.push(reactTypingsDisposable);

    normalizedFiles.forEach((file) => {
      const uri = pathToFileUri(`${projectAbsolutePath}/${file.name}`);
      const contentStub = "export {};";
      const disposable = monacoInstance.languages.typescript.typescriptDefaults.addExtraLib(contentStub, uri);
      extraLibsRef.current.push(disposable);
    });
  }, [monacoInstance, normalizedFiles, projectAbsolutePath, files]);


  const handleEditorMount = (
    editor: monacoEditor.editor.IStandaloneCodeEditor,
    monaco: typeof monacoEditor
  ) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (!monacoInstance || !selectedFile || !editorRef.current) return;

    const uri = monacoEditor.Uri.parse(pathToFileUri(`${projectAbsolutePath}/${selectedFile.name.replace(/\\/g, "/")}`));

    let model = monacoInstance.editor.getModel(uri);
    if (!model) {
      model = monacoInstance.editor.createModel(code, detectLanguage(selectedFile.name), uri);
    } else if (model.getValue() !== code) {
      model.setValue(code);
    }

    editorRef.current.setModel(model);
  }, [monacoInstance, selectedFile, code, projectAbsolutePath]);

  const saveFile = useCallback(
    (newCode: string) => {
      if (!selectedFile) return;
      // Debounce the save to avoid spamming the server
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(async () => {
        const data = {
          title: projectAbsolutePath.split("/").pop(),
          file: selectedFile.name,
          content: newCode,
        }
        try {
          await Fetch({
            body: data,
            api: "post/dev/file/save",
            method: "POST",
            host: "server",
            loading: (v) => { },
          });
          // Optionally add success feedback here
        } catch (err) {
          // Optionally handle error here
          console.error("Failed to save file", err);
        }
      }, 1000); // 1 second debounce
    },
    [selectedFile, projectAbsolutePath]
  );
  return (
    <Editor
      height="100%"
      language={detectLanguage(selectedFile.name) || "typescript"}
      value={code}
      onChange={(value) => {
        setCode(value ?? "");
        saveFile(value ?? "");
      }}
      theme="vs-dark"
      options={{
        minimap: { enabled: true },
        fontSize: 14,
        fontFamily: "Fira Code, monospace",
        automaticLayout: true,
        scrollBeyondLastLine: false,
      }}
      onMount={handleEditorMount}
    />

  );
}
