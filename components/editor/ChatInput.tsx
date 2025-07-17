'use client';

import {
    Paintbrush,
    UserPlus2,
    Settings,
    ArrowUp,
} from 'lucide-react';
import { useState } from 'react';

export default function ChatInput({
    submit
}: {
    submit: (e: string) => void;
}) {
    const [input, setInput] = useState('');

    const onInputChange = (value: string) => {
        setInput(value);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        submit(input);
        setInput('');
    };

    return (
        <form
            onSubmit={onSubmit}
            className="absolute bottom-5 left-[4%] bg-neutral-800 border border-neutral-700 rounded-2xl ring-[4px] focus-within:ring-neutral-500/30 focus-within:border-neutral-600 ring-transparent z-10 w-[90%] group"
        >
            {/* Input Field */}
            <div className="w-full relative flex items-center justify-between">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => onInputChange(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none text-white placeholder:text-neutral-400 p-4"
                    placeholder="Ask Codaiq anything..."
                />
            </div>

            {/* Footer with buttons */}
            <div className="flex items-center justify-between gap-2 px-4 pb-3">
                {/* Left-side buttons */}
                <div className="flex-1 flex items-center justify-start gap-1.5">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center size-7 rounded-full border !border-neutral-600 text-neutral-400 hover:!border-neutral-500 hover:!text-neutral-300 transition bg-background dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
                    >
                        <Paintbrush className="size-4" />
                    </button>

                    <button
                        type="button"
                        className="inline-flex items-center justify-center size-7 rounded-full border !border-neutral-600 text-neutral-400 hover:!border-neutral-500 hover:!text-neutral-300 transition bg-background dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
                    >
                        <UserPlus2 className="size-4" />
                    </button>
                </div>

                {/* Right-side buttons */}
                <div className="flex items-center justify-end gap-2">
                    {/* Settings Button */}
                    <button
                        type="button"
                        className="inline-flex items-center gap-1.5 h-8 rounded-full px-3 text-[13px] text-neutral-300 bg-neutral-950 hover:brightness-110 transition"
                    >
                        <Settings className="size-4" />
                        Settings
                    </button>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="inline-flex items-center justify-center size-7 rounded-full bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ArrowUp className="size-4" />
                    </button>
                </div>
            </div>
        </form>
    );
}
