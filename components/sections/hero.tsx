"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SendIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="sm:w-5 sm:h-5"
  >
    <path
      d="M22 2L11 13"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 2L15 22L11 13L2 9L22 2Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RocketIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-blue-400"
  >
    <path
      d="M12 2L13.09 8.26L22 9L13.09 15.74L12 22L10.91 15.74L2 9L10.91 8.26L12 2Z"
      fill="currentColor"
    />
  </svg>
);

const LayerGroupIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-purple-400"
  >
    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
    <path
      d="M2 17L12 22L22 17"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M2 12L12 17L22 12"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

export default function HeroSection() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [countdown, setCountdown] = useState(12);

  const handleGenerateSite = (e: any) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    console.log("Generating site with prompt:", prompt);
    setIsGenerating(true);
    setCountdown(12);

    // Simulate generation process with countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGenerating(false);
          setPrompt(""); // Clear prompt after generation
          return 12;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      setCountdown(12);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/30 to-purple-900/20" />

        {/* Floating gradient blobs - responsive sizing */}
        <div
          className="absolute top-10 sm:top-20 left-4 sm:left-20 w-48 h-48 sm:w-80 md:w-96 sm:h-80 md:h-96 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-2xl sm:blur-3xl animate-pulse opacity-60"
          style={{ animation: "float 8s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-16 sm:bottom-32 right-4 sm:right-20 w-40 h-40 sm:w-64 md:w-80 sm:h-64 md:h-80 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-xl sm:blur-2xl opacity-50"
          style={{ animation: "float 10s ease-in-out infinite reverse" }}
        />
        <div
          className="absolute top-1/2 left-1/4 sm:left-1/3 w-32 h-32 sm:w-48 md:w-64 sm:h-48 md:h-64 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-lg sm:blur-xl opacity-40"
          style={{ animation: "float 6s ease-in-out infinite" }}
        />

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px, 60px 60px",
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-20">
        <div className="py-20 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Build Websites
              </span>
              <br />
              <span className="text-white">With Just Words</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              From logo design, content generation, and full-page architecture
              to seamless domain hosting — experience the future of web
              development powered by AI.
            </p>

            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
              Start Building
            </button>
          </div>

          {/* Right Preview Window */}
          <div className="w-full max-w-2xl mx-auto lg:mx-0 order-1 lg:order-2">
            {/* Browser Frame */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-t-2xl p-3 sm:p-4 border border-gray-700/50">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>

            {/* Preview Content Area - Responsive height */}
            <div className=" bg-gray-900/40 backdrop-blur-sm rounded-b-2xl border-l border-r border-b border-gray-700/50 h-[400px] sm:h-[500px] lg:h-[600px] relative overflow-hidden">
              {/* Blurred Background Website Mockup */}
              <Image
                className="object-cover"
                fill
                src="/hero/preview-bg.png"
                alt={""}
              />

              {/* 3D Floating Blob - Responsive positioning */}
              <div
                className="absolute top-1/4 right-1/4 w-20 h-20 sm:w-28 md:w-32 sm:h-28 md:h-32 bg-gradient-to-br from-blue-400/70 to-purple-500/70 rounded-full opacity-80 shadow-2xl"
                style={{
                  animation: "blob 4s ease-in-out infinite",
                  filter:
                    "blur(3px) drop-shadow(0 10px 20px rgba(59, 130, 246, 0.5))",
                }}
              />

              {/* Center Content Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8">
                {isGenerating ? (
                  <div
                    className="text-center space-y-4 sm:space-y-6 transform transition-all duration-500 ease-in-out"
                    style={{
                      animation: "fadeInScale 0.5s ease-out",
                    }}
                  >
                    <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-blue-400/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-blue-400/20">
                      <div className="animate-pulse">
                        <RocketIcon />
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                      Crafting Your Masterpiece
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300 px-2">
                      Generating layout, content, and assets...
                    </p>
                    <div className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm text-gray-300">
                      Estimated time: {countdown} seconds
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4 sm:space-y-6">
                    {/* Icon placeholder */}
                    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-2 sm:mb-4 backdrop-blur-sm border border-purple-400/20 mx-auto">
                      <LayerGroupIcon />
                    </div>

                    {/* Centered Text */}
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
                      Interactive Preview
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 px-2">
                      Your generated website will appear here
                    </p>

                    {/* Suggestion chip */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-3 sm:p-4 rounded-xl text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6 max-w-xs mx-auto">
                      Try: "Minimal portfolio with 3D animations"
                    </div>

                    {/* Chat Input - Responsive sizing */}
                    <div className="w-full max-w-xs sm:max-w-md">
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleGenerateSite(e);
                            }
                          }}
                          placeholder="create a modern consulting website"
                          disabled={isGenerating}
                          className="flex-1 bg-white rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 pr-12 sm:pr-14 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs sm:text-sm h-9 sm:h-11 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                        />
                        <button
                          onClick={handleGenerateSite}
                          disabled={isGenerating || !prompt.trim()}
                          className="absolute right-1.5 sm:right-2 w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <SendIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes blob {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          33% {
            transform: scale(1.1) rotate(120deg);
          }
          66% {
            transform: scale(0.9) rotate(240deg);
          }
        }

        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Mobile-specific optimizations */
        @media (max-width: 640px) {
          .min-h-screen {
            min-height: 100vh;
            min-height: 100dvh; /* Dynamic viewport height for mobile */
          }
        }
      `}</style>
    </div>
  );
}
