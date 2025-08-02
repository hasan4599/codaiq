'use client';

import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { Fetch } from "@/hooks/fetch";
import { motion } from "framer-motion";

type BuyDomain = {
    name: string;
    extension: string;
    period?: number;
    autorenew?: "default" | "off" | "on";
    nameServers?: { name: string }[];
};

interface DomainPriceDetails {
    price: number;
    currency: string;
}

interface DomainPrice {
    product: DomainPriceDetails;
    reseller: DomainPriceDetails;
}

interface DomainCheckResult {
    domain: string;
    status: string;
    reason: string;
    price: DomainPrice;
}

export default function Domain() {
    const [domainInput, setDomainInput] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<DomainCheckResult[]>([]);
    const [tab, setTab] = useState<"buy" | "owned">("buy");

    // Modal state
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState<DomainCheckResult | null>(null);

    // Modal form state
    const [period, setPeriod] = useState<number>(1);
    const [autorenew, setAutorenew] = useState<"default" | "off" | "on">("default");
    const [nameServers, setNameServers] = useState<string[]>(["", "", ""]);

    const handleDomainCheck = async () => {
        if (!domainInput.trim()) {
            toast.error("Please enter a domain name");
            return;
        }

        setLoading(true);
        setResult([]);

        try {
            const res = await Fetch({
                api: 'post/domain/check',
                host: 'server',
                loading: setLoading,
                method: 'POST',
                body: { domain: domainInput.trim() }
            });

            if (res) {
                setResult(res);
            } else {
                toast.error("No response from server");
            }
        } catch (error) {
            toast.error("Failed to check domain");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Open modal on Buy click
    const openBuyModal = (domain: DomainCheckResult) => {
        setSelectedDomain(domain);
        setPeriod(1);
        setAutorenew("default");
        setNameServers(["", "", ""]);
        setShowBuyModal(true);
    };

    // Handle modal submit
    const handleBuySubmit = async () => {
        if (!selectedDomain) return;

        // Validate name servers (optional, allow empty)
        const filteredNameServers = nameServers
            .map(ns => ns.trim())
            .filter(ns => ns.length > 0)
            .map(ns => ({ name: ns }));

        // Prepare payload
        const buyPayload: BuyDomain = {
            name: selectedDomain.domain.split(".")[0],
            extension: selectedDomain.domain.split(".").slice(1).join("."),
            period,
            autorenew,
            nameServers: filteredNameServers.length > 0 ? filteredNameServers : undefined,
        };

        try {
            setLoading(true);
            const res = await Fetch({
                api: "post/domain/register",
                host: "server",
                loading: setLoading,
                method: "POST",
                body: buyPayload,
            });

            toast.success(`Domain ${selectedDomain.domain} purchased successfully!`);
            setShowBuyModal(false);
            // Optionally refresh domain lists or UI here
        } catch (err) {
            toast.error("Failed to purchase domain.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-[#06081c] via-[#08071d] to-[#140625] w-full min-h-screen flex flex-col text-white relative">

            {/* Blurred Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-32 -left-20 h-[28rem] w-[28rem] rounded-full bg-[#0d1b4f] opacity-40 blur-3xl"></div>
                <div className="absolute bottom-[-10rem] right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-[#26004d] opacity-40 blur-3xl"></div>
            </div>

            {/* Header */}
            <header className="w-full border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-xl h-[64px] relative z-10 mb-8">
                <div className="px-4 w-full">
                    <div className="flex h-16 items-center justify-between w-full">
                        <Link href="/dashboard" className="w-[140px] h-[50px] flex items-center relative">
                            <Image fill src={"/logo.svg"} alt="logo" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Tab Selector */}
            <div className="w-full max-w-2xl mx-auto px-4 mb-4 flex items-center justify-center gap-4 z-10 relative">
                <button
                    onClick={() => setTab("buy")}
                    className={`px-4 py-2 rounded-md text-sm font-semibold transition ${tab === "buy"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`}
                >
                    🛒 Buy Domain
                </button>
                <button
                    onClick={() => setTab("owned")}
                    className={`px-4 py-2 rounded-md text-sm font-semibold transition ${tab === "owned"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`}
                >
                    📁 My Domains
                </button>
            </div>

            {/* Buy Domain Tab */}
            {tab === "buy" && (
                <main className="relative z-10 flex flex-col gap-6 w-full max-w-2xl mx-auto bg-black bg-opacity-60 backdrop-blur-md border border-gray-600 rounded-lg p-8 shadow-lg">
                    <label htmlFor="domain-input" className="text-lg font-semibold">Enter a domain to check:</label>
                    <div className="flex gap-4">
                        <input
                            id="domain-input"
                            type="text"
                            placeholder="example.com"
                            className="flex-grow px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={domainInput}
                            onChange={(e) => setDomainInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleDomainCheck() }}
                            disabled={loading}
                        />
                        <button
                            onClick={handleDomainCheck}
                            disabled={loading}
                            className="px-6 py-3 rounded-md font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            {loading ? "Checking..." : "Check"}
                        </button>
                    </div>

                    {/* Result */}
                    <div className="w-full h-[400px] overflow-y-auto">
                        {result.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
                                whileHover={{ boxShadow: "0 8px 16px rgba(0,0,0,0.4)" }}
                                className="mt-4 px-4 py-3 rounded-lg bg-[#10101a] border border-gray-700 shadow-sm cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition text-sm"
                            >
                                <div className="space-y-1">
                                    <p className="font-medium text-white">{item.domain}</p>
                                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${item.status === 'free'
                                            ? 'bg-green-500/10 text-green-400 border border-green-600'
                                            : ['taken', 'active'].includes(item.status)
                                                ? 'bg-red-500/10 text-red-400 border border-red-600'
                                                : 'bg-yellow-500/10 text-yellow-400 border border-yellow-600'
                                        }`}>
                                        {item.status || 'Unknown'}
                                    </span>
                                </div>

                                <div className="flex flex-col items-end space-y-2 text-xs sm:text-sm text-right text-gray-300">
                                    {item.price?.product && (
                                        <p>
                                            <span className="text-white font-semibold">
                                                {item.price.product.price}
                                            </span>{" "}
                                            {item.price.product.currency}
                                        </p>
                                    )}
                                    {item.status === "free" && (
                                        <button
                                            onClick={() => openBuyModal(item)}
                                            className="px-3 py-1 rounded-md text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition"
                                        >
                                            Buy
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </main>
            )}

            {/* My Domains Tab */}
            {tab === "owned" && (
                <main className="relative z-10 w-full max-w-2xl mx-auto bg-black bg-opacity-60 backdrop-blur-md border border-gray-600 rounded-lg p-8 shadow-lg text-sm text-gray-300">
                    <h2 className="text-white text-lg font-semibold mb-4">Your Domains</h2>
                    <p>🔒 This section will display your registered domains.</p>
                    <p className="mt-2 text-gray-500">[Integration with your domain list API goes here]</p>
                </main>
            )}

            {/* Buy Modal */}
            {showBuyModal && selectedDomain && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm px-4"
                    onClick={() => setShowBuyModal(false)}
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.25 }}
                        className="bg-gray-900 rounded-lg p-6 max-w-md w-full text-white shadow-lg"
                    >
                        <h3 className="text-xl font-semibold mb-4">Buy Domain: {selectedDomain.domain}</h3>

                        <label className="block mb-2 font-semibold" htmlFor="period-select">Registration Period (years):</label>
                        <select
                            id="period-select"
                            value={period}
                            onChange={(e) => setPeriod(Number(e.target.value))}
                            className="w-full mb-4 rounded-md bg-gray-800 text-white px-3 py-2"
                        >
                            {[...Array(10)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>

                        <label className="block mb-2 font-semibold" htmlFor="autorenew-select">Auto Renew:</label>
                        <select
                            id="autorenew-select"
                            value={autorenew}
                            onChange={(e) => setAutorenew(e.target.value as "default" | "off" | "on")}
                            className="w-full mb-4 rounded-md bg-gray-800 text-white px-3 py-2"
                        >
                            <option value="default">Default</option>
                            <option value="on">On</option>
                            <option value="off">Off</option>
                        </select>

                        <label className="block mb-2 font-semibold">Name Servers (optional):</label>
                        {[0, 1, 2].map((idx) => (
                            <input
                                key={idx}
                                type="text"
                                placeholder={`Name server ${idx + 1}`}
                                className="w-full mb-3 rounded-md bg-gray-800 text-white px-3 py-2"
                                value={nameServers[idx]}
                                onChange={(e) => {
                                    const newServers = [...nameServers];
                                    newServers[idx] = e.target.value;
                                    setNameServers(newServers);
                                }}
                            />
                        ))}

                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                onClick={() => setShowBuyModal(false)}
                                className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBuySubmit}
                                disabled={loading}
                                className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                {loading ? "Processing..." : "Confirm Purchase"}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
