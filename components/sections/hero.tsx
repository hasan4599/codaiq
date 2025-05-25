import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronRight,
  faLayerGroup,
  faMagic,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function HeroSection() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      await new Promise((resolve) => setTimeout(resolve, 12000));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="relative pt-20 sm:pt-28 md:pt-36 lg:pt-48 pb-16 sm:pb-20 md:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          className="object-cover"
          fill
          src="/hero.webp"
          alt="hero-bg"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Mobile-first single column, then desktop grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full pt-20 space-y-6 sm:space-y-8 lg:space-y-10 text-center lg:text-left"
          >
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent block sm:inline">
                Build Websites
              </span>
              <br className="hidden sm:block" />
              <span className="block sm:inline mt-2 sm:mt-0">
                With Just Words
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              From logo design, content generation, and full-page architecture
              to seamless domain hosting — experience the future of web
              development powered by AI.
            </p>

            {/* AI Prompt Interface */}
            <div className="glass-layer p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-blue-400/20 relative overflow-hidden backdrop-blur-md bg-black/40">
              {/* Card Background - Blurred Website Screenshot */}
              <div className="absolute inset-0 opacity-20">
                <Image
                  className="object-cover"
                  fill
                  src="/hero.webp"
                  alt="hero-bg"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-500/5" />

              <div className="relative z-10">
                {/* Header with icon and text */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-blue-400/10 flex items-center justify-center mx-auto sm:mx-0 flex-shrink-0">
                    <FontAwesomeIcon
                      icon={faMagic as IconProp}
                      className="text-blue-400 text-lg sm:text-2xl"
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-base sm:text-lg font-medium text-white">
                      Describe your vision:
                    </p>
                    <p className="text-gray-300 mt-1 sm:mt-2 text-sm sm:text-base">
                      e.g. "Modern SaaS dashboard with analytics and dark mode"
                    </p>
                  </div>
                </div>

                {/* Input and button */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Type your website description..."
                    className="flex-1 bg-white rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base text-gray-900 placeholder-gray-500"
                  />
                  <button
                    onClick={handleGenerate}
                    className="bg-black text-white w-full sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center
                        hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-black/30"
                  >
                    <FontAwesomeIcon
                      icon={faChevronRight as IconProp}
                      className="text-lg sm:text-xl md:text-2xl text-white"
                    />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Live Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full"
          >
            <div className="glass-layer rounded-2xl sm:rounded-3xl border border-purple-500/20 h-80 sm:h-96 md:h-[500px] lg:h-[600px] xl:h-[700px] overflow-hidden relative backdrop-blur-md bg-black/40">
              {/* Card Background - Blurred Website Screenshot */}
              <div className="absolute inset-0 opacity-20">
                <Image
                  className="object-cover"
                  fill
                  src="/hero.webp"
                  alt="hero-bg"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-500/10" />

              <div className="relative h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
                {isGenerating ? (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="text-center space-y-4 sm:space-y-6"
                  >
                    <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-blue-400/10 rounded-xl sm:rounded-2xl flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faRocket as IconProp}
                        className="text-blue-400 text-2xl sm:text-3xl lg:text-4xl animate-pulse"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                      Crafting Your Masterpiece
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base px-2">
                      Generating layout, content, and assets...
                    </p>
                    <div className="inline-block glass-layer px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm text-white bg-black/50 backdrop-blur-sm">
                      Estimated time: 12 seconds
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center space-y-4 sm:space-y-6">
                    <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-purple-500/10 rounded-xl sm:rounded-2xl flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faLayerGroup as IconProp}
                        className="text-purple-400 text-2xl sm:text-3xl lg:text-4xl"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                      Interactive Preview
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base px-2">
                      Your generated website will appear here
                    </p>
                    <div className="glass-layer p-3 sm:p-4 rounded-xl text-xs sm:text-sm max-w-xs mx-auto text-white bg-black/50 backdrop-blur-sm">
                      Try: "Minimal portfolio with 3D animations"
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
