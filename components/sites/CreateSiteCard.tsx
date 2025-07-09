'use client';

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { useState } from "react";

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

type FormData = z.infer<typeof formSchema>;

export interface SiteProps {
    title: string;
    description: string;
    keywords: string[];
    authors: { name: string; url: string }[];
    creator: string;
    repoURL: string;
}

export function CreateSiteCard({ onCreate }: { onCreate: (data: SiteProps) => void }) {
    const [open, setOpen] = useState(false);
    const {
        control,
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            keywordsText: "",
            creator: "",
            repoURL: "",
            authors: [{ name: "", url: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "authors",
    });

    const onSubmit = (data: FormData) => {
        const keywords = data.keywordsText
            ? data.keywordsText.split(",").map((k) => k.trim()).filter(Boolean)
            : [];

        onCreate({
            title: data.title,
            description: data.description,
            keywords,
            authors: data.authors,
            creator: data.creator,
            repoURL: data.repoURL,
        });
        setOpen(false);
        reset();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="group relative bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-lg rounded-md border border-dashed border-gray-700/40 hover:border-gray-500/60 transition duration-200 w-[350px] h-[450px] p-6 cursor-pointer flex flex-col justify-center items-center text-center">
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
                </div>
            </DialogTrigger>


            <DialogContent className="sm:max-w-lg text-left space-y-6">
                <DialogHeader>
                    <DialogTitle>Create New Site</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => <Input placeholder="Site Title" {...field} />}
                    />
                    {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => <Textarea placeholder="Site Description" {...field} />}
                    />
                    {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}

                    <Controller
                        name="keywordsText"
                        control={control}
                        render={({ field }) => <Input placeholder="Keywords (comma separated)" {...field} />}
                    />

                    <div>
                        <label className="block font-medium mb-2">Authors</label>
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex space-x-2 mb-2">
                                <Controller
                                    name={`authors.${index}.name`}
                                    control={control}
                                    render={({ field }) => <Input placeholder="Author Name" {...field} />}
                                />
                                <Controller
                                    name={`authors.${index}.url`}
                                    control={control}
                                    render={({ field }) => <Input placeholder="Author URL" {...field} />}
                                />
                                {fields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-red-500 font-bold"
                                    >
                                        &times;
                                    </button>
                                )}
                            </div>
                        ))}
                        {errors.authors && (
                            <p className="text-sm text-red-500">{errors.authors.message as string}</p>
                        )}
                        <Button type="button" size="sm" onClick={() => append({ name: "", url: "" })}>
                            + Add Author
                        </Button>
                    </div>

                    <Controller
                        name="creator"
                        control={control}
                        render={({ field }) => <Input placeholder="Creator" {...field} />}
                    />
                    {errors.creator && <p className="text-sm text-red-500">{errors.creator.message}</p>}

                    <Controller
                        name="repoURL"
                        control={control}
                        render={({ field }) => (
                            <Input placeholder="Enter your Git template HTTPS link" {...field} />
                        )}
                    />
                    {errors.repoURL && (
                        <p className="text-sm text-red-500">{errors.repoURL.message}</p>
                    )}

                    <DialogFooter>
                        <Button type="submit">Create Site</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
