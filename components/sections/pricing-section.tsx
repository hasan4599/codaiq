"use client";

import { StripeProduct, StripePrice } from "@/app/page";
import { Fetch } from "@/hooks/fetch";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export default function PricingSection({ pricingPlans }: { pricingPlans: StripeProduct[] }) {
  const [isYearly, setIsYearly] = useState(false);

  const handleCheckout = async ({ priceId, type }: { priceId: string, type: 'subscription' | 'payment' }) => {
    const response = await Fetch({
      api: "stripe/checkout",
      body: { priceId, type: type },
      host: "server",
      method: "POST",
      loading: () => { },
    });
    if (typeof response === "string" && response.startsWith("http")) {
      window.location.href = response;
    } else {
      toast.error(response);
    }
  };

  return (
    <section
      id="pricing"
      className="w-full py-32 px-4 lg:px-8 bg-gradient-to-b from-[#0a101f] to-[#020617]"
    >
      <div className="w-full">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="w-full flex items-center flex-col justify-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-center mb-20">
            Enterprise-Grade
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h2>

          {/* Yearly / Monthly Toggle */}
          <div className="mb-16 flex justify-center gap-4 bg-white/5 backdrop-blur-lg p-2 rounded-full border border-white/10 shadow-lg shadow-blue-500/10">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-8 py-3 rounded-full text-lg font-medium ${!isYearly
                ? "bg-gradient-to-r from-blue-400 to-purple-500 text-gray-900 shadow-lg"
                : "bg-transparent text-gray-300 hover:bg-white/5"
                } transition-all`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-8 py-3 rounded-full text-lg font-medium ${isYearly
                ? "bg-gradient-to-r from-blue-400 to-purple-500 text-gray-900 shadow-lg"
                : "bg-transparent text-gray-300 hover:bg-white/5"
                } transition-all`}
            >
              Yearly Billing
            </button>
          </div>
          {/* Pricing Grid */}
          <div className="flex items-start justify-start flex-wrap gap-8">
            {[
              // 1. Recurring plans first (left)
              ...[...pricingPlans].filter(plan =>
                !plan.prices.some(p => p.recurring === null)
              ),
              // 2. One-time plans last (right)
              ...[...pricingPlans].filter(plan =>
                plan.prices.some(p => p.recurring === null)
              )
            ].map((plan) => {
              // Check if plan has a one-time price (non-recurring)
              const oneTimePrice = plan.prices.find(p => p.recurring === null && p.unit_amount !== null);

              if (oneTimePrice) {
                // Show one-time purchase price, ignore toggle
                const displayPrice = (oneTimePrice.unit_amount! / 100).toFixed(2);
                const intervalLabel = "one-time";

                return (
                  <motion.div
                    key={plan.id}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0 }}
                    className="relative group flex flex-col h-[940px] w-full max-w-[400px] rounded-3xl border-2 bg-gradient-to-b from-white/5 to-white/[0.01] border-white/10 group-hover:border-white/20 transition-all"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-all -z-10" />
                    <div className="p-8 flex flex-col items-center justify-between h-full">
                      <div>
                        <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>

                        <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                          ${displayPrice}
                          <span className="text-lg text-gray-400">/{intervalLabel}</span>
                        </div>

                        <p className="text-sm text-white/80 mb-6 line-clamp-4">
                          {plan.description || "No description available."}
                        </p>

                        <ul className="space-y-4 mb-8">
                          {plan.marketing_features.map((feature, j) => (
                            <li key={j} className="flex items-start gap-3 text-gray-200">
                              <FontAwesomeIcon
                                icon={faCheck as IconProp}
                                className="text-blue-400 mt-1 flex-shrink-0"
                              />
                              {feature.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button
                        onClick={() => handleCheckout({ priceId: oneTimePrice.id, type: 'payment' })}
                        className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 hover:shadow-purple-400/30 hover:shadow-xl text-gray-900 transition-all"
                      >
                        Buy Now
                      </button>
                    </div>
                  </motion.div>
                );
              }

              // Otherwise, recurring plan: pick price based on toggle
              const selectedPrice = plan.prices.find(
                (p) => p.recurring?.interval === (isYearly ? "year" : "month") && p.unit_amount !== null
              );

              if (!selectedPrice) return null;

              const displayPrice = (selectedPrice.unit_amount! / 100).toFixed(2);
              const intervalLabel = selectedPrice.recurring?.interval ?? "one-time";

              return (
                <motion.div
                  key={plan.id}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0 }}
                  className="relative group flex flex-col h-[940px] w-full max-w-[400px] rounded-3xl border-2 bg-gradient-to-b from-white/5 to-white/[0.01] border-white/10 group-hover:border-white/20 transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-all -z-10" />
                  <div className="p-8 flex flex-col items-center justify-between h-full">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>

                      <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        ${displayPrice}
                        <span className="text-lg text-gray-400">/{intervalLabel}</span>
                      </div>

                      <p className="text-sm text-white/80 mb-6 line-clamp-4">
                        {plan.description || "No description available."}
                      </p>

                      <ul className="space-y-4 mb-8">
                        {plan.marketing_features.map((feature, j) => (
                          <li key={j} className="flex items-start gap-3 text-gray-200">
                            <FontAwesomeIcon
                              icon={faCheck as IconProp}
                              className="text-blue-400 mt-1 flex-shrink-0"
                            />
                            {feature.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => handleCheckout({ priceId: selectedPrice.id, type: 'subscription' })}
                      className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 hover:shadow-purple-400/30 hover:shadow-xl text-gray-900 transition-all"
                    >
                      Start 7 Days Free Trial
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
