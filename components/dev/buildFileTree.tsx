import { FileProps } from "@/app/dev/[id]/page";

export function buildFileTree(files: FileProps[]) {
  const tree: any = {};
  for (const file of files) {
    const parts = file.name.split("/");
    let current = tree;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] =
          i === parts.length - 1
            ? { ...file, isFile: true, fullPath: file.name }
            : {};
      }
      current = current[part];
    }
  }
  return tree;
}
