"use client";

import Header from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import HowItWorks from "@/components/sections/how-it-works";
import PricingSection from "@/components/sections/pricing-section";
import Testimonials from "@/components/sections/testimonials";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faDiscord,
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBolt,
  faBox,
  faCloud,
  faCube,
  faMagic,
  faRocket,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={ref}
      className="min-h-screen bg-[#020617] text-gray-100 font-poppins overflow-x-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[3%] -z-10"
        style={{ y: yBg }}
      />

      <Header />
      <HeroSection />

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
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-all duration-300 -z-10" />
                <div className="glass-feature p-10 flex flex-col items-start border border-white/10 rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.01] group-hover:border-white/20 transition-all duration-300">
                  <div
                    className={`w-16 h-16 rounded-2xl mb-6 bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg`}
                  >
                    <FontAwesomeIcon
                      icon={feature.icon as IconProp}
                      className="text-white text-2xl drop-shadow-xl"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-200 leading-relaxed opacity-80">
                    {feature.desc}
                  </p>
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
      {/* Footer */}
      <footer className="bg-gray-900/80 py-20 px-4 lg:px-8 border-t border-gray-800/50">
        <div className="container mx-auto grid md:grid-cols-4 gap-12">
          {/* Column 1 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faRocket as unknown as IconProp}
                className="text-purple-400 w-8 h-8"
              />
              <span className="text-2xl font-bold">Codaiq</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering the next generation of web creation through AI
              innovation.
            </p>
            <div className="flex gap-4">
              {[faTwitter, faLinkedin, faGithub, faDiscord].map((icon, i) => (
                <button
                  key={i}
                  className="glass-layer p-3 rounded-xl hover:bg-gray-800/30 transition-colors"
                >
                  <FontAwesomeIcon
                    icon={icon as unknown as IconProp}
                    className="w-6 h-6"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Other Columns */}
          {[
            {
              title: "Product",
              links: [
                "Features",
                "Pricing",
                "Templates",
                "Integrations",
                "Roadmap",
              ],
            },
            {
              title: "Resources",
              links: [
                "Documentation",
                "Academy",
                "Blog",
                "Community",
                "Status",
              ],
            },
            {
              title: "Legal",
              links: [
                "Privacy Policy",
                "Terms of Service",
                "Security",
                "GDPR",
                "Cookie Settings",
              ],
            },
          ].map((column, i) => (
            <div key={i} className="space-y-4">
              <h3 className="text-lg font-bold mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800/50 mt-16 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Codaiq. All rights reserved.</p>
          <p className="mt-2">By Badruk Group | Dubai</p>
        </div>
      </footer>
    </div>
  );
}
