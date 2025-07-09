"use client";

import { FAQSection } from "@/components/sections/faq-section";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import HowItWorks from "@/components/sections/how-it-works";
import MarqueeSamples from "@/components/sections/marqee-samples";
import ModernBanner from "@/components/sections/modern-banner";
import PricingSection from "@/components/sections/pricing-section";
import Testimonials from "@/components/sections/testimonials";
import { Fetch } from "@/hooks/fetch";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBolt,
  faBox,
  faCloud,
  faCube,
  faMagic,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<{ email: string, name: string, image: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    try {
      setLoading(true)
      const handle = async () => {
        const response = await Fetch({ body: '', api: 'get/user/selected', method: "GET", host: 'server', loading: (v) => { } })
        if (response !== null) {
          setUser({
            name: response.fullName,
            email: response.email,
            image: response.avatarUrl
          })
        }
      }
      handle();
    } finally {
      setLoading(false)
    }
  }, []);

  return (
    user && <div
      ref={ref}
      className="min-h-screen bg-[#020617] text-gray-100 font-poppins overflow-x-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[3%] -z-10"
        style={{ y: yBg }}
      />

      <Header user={user} />
      <HeroSection />
      <MarqueeSamples />

      {/* Features Section */}
      <section
        id="features"
        className="py-32 px-4 lg:px-8 bg-gradient-to-b from-[#0a101f]/60 to-[#020617]/80"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl lg:text-6xl font-bold text-center mb-20">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Everything You Need
            </span>
            <br />
            to Build at Lightspeed
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: faCloud,
                title: "Instant Hosting & Domain",
                desc: "Free SSL, global CDN & automated deployments",
                color: "from-blue-400 to-blue-600",
              },
              {
                icon: faBox,
                title: "Smart Components",
                desc: "Drag-and-drop AI-powered components",
                color: "from-purple-400 to-purple-600",
              },
              {
                icon: faMagic,
                title: "AI Content Engine",
                desc: "Automated copywriting & image generation",
                color: "from-pink-400 to-pink-600",
              },
              {
                icon: faBolt,
                title: "Edge Performance",
                desc: "99.9% uptime with serverless architecture",
                color: "from-yellow-400 to-yellow-600",
              },
              {
                icon: faShield,
                title: "Enterprise Security",
                desc: "GDPR, CCPA & SOC2 compliant",
                color: "from-green-400 to-green-600",
              },
              {
                icon: faCube,
                title: "3D Integration",
                desc: "Built-in Three.js & WebGL support",
                color: "from-red-400 to-red-600",
              },
            ].map((feature, i) => (
              <div key={i} className="relative group">
                {/* Enhanced glassmorphism container */}
                <div className="glass-card relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl shadow-black/20 transition-all duration-500 group-hover:bg-white/15 group-hover:border-white/30 group-hover:shadow-3xl group-hover:shadow-black/30 group-hover:-translate-y-2">
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-black/[0.05] pointer-events-none" />

                  {/* Animated border glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />

                  {/* Card content */}
                  <div className="relative p-8 lg:p-10 z-10">
                    {/* Icon with enhanced glassmorphism */}
                    <div className="relative mb-6">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}
                      >
                        <FontAwesomeIcon
                          icon={feature.icon as IconProp}
                          className="text-white text-2xl drop-shadow-xl"
                        />
                      </div>
                      {/* Icon glow effect */}
                      <div
                        className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} opacity-20 blur-lg transition-all duration-300 group-hover:opacity-40 group-hover:scale-125`}
                      />
                    </div>

                    {/* Text content */}
                    <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-sm transition-all duration-300 group-hover:text-white/95">
                      {feature.title}
                    </h3>
                    <p className="text-gray-200/90 leading-relaxed text-base ">
                      {feature.desc}
                    </p>
                  </div>

                  {/* Subtle inner shadow for depth */}
                  <div className="absolute inset-0 rounded-3xl shadow-inner shadow-black/10 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />
      {/* Pricing Section */}
      <PricingSection />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ */}

      <FAQSection />
      <ModernBanner />
      {/* Footer */}
      <Footer />
    </div>
  );
}
