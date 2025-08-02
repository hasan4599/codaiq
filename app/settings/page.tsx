'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Fetch } from "@/hooks/fetch";
import { StripeSubscription } from "@/lib/types";
import { toast } from "sonner";
import { Info } from "lucide-react";

export default function Settings() {
    const [user, setUser] = useState<{ email: string; name: string; image: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [stripe, setStripe] = useState<StripeSubscription | 'lifetime' | null>(null);
    const [canceling, setCanceling] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchStripe = async () => {
            const response = await Fetch({ body: '', api: 'get/user/stripe', method: "GET", host: 'server', loading: () => { } });
            if (response) {
                setStripe(response);
            }
            setLoading(false);
        };
        fetchStripe();
    }, []);

    useEffect(() => {
        setLoading(true);
        const fetchUser = async () => {
            const response = await Fetch({ body: '', api: 'get/user/selected', method: "GET", host: 'server', loading: () => { } });
            if (response) {
                setUser({
                    name: response.fullName,
                    email: response.email,
                    image: response.avatarUrl
                });
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    const handleCancelSubscription = async () => {
        if (!stripe || stripe === 'lifetime') return toast.error('Invalid subscription id');

        setCanceling(true);
        const res: StripeSubscription | 'lifetime' = await Fetch({
            api: "stripe/cancel-subscription",
            method: "POST",
            host: "server",
            body: { subscriptionId: stripe.id },
            loading: setLoading
        });

        if (res) {
            toast.success("Subscription canceled successfully");
            setStripe((prev) =>
                typeof prev === 'string' || prev === null
                    ? prev
                    : {
                        ...prev,
                        cancel_at_period_end: true,
                        status: "canceled",
                    } as StripeSubscription
            );

            setShowCancelModal(false);
        } else {
            toast.error("Failed to cancel subscription");
        }
        setCanceling(false);
    };

    const manageUrl = typeof stripe === 'object' ? stripe?.invoice_pdf_url : null;

    return (
        <div className="bg-gradient-to-br from-[#06081c] via-[#08071d] to-[#140625] w-full h-screen flex flex-col text-white relative">
            {/* Blurred Gradient Background */}
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

            {/* Main content */}
            <div className="w-full px-6 py-10 overflow-y-auto" style={{ height: 'calc(100% - 64px)' }}>
                <div className="max-w-3xl mx-auto space-y-6">
                    {/* User Profile */}
                    {user && (
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 flex items-center gap-6 shadow-lg">
                            <Image
                                src={user.image || "/avatar.svg"}
                                alt="User Avatar"
                                width={64}
                                height={64}
                                className="rounded-full border border-white/20"
                            />
                            <div>
                                <h2 className="text-xl font-semibold">{user.name}</h2>
                                <p className="text-sm text-gray-300">{user.email}</p>
                            </div>
                        </div>
                    )}

                    {/* Lifetime Plan */}
                    {stripe === 'lifetime' && (
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-lg space-y-4">
                            <h2 className="text-xl font-semibold">Lifetime Enterprise Access</h2>
                            <ul className="list-disc pl-6 text-sm space-y-1 text-gray-300">
                                <li>All Enterprise features with lifetime access</li>
                                <li>Unlimited AI on dedicated infrastructure</li>
                                <li>CRM lead capture & automation</li>
                                <li>Staging environment & one‑click rollback</li>
                                <li>Advanced SEO & analytics</li>
                                <li>Chatbot integration</li>
                                <li>Performance optimization</li>
                                <li>3 free domains in Year 1 + 30 % off renewals</li>
                                <li>Early access to beta features</li>
                                <li>Lifetime updates & upgrades</li>
                                <li>Priority feature requests</li>
                                <li>24/7 personal WhatsApp support</li>
                            </ul>
                            <p className="text-gray-400 pt-4 text-sm">
                                <span className="font-semibold text-white">One‑time investment</span> for lifetime access to every Enterprise capability — plus beta previews, ongoing updates, renewal discounts, priority feature requests, and round‑the‑clock WhatsApp support.
                            </p>
                        </div>
                    )}

                    {/* Subscription Info */}
                    {typeof stripe === 'object' && stripe && (
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-lg space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Subscription Details</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-400">Status</span>
                                    <p className="text-white capitalize">
                                        {stripe.status}
                                        {stripe.cancel_at_period_end && " (cancel at period end)"}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-gray-400">Billing Cycle</span>
                                    <p className="text-white capitalize">{stripe.items.data[0].price.recurring.interval}ly</p>
                                </div>
                                <div>
                                    <span className="text-gray-400">Amount</span>
                                    <p className="text-white">
                                        ${(stripe.items.data[0].price.unit_amount / 100).toFixed(2)} {stripe.currency.toUpperCase()}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-gray-400">Start Date</span>
                                    <p className="text-white">{new Date(stripe.start_date * 1000).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <span className="text-gray-400">{stripe.cancel_at_period_end ? "Ends on" : "Renews On"}</span>
                                    <p className="text-white">{new Date(stripe.items.data[0].current_period_end * 1000).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <span className="text-gray-400">Card</span>
                                    <p className="text-white">
                                        {stripe.default_payment_method?.card.brand.toUpperCase()} •••• {stripe.default_payment_method?.card.last4}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <a
                                    href={manageUrl || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 rounded-lg text-sm bg-blue-600 hover:bg-blue-700 transition-colors"
                                >
                                    Download invoice PDF
                                </a>
                                <button
                                    disabled={canceling || stripe.cancel_at_period_end || stripe.status === 'canceled'}
                                    onClick={() => setShowCancelModal(true)}
                                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${stripe.cancel_at_period_end || stripe.status === 'canceled'
                                        ? 'bg-gray-500 cursor-not-allowed'
                                        : 'bg-red-600 hover:bg-red-700'
                                        }`}
                                >
                                    {canceling ? "Cancelling..." : "Cancel Subscription"}
                                </button>
                            </div>
                        </div>
                    )}

                    {!user && !loading && (
                        <div className="max-w-md mx-auto flex items-center gap-3 p-4 border border-white/20 bg-white/10 rounded-md text-gray-300">
                            <Info className="w-6 h-6 text-gray-400" />
                            <p className="text-center flex-1">User data not found.</p>
                        </div>
                    )}

                    {stripe === null && !loading && (
                        <div className="max-w-md mx-auto flex items-center gap-3 p-4 border border-white/20 bg-white/10 rounded-md text-gray-300">
                            <Info className="w-6 h-6 text-gray-400" />
                            <p className="text-center flex-1">No active subscription found.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Cancel Subscription Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                    <div className="bg-[#1e1e2f] rounded-lg shadow-lg max-w-md w-full p-6 text-white">
                        <h3 className="text-lg font-semibold mb-4">Confirm Cancellation</h3>
                        <p className="mb-6">Are you sure you want to cancel your subscription? You will lose access to paid features at the end of your billing period.</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition-colors"
                                disabled={canceling}
                            >
                                Close
                            </button>
                            <button
                                onClick={handleCancelSubscription}
                                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                                disabled={canceling}
                            >
                                {canceling ? "Cancelling..." : "Unsubscribe"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
