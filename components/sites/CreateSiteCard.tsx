'use client';

import { z } from "zod";
import { Plus } from "lucide-react";
import Link from "next/link";
import { server } from "@/url";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    keywordsText: z.string().optional(),
    creator: z.string().min(1, "Creator is required"),
    repoURL: z.string().url("Repo URL must be a valid HTTPS link"),
    authors: z.array(
        z.object({
            name: z.string().min(1, "Author name required"),
            url: z.string().url("Author URL must be valid"),
        })
    ).min(1, "At least one author is required"),
});

export interface SiteProps {
    title: string;
    description: string;
    keywords: string[];
    authors: { name: string; url: string }[];
    creator: string;
    repoURL: string;
}

export function CreateSiteCard() {

    return (
        <Link
            href={`${server}/projects/new`}
            className="group relative bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-lg rounded-2xl border border-dashed border-gray-700/40 hover:border-gray-500/60 transition duration-200 w-[250px] h-[300px] p-6 cursor-pointer flex flex-col justify-center items-center text-center">
            <div className="flex flex-col items-center gap-4 text-gray-300 group-hover:text-white transition text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:bg-blue-500/20 transition">
                    <Plus className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Start Building with AI</h3>
                    <p className="text-sm max-w-[260px] mx-auto text-gray-400 group-hover:text-gray-300 transition">
                        Ready to develop your website using AI? We'll take care of the hosting so you can focus on building.
                    </p>
                </div>
                <div className="mt-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-700/40 text-gray-300 rounded-full">
                        Create New Site
                    </span>
                </div>
            </div>
        </Link>
    );
}
