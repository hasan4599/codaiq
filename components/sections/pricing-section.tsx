"use client";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faGem } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useState } from "react";

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(true); // Annual plan shown first
  const pricingPlans = [
    {
      name: "Starter",
      monthly: 29,
      yearly: 19,
      firstMonth: 9.99,
      originalFirstMonth: 19.99,
      features: [
        "7-day free trial",
        "1 Domain (+$15 fee)",
        "1 User",
        "SSL Certificate",
        "Daily Backups",
        "24/7 Email Support",
        "1 GB RAM",
        "5 GB Storage",
        "10 AI Generations/Month",
      ],
      popular: false,
    },
    {
      name: "Pro",
      monthly: 49,
      yearly: 35,
      firstMonth: 9.99,
      originalFirstMonth: 19.99,
      features: [
        "7-day free trial",
        "1 Free Domain",
        "Up to 5 Users",
        "Automated Staging",
        "Advanced SEO Tools",
        "Real-time Analytics",
        "2 GB RAM",
        "20 GB Storage",
        "100 AI Generations/Month",
        "API Access",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      monthly: 99,
      yearly: 79,
      firstMonth: 9.99,
      originalFirstMonth: 19.99,
      features: [
        "7-day free trial",
        "3 Free Domains",
        "Up to 10 Users",
        "White-labeling",
        "SSO Integration",
        "Dedicated Resources",
        "Unlimited Backups",
        "4 GB RAM",
        "Unlimited Storage",
        "Unlimited AI Generations",
        "Premium Support",
      ],
      popular: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="py-32 px-4 lg:px-8 bg-gradient-to-b from-[#0a101f] to-[#020617]"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-center mb-20">
            Enterprise-Grade
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h2>

          {/* Toggle */}
          <div className="flex justify-center mb-20">
            <div className="bg-white/5 backdrop-blur-lg p-2 rounded-full inline-flex gap-2 border border-white/10 shadow-lg shadow-blue-500/10">
              <button
                onClick={() => setIsYearly(true)}
                className={`px-8 py-3 rounded-full text-lg font-medium ${
                  isYearly
                    ? "bg-gradient-to-r from-blue-400 to-purple-500 text-gray-900 shadow-lg"
                    : "bg-transparent text-gray-300 hover:bg-white/5"
                } transition-all`}
              >
                Yearly Billing (Save 35%)
              </button>
              <button
                onClick={() => setIsYearly(false)}
                className={`px-8 py-3 rounded-full text-lg font-medium ${
                  !isYearly
                    ? "bg-gradient-to-r from-blue-400 to-purple-500 text-gray-900 shadow-lg"
                    : "bg-transparent text-gray-300 hover:bg-white/5"
                } transition-all`}
              >
                Monthly Billing
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-all -z-10" />
                <div
                  className={`p-8 rounded-3xl border-2 bg-gradient-to-b from-white/5 to-white/[0.01] ${
                    plan.popular
                      ? "border-purple-400 group-hover:border-purple-400/80"
                      : "border-white/10 group-hover:border-white/20"
                  } transition-all`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-400 to-blue-500 text-gray-900 px-6 py-2 rounded-bl-xl text-sm font-bold shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-2 text-white">
                      {plan.name}
                    </h3>
                    <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                      ${isYearly ? plan.yearly : plan.monthly}
                      <span className="text-lg text-gray-400">/month</span>
                    </div>
                    {isYearly && (
                      <p className="text-gray-400">
                        Billed annually at ${plan.yearly * 12}
                      </p>
                    )}
                    {!isYearly && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-400">First month</p>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 line-through text-sm">
                            ${plan.originalFirstMonth}
                          </span>
                          <span className="text-green-400 font-bold text-lg">
                            ${plan.firstMonth}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <FontAwesomeIcon
                          icon={faCheck as IconProp}
                          className="text-blue-400 mt-1 flex-shrink-0"
                        />
                        <span className="text-gray-200">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3">
                    <button
                      className={`w-full py-4 rounded-xl font-bold transition-all ${
                        plan.popular
                          ? "bg-gradient-to-r from-purple-400 to-blue-400 hover:shadow-purple-400/30 hover:shadow-xl text-gray-900"
                          : "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white"
                      }`}
                    >
                      Start Free Trial
                    </button>
                    <p className="text-center text-sm text-gray-400 font-medium">
                      <strong className="text-green-400">
                        14-Day Money-Back Guarantee
                      </strong>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lifetime Deal */}
          <motion.div
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="relative group mt-20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-blue-400/10 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-purple-400/20 -z-10" />
            <div className="p-8 rounded-3xl border-2 border-purple-400/30 bg-gradient-to-b from-white/5 to-white/[0.01]">
              <div className="text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center bg-purple-400/20 px-6 py-2 rounded-full mb-6">
                  <FontAwesomeIcon
                    icon={faGem as IconProp}
                    className="text-purple-400 mr-2"
                  />
                  <span>Exclusive Lifetime Offer</span>
                </div>

                <h3 className="text-4xl font-bold mb-4 text-white">
                  Forever Free
                </h3>
                <p className="text-xl text-gray-400 mb-8">
                  Pay once, own forever. Limited to first 1000 customers.
                </p>

                <div className="flex justify-center items-baseline gap-4 mb-8">
                  <span className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                    $299
                  </span>
                  <span className="text-gray-400 line-through">$1999</span>
                </div>

                <div className="grid md:grid-cols-2 gap-6 text-left mb-12">
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h4 className="text-lg font-bold mb-2 text-white">
                      Included Features
                    </h4>
                    <ul className="space-y-2 text-gray-200">
                      <li>• 1 Free Domain for 1 Year</li>
                      <li>• 5 Years Premium Hosting</li>
                      <li>• Unlimited AI Generations</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h4 className="text-lg font-bold mb-2 text-white">
                      Premium Perks
                    </h4>
                    <ul className="space-y-2 text-gray-200">
                      <li>• VIP Support</li>
                      <li>• Early Feature Access</li>
                      <li>• Founder Badge</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="bg-gradient-to-r from-purple-400 to-blue-400 text-gray-900 px-12 py-4 rounded-xl hover:shadow-2xl hover:shadow-purple-400/30 transition-all font-bold">
                    Claim Lifetime Access
                  </button>
                  <p className="text-sm text-gray-400 font-medium">
                    <strong className="text-green-400">
                      14-Day Money-Back Guarantee
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
