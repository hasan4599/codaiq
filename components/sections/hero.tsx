import { useState } from "react";

const SendIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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

export default function HeroSection() {
  const [prompt, setPrompt] = useState("");

  const handleGenerateSite = (e: any) => {
    e.preventDefault();
    console.log("Generating site with prompt:", prompt);
    // Handle site generation logic here
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/30 to-purple-900/20" />

        {/* Floating gradient blobs */}
        <div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse opacity-60"
          style={{ animation: "float 8s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-2xl opacity-50"
          style={{ animation: "float 10s ease-in-out infinite reverse" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-xl opacity-40"
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
              backgroundSize: "60px 60px",
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Build Websites
              </span>
              <br />
              <span className="text-white">With Just Words</span>
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
              From logo design, content generation, and full-page architecture
              to seamless domain hosting — experience the future of web
              development powered by AI.
            </p>

            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
              Start Building
            </button>
          </div>

          {/* Right Preview Window */}
          <div className="w-full max-w-2xl mx-auto lg:mx-0">
            {/* Browser Frame */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-t-2xl p-4 border border-gray-700/50">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>

            {/* Preview Content Area */}
            <div className="bg-gray-900/40 backdrop-blur-sm rounded-b-2xl border-l border-r border-b border-gray-700/50 h-[600px] relative overflow-hidden">
              {/* Blurred Background Website Mockup */}
              <div className="absolute inset-0 p-6 blur-[2px] opacity-30">
                {/* Nav Bar */}
                <div className="h-16 bg-white/10 rounded-lg mb-6 flex items-center px-4">
                  <div className="w-8 h-8 bg-blue-400/50 rounded"></div>
                  <div className="ml-auto flex space-x-4">
                    <div className="w-16 h-6 bg-white/20 rounded"></div>
                    <div className="w-16 h-6 bg-white/20 rounded"></div>
                    <div className="w-16 h-6 bg-white/20 rounded"></div>
                  </div>
                </div>

                {/* Hero Section Mockup */}
                <div className="text-center mb-8">
                  <div className="w-3/4 h-12 bg-white/20 rounded mx-auto mb-4"></div>
                  <div className="w-1/2 h-6 bg-white/15 rounded mx-auto mb-6"></div>
                  <div className="w-32 h-10 bg-blue-400/30 rounded mx-auto"></div>
                </div>

                {/* Three Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/10 rounded-lg p-4 h-32"></div>
                  <div className="bg-white/10 rounded-lg p-4 h-32"></div>
                  <div className="bg-white/10 rounded-lg p-4 h-32"></div>
                </div>
              </div>

              {/* 3D Floating Blob */}
              <div
                className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/70 to-purple-500/70 rounded-full opacity-80 shadow-2xl"
                style={{
                  animation: "blob 4s ease-in-out infinite",
                  filter:
                    "blur(4px) drop-shadow(0 15px 30px rgba(59, 130, 246, 0.5))",
                }}
              />

              {/* Center Content Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                {/* Icon placeholder */}
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-purple-400/20">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
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
                </div>

                {/* Centered Text */}
                <h3 className="text-2xl font-bold text-white mb-2 text-center">
                  Interactive Preview
                </h3>
                <p className="text-gray-300 text-center mb-8">
                  Your generated website will appear here
                </p>

                {/* Chat Input */}
                <div className="w-full max-w-md">
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
                      placeholder="create a modern consulting website with 3d hero"
                      className="flex-1 bg-white rounded-xl px-4 py-3 pr-14 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm h-11"
                    />
                    <button
                      onClick={handleGenerateSite}
                      className="absolute right-2 w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                    >
                      <SendIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
    </div>
  );
}
