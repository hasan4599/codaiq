'use client'

import { Fetch } from "@/hooks/fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { GoArrowRight } from "react-icons/go";
import { z } from 'zod';
import Button from "./button";

export const verificationSchema = z.object({
    code: z.string().min(6)
});

export type VerificationSchema = z.infer<typeof verificationSchema>;

type VerificationCode = {
    email: string;
    onSuccess: (data: VerificationSchema) => void;
};

export default function Verification_Code({ email, onSuccess }: VerificationCode) {
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm<VerificationSchema>({
        resolver: zodResolver(verificationSchema),
        defaultValues: { code: "" }
    });

    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        const sendVerificationCode = async (email: string) => {
            try {
                setIsLoading(true);
                const response = await Fetch({
                    body: { email },
                    api: 'post/auth/verification',
                    method: 'POST',
                    host: 'server',
                    loading: setIsLoading
                });
            } finally {
                setIsLoading(false);
            }
        };

        if (email) {
            sendVerificationCode(email);
        }
    }, [email]);

    const codeCleaner = async (email: string) => {
        await Fetch({ body: { email }, api: 'post/auth/clean', method: 'POST', host: 'server', loading: setIsLoading });
    };

    const verifyUser = async () => {
        const code = getValues("code");
        if (code.length !== 6) {
            alert("Please enter the full 6-digit code.");
            return;
        }

        try {
            setIsLoading(true);
            const response = await Fetch({
                body: { email, code },
                api: 'post/auth/verify',
                method: 'POST',
                host: 'server',
                loading: setIsLoading
            });
            if (response) {
                onSuccess({ code });
                codeCleaner(email);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle input change and keyboard navigation
    const handleInputChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return; // Only digits or empty allowed

        // Build new code string
        const currentCode = getValues("code").split('');
        currentCode[index] = value;
        const newCode = currentCode.join('');
        setValue("code", newCode);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !getValues("code")[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
            e.preventDefault();
        } else if (e.key === 'ArrowLeft' && index > 0) {
            inputsRef.current[index - 1]?.focus();
            e.preventDefault();
        } else if (e.key === 'ArrowRight' && index < 5) {
            inputsRef.current[index + 1]?.focus();
            e.preventDefault();
        }
    };

    // Handle paste (for 6-digit code)
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const paste = e.clipboardData.getData('text');
        if (/^\d{6}$/.test(paste)) {
            setValue("code", paste);
            // Fill inputs manually
            paste.split('').forEach((digit, i) => {
                if (inputsRef.current[i]) inputsRef.current[i]!.value = digit;
            });
            inputsRef.current[5]?.focus();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-6 relative space-y-5">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            <motion.div
                key="verification-code"
                className="w-full max-w-md p-8 sm:p-10 glass bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl text-center text-gray-100 font-sans"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    Verify Your Email
                </h1>
                <p className="text-sm text-gray-400 mb-8">
                    We've sent a 6-digit code to your email address
                </p>

                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(verifyUser)}
                    spellCheck={false}
                    noValidate
                >
                    <Controller
                        name="code"
                        control={control}
                        render={() => (
                            <div className="flex justify-center space-x-3 mb-4">
                                {[0, 1, 2, 3, 4, 5].map((i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        pattern="\d"
                                        className="w-12 h-12 text-2xl text-center rounded-lg bg-white/5 border border-white/10
                    focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition duration-200"
                                        ref={el => { inputsRef.current[i] = el; }}
                                        onChange={e => handleInputChange(i, e.target.value)}
                                        onKeyDown={e => handleKeyDown(e, i)}
                                        onPaste={handlePaste}
                                        aria-label={`Digit ${i + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    />

                    <Button
                        variant={0}
                        onPress={handleSubmit(verifyUser)}
                        loading={isLoading}
                        icon={<GoArrowRight className="text-xl" />}
                        className="w-full py-3 text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg shadow-lg shadow-indigo-500/30 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        Verify
                    </Button>
                </form>
            </motion.div>
        </div>

    );
}
