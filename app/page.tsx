'use client';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faXmark,
  faCommentDots,
  faRocket,
  faChevronRight,
  faLightbulb,
  faCode,
  faLayerGroup,
  faShieldHalved,
  faPlay,
  faStar,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faLinkedin, faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isYearly, setIsYearly] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC] font-sans">
      {/* Header */}
      <header className="fixed w-full glass-header z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#0066FF] flex items-center justify-center">
                <FontAwesomeIcon icon={faRocket} className="text-[#020617] w-4 h-4" />
              </div>
              <span className="text-xl font-bold">Codaiq</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {['Features', 'How It Works', 'Templates', 'Pricing', 'Academy'].map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-[#CBD5E1] hover:text-[#00FF88] transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <button className="bg-gradient-to-r from-[#00F0FF] to-[#0066FF] text-[#020617] px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-[#00F0FF]/30 transition-all">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#CBD5E1] hover:text-[#00FF88] transition-colors"
              onClick={() => setIsMenuOpen(true)}
            >
              <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#020617]/95 z-50 backdrop-blur-lg p-6">
          <div className="flex justify-end mb-12">
            <button
              className="text-[#CBD5E1] hover:text-[#00FF88] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} className="w-8 h-8" />
            </button>
          </div>
          <nav className="flex flex-col space-y-8 text-center">
            {['Features', 'How It Works', 'Templates', 'Pricing', 'Academy'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-2xl text-[#F8FAFC] hover:text-[#00FF88] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="bg-gradient-to-r from-[#00F0FF] to-[#0066FF] text-[#020617] px-8 py-3 rounded-full font-bold text-xl mt-8">
              Get Started
            </button>
          </nav>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5 -z-10" />
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center glass-badge px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse">
                <FontAwesomeIcon icon={faRocket} className="text-[#00FF88] mr-2" />
                <span>AI-Powered Web Creation</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#00F0FF] to-[#0066FF] bg-clip-text text-transparent">
                  Build Websites
                </span>{' '}
                <br className="hidden md:block" />
                With Just Words
              </h1>
              <p className="text-xl text-[#CBD5E1] max-w-2xl mx-auto mb-10">
                Describe what you want and watch Codaiq generate a complete, production-ready website in seconds.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                <button className="bg-gradient-to-r from-[#00F0FF] to-[#0066FF] text-[#020617] px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-[#00F0FF]/30 transition-all">
                  Start Building Free
                </button>
                <button className="glass-button border border-[#00FF88]/30 px-8 py-4 rounded-full font-bold hover:border-[#00FF88]/50 hover:shadow-[#00FF88]/20 hover:shadow-lg transition-all">
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Live AI Chat Widget */}
            <div className="max-w-2xl mx-auto glass-card rounded-2xl overflow-hidden border border-[#00F0FF]/20 animate-float">
              <div className="flex items-center px-6 py-4 border-b border-[#1e293b]">
                <div className="w-3 h-3 rounded-full bg-[#00FF88] mr-2" />
                <div className="text-sm font-medium">AI Assistant</div>
              </div>
              <div className="p-6">
                <div className="flex mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#00FF88]/10 flex items-center justify-center mr-4">
                    <FontAwesomeIcon icon={faCommentDots} className="text-[#00FF88]" />
                  </div>
                  <div className="glass-message rounded-2xl p-4">
                    <p className="text-[#F8FAFC]">Hi! I'm your AI co-founder. What kind of website would you like to build today?</p>
                  </div>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="e.g. 'A modern portfolio for a photographer with dark mode'"
                    className="flex-1 bg-[#0f172a]/50 border border-[#1e293b] rounded-l-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#F8FAFC]"
                  />
                  <button className="bg-gradient-to-r from-[#00F0FF] to-[#0066FF] text-[#020617] px-6 rounded-r-full font-medium">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#00F0FF] to-[#0066FF] bg-clip-text text-transparent">
                  Everything You Need
                </span>{' '}
                to Build Fast
              </h2>
              <p className="text-xl text-[#CBD5E1] max-w-3xl mx-auto">
                Codaiq handles the technical heavy lifting so you can focus on your vision.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: faLightbulb, title: "AI-Powered Design", desc: "Generate beautiful designs just by describing what you want in natural language." },
                { icon: faCode, title: "Clean Code Output", desc: "Production-ready React, Tailwind, and Next.js code that's maintainable." },
                { icon: faLayerGroup, title: "Component Library", desc: "Hundreds of pre-built components that you can customize and combine." },
                { icon: faShieldHalved, title: "Built-in Best Practices", desc: "Automatic SEO, accessibility, and performance optimizations." },
                { icon: faRocket, title: "One-Click Deployment", desc: "Deploy directly to Vercel, Netlify, or export static files." },
                { icon: faCommentDots, title: "AI Content Assistant", desc: "Generate copy, images, and even code snippets on demand." }
              ].map((feature, i) => (
                <div 
                  key={i}
                  className="glass-card rounded-2xl p-8 border border-transparent hover:border-[#00F0FF]/30 transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-full bg-[#00F0FF]/10 flex items-center justify-center mb-6">
                    <FontAwesomeIcon icon={feature.icon} className="text-[#00F0FF] text-xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-[#CBD5E1]">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gradient-to-b from-[#0a101f] to-[#020617]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                How <span className="text-[#00FF88]">Codaiq</span> Works
              </h2>
              <p className="text-xl text-[#CBD5E1] max-w-3xl mx-auto">
                From idea to live website in 3 simple steps
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="hidden md:block absolute left-1/2 h-full w-0.5 bg-gradient-to-b from-[#00F0FF] to-[#0066FF] -translate-x-1/2" />
                {[
                  { title: "Describe Your Vision", desc: "Tell our AI what you need using simple language or even rough sketches.", pos: "left" },
                  { title: "AI Generates Your Site", desc: "Codaiq creates a complete website with design, code, and content.", pos: "right" },
                  { title: "Customize & Publish", desc: "Tweak the design, add your content, and go live with one click.", pos: "left" }
                ].map((step, i) => (
                  <div 
                    key={i}
                    className={`relative mb-12 md:mb-16 md:w-1/2 ${step.pos === 'left' ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}
                  >
                    <div className="glass-card rounded-2xl p-8 border border-[#00F0FF]/20">
                      <div className="absolute -top-4 left-6 md:left-auto md:right-6 w-8 h-8 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#0066FF] flex items-center justify-center font-bold">
                        {i + 1}
                      </div>
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-[#CBD5E1]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Live Demo Section */}
        <section id="live-demo" className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                See the <span className="text-[#00FF88]">Magic</span> in Action
              </h2>
              <p className="text-xl text-[#CBD5E1] max-w-3xl mx-auto">
                Try it yourself - no coding required
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Code Editor */}
              <div className="glass-card rounded-2xl overflow-hidden border border-[#00F0FF]/20">
                <div className="flex items-center px-6 py-4 border-b border-[#1e293b]">
                  <div className="flex space-x-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="text-sm font-mono">prompt.js</div>
                </div>
                <div className="p-6 bg-[#0f172a]/50">
                  <div className="font-mono text-sm">
                    <div className="text-[#CBD5E1] mb-4">// Describe your website below</div>
                    <div className="flex items-center">
                      <span className="text-[#00FF88] mr-2">const</span>
                      <span className="text-[#F8FAFC]">prompt</span>
                      <span className="text-[#00F0FF]">=</span>
                      <input
                        type="text"
                        value={prompt}
                        onChange={e => setPrompt(e.target.value)}
                        placeholder="'Modern SaaS dashboard with dark mode'"
                        className="flex-1 bg-transparent border-b border-[#00FF88]/50 focus:outline-none text-[#F8FAFC] ml-2"
                      />
                    </div>
                    <div className="mt-8 text-[#CBD5E1]">
                      <span className="text-[#00FF88]">await</span> codaiq.<span className="text-[#00F0FF]">build</span>(prompt);
                    </div>
                  </div>
                  <button 
                    className={`mt-6 w-full py-4 rounded-lg font-bold transition-all flex items-center justify-center ${
                      isGenerating ? 'bg-[#00FF88]/80' : 'bg-gradient-to-r from-[#00FF88] to-[#00FF88]/80 hover:shadow-lg hover:shadow-[#00FF88]/30'
                    }`}
                    onClick={handleGenerate}
                    disabled={isGenerating}
                  >
                    {isGenerating ? 'Generating...' : 'Generate Website'}
                  </button>
                </div>
              </div>

              {/* Preview Iframe */}
              <div className="glass-card rounded-2xl overflow-hidden border border-[#00FF88]/20 h-full">
                <div className="flex items-center px-6 py-4 border-b border-[#1e293b]">
                  <div className="flex-1 text-center font-medium">Live Preview</div>
                  <div className="w-8 h-8 rounded-full bg-[#00F0FF]/10 flex items-center justify-center">
                    <FontAwesomeIcon icon={faPlay} className="text-[#00F0FF]" />
                  </div>
                </div>
                <div className="bg-[#020617]/30 h-[424px] flex items-center justify-center">
                  {isGenerating ? (
                    <div className="animate-pulse text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#0066FF] flex items-center justify-center">
                        <FontAwesomeIcon icon={faRocket} className="text-[#020617] w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Building Your Website</h3>
                      <p className="text-[#CBD5E1]">This usually takes about 15 seconds...</p>
                    </div>
                  ) : prompt ? (
                    <div className="text-center p-6">
                      <div className="w-16 h
