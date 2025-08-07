'use client'

import { Fetch } from "@/hooks/fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from 'zod';
import Input from "./inputField";
import Button from "./button";
import { toast } from "sonner";

export const signupSchema = z
    .object({
        email: z.string().email({ message: 'Enter a valid email address' }),
        username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
        confirmPassword: z.string(),
        avatar: z.any(), // You can use z.instanceof(File) if desired
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export type SignupSchema = z.infer<typeof signupSchema>;

export default function Userdetails({ email }: { email: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [file, setFile] = useState<File | null>(null);

    const {
        control,
        handleSubmit,
        getValues,
        setValue,
        register,
        formState: { errors },
    } = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: email,
            username: '',
            password: '',
            confirmPassword: '',
            avatar: undefined,
        }
    });


    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.match('image.*') || file.size > 2 * 1024 * 1024) {
            alert('Invalid file: must be an image under 2MB');
            return;
        }
        setFile(file)
        const reader = new FileReader();
        reader.onload = (ev) => {
            setAvatarPreview(ev.target?.result as string);
            setValue('avatar', file as any); // ensure your schema allows File
        };
        reader.readAsDataURL(file);
    };

    const evaluatePasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        setPasswordStrength(strength);
    };

    const onSubmit = async (data: SignupSchema) => {
        if (!file) return toast.error('Please upload your avatar under 2mb');

        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('username', data.username);
        formData.append('file', file)

        const response = await Fetch({
            body: formData,
            api: 'post/auth/signup',
            method: 'POST',
            host: 'server',
            loading: setIsLoading,
            formData: true
        });

        if (response) {
            signIn("credentials", {
                email,
                redirect: true,
                callbackUrl: "/dashboard",
            });
        }
    };

    console.log(errors)
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 sm:p-10 w-full max-w-xl shadow-lg"
        >
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    Create Account
                </h1>
                <p className="text-sm text-gray-400">Join us today and get started</p>
            </div>

            <div className="space-y-5">
                {/* Avatar Upload */}
                <div className="flex flex-col items-center gap-3">
                    <div className="relative group mb-2">
                        <div className="w-24 h-24 rounded-full bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden">
                            {avatarPreview ? (
                                <img src={avatarPreview} className="w-full h-full object-cover" />
                            ) : (
                                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleAvatarUpload}
                        />
                    </div>
                    <p className="text-xs text-gray-400">JPG, PNG up to 2MB</p>
                </div>

                <div className="w-full flex items-center justify-start gap-3">
                    {/* Username */}
                    <Controller
                        name="username"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Username"
                                type="text"
                                placeholder="johndoe"
                                errors={errors.username?.message}
                            />
                        )}
                    />
                </div>

                {/* Password */}
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <>
                            <Input
                                {...field}
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                errors={errors.password?.message}
                                onChange={(val) => {
                                    field.onChange(val);
                                    evaluatePasswordStrength(val);
                                }}
                            />
                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-300 ${passwordStrength <= 1
                                        ? 'bg-red-400 w-1/4'
                                        : passwordStrength <= 3
                                            ? 'bg-yellow-400 w-2/4'
                                            : 'bg-green-400 w-full'
                                        }`}
                                />
                            </div>
                            <p className="text-xs mt-1 text-gray-400">
                                Password strength: {['None', 'Weak', 'Medium', 'Strong'][Math.min(passwordStrength, 3)]}
                            </p>
                        </>
                    )}
                />

                {/* Confirm Password */}
                <input
                    {...register("confirmPassword")}
                    type="password"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition duration-200"
                    placeholder="Confirm Password"
                    required
                />
                <Button
                    onPress={handleSubmit(onSubmit)}
                    loading={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg shadow-indigo-500/30" variant={0}>
                    Create Account
                </Button>
            </div>
        </motion.section>
    );
}