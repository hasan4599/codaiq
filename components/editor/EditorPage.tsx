'use client';

import Editor from '@monaco-editor/react';

type Props = {
  value: string;
  onChange?: (val: string) => void;
  language?: string;
  theme?: 'vs-dark' | 'light';
};

export default function MonacoEditor({
  value,
  onChange,
  language = 'html',
  theme = 'vs-dark',
}: Props) {
  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      value={value}
      onChange={(val) => onChange?.(val ?? '')}
      theme={theme}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        automaticLayout: true,
        wordWrap: 'on',       // Enable line wrapping here
        wrappingIndent: 'indent', // Optional: indent wrapped lines
      }}
    />
  );
}
