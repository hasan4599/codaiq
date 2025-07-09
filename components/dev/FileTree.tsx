import { FileProps } from "@/app/dev/[id]/page";
import {
    Folder,
    FolderOpen,
} from "lucide-react";
import { getIconForFile } from "./getIconForFile";

export function FileTree({
    tree,
    openFolders,
    toggleFolder,
    onSelect,
    selectedFileName,
    path = "",
}: {
    tree: any;
    openFolders: Record<string, boolean>;
    toggleFolder: (path: string) => void;
    onSelect: (file: FileProps) => void;
    selectedFileName: string | null;
    path?: string;
}) {
    return (
        <ul className="space-y-1">
            {Object.entries(tree).map(([key, value]) => {
                const fullPath = path ? `${path}/${key}` : key;
                const isOpen = openFolders[fullPath];

                const node = value as any;

                if (node.isFile) {
                    return (
                        <li
                            key={fullPath}
                            className={`flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors ${selectedFileName === node.name ? "bg-gray-800" : ""
                                }`}
                            onClick={() => onSelect(node)}
                            title={node.name}
                        >
                            {getIconForFile(key)}
                            <span className="truncate">{key}</span>
                        </li>
                    );
                } else {
                    return (
                        <li key={fullPath}>
                            <div
                                className="flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors"
                                onClick={() => toggleFolder(fullPath)}
                            >
                                {isOpen ? (
                                    <FolderOpen className="w-4 h-4 text-yellow-300" />
                                ) : (
                                    <Folder className="w-4 h-4 text-yellow-300" />
                                )}
                                <span className="truncate">{key}</span>
                            </div>
                            {isOpen && (
                                <div className="ml-4">
                                    <FileTree
                                        tree={node}
                                        openFolders={openFolders}
                                        toggleFolder={toggleFolder}
                                        onSelect={onSelect}
                                        selectedFileName={selectedFileName}
                                        path={fullPath}
                                    />
                                </div>
                            )}
                        </li>
                    );
                }
            })}
        </ul>

    );
}