'use client';

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Support() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !message) return toast.error("Please fill out both fields.");

        setLoading(true);

        const res = await fetch("/api/post/mail/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, message, subject: 'From Support' }),
        });

        const data = await res.json();
        if (res.ok) {
            toast.success("Your message has been sent!");
            setEmail('');
            setMessage('');
        } else {
            toast.error(data.error || "Failed to send message.");
        }

        setLoading(false);
    };

    return (
        <div className="bg-gradient-to-br from-[#06081c] via-[#08071d] to-[#140625] w-full min-h-screen flex flex-col text-white relative">
            {/* Blurred Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-32 -left-20 h-[28rem] w-[28rem] rounded-full bg-[#0d1b4f] opacity-40 blur-3xl"></div>
                <div className="absolute bottom-[-10rem] right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-[#26004d] opacity-40 blur-3xl"></div>
            </div>

            {/* Header */}
            <header className="w-full border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-xl h-[64px] relative z-10">
                <div className="px-4 w-full">
                    <div className="flex h-16 items-center justify-between w-full">
                        <Link href="/dashboard" className="w-[140px] h-[50px] flex items-center relative">
                            <Image fill src={"/logo.svg"} alt="logo" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="w-full px-6 py-5 flex-1">
                <div className="max-w-3xl mx-auto space-y-10">
                    <h1 className="text-3xl font-bold text-center">Need Help?</h1>
                    <p className="text-center text-gray-300 max-w-xl mx-auto">
                        Our support team is here for you. Submit your issue below or call us directly.
                    </p>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-md space-y-4">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                            <Mail className="w-5 h-5 text-green-400" />
                            Email Support
                        </h3>

                        <input
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <textarea
                            rows={5}
                            placeholder="Describe your issue..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 rounded-md bg-green-600 hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>

                    <div className="w-full flex flex-col md:flex-row items-start justify-start gap-10">
                        {/* Call Info */}
                        <div className="w-full md:w-1/2 h-[200px] bg-white/5 border border-white/10 rounded-lg p-6 flex flex-col items-center text-center backdrop-blur-md shadow-md hover:shadow-lg transition-all">
                            <Phone className="w-8 h-8 mb-3 text-pink-400" />
                            <h3 className="font-semibold mb-1">Call Us</h3>
                            <p className="text-sm text-gray-300">
                                Talk to support at <br />
                                <span className="text-white font-medium">+880 1234-567890</span>
                            </p>
                        </div>
                        <Link
                            href="/help-center"
                            className="w-full md:w-1/2 h-[200px] bg-white/5 border border-white/10 rounded-lg p-6 flex flex-col items-center text-center backdrop-blur-md shadow-md hover:shadow-lg hover:bg-white/10 transition-all"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8 mb-3 text-yellow-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8 10h.01M12 14h.01M16 10h.01M21 16.5A2.5 2.5 0 0118.5 19h-13A2.5 2.5 0 013 16.5v-9A2.5 2.5 0 015.5 5h13A2.5 2.5 0 0121 7.5v9z"
                                />
                            </svg>
                            <h3 className="font-semibold mb-1">FAQs</h3>
                            <p className="text-sm text-gray-300">
                                Browse frequently asked questions and find instant answers.
                            </p>
                            <span className="mt-3 inline-block bg-yellow-600 px-4 py-1 rounded-full text-sm text-white hover:bg-yellow-700 transition-colors">
                                Go to FAQ
                            </span>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
