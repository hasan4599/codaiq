'use client';

import { useState, useEffect } from 'react';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';        // ← hier hinzufügen
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faXmark, 
  faMessage, 
  faRocket, 
  faLightbulb, 
  faCode, 
  faLayerGroup, 
  faShieldHalved,
  faChevronRight,
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

 return (
  <div className="min-h-screen bg-[#020617] text-[#F8FAFC] font-sans">
    {/* Fixed Glass Header */}
    <header className="fixed w-full glass-header z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#0066FF] flex items-center justify-center">
              <FontAwesomeIcon
                icon={faRocket as IconProp}
                className="text-[#020617] w-4 h-4"
              />
            </div>
            <span className="text-xl font-bold">Codaiq</span>
          </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {['Features', 'How It Works', 'Templates', 'Pricing', 'Academy'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-[#CBD5E1] hover:text-[#00FF88] transition-colors">
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
  <FontAwesomeIcon
    icon={faBars as IconProp}    // ← hier das Casting einfügen
    className="w-6 h-6"
  />
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
            {['Features', 'How It Works', 'Templates', 'Pricing', 'Academy'].map((item) => (
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
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5 -z-10"></div>
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
                <div className="w-3 h-3 rounded-full bg-[#00FF88] mr-2"></div>
                <div className="text-sm font-medium">AI Assistant</div>
              </div>
              <div className="p-6">
                <div className="flex mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#00FF88]/10 flex items-center justify-center mr-4">
                    <FontAwesomeIcon icon={faMessage} className="text-[#00FF88]" />
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
                {
                  icon: faLightbulb,
                  title: "AI-Powered Design",
                  desc: "Generate beautiful designs just by describing what you want in natural language."
                },
                {
                  icon: faCode,
                  title: "Clean Code Output",
                  desc: "Production-ready React, Tailwind, and Next.js code that's maintainable."
                },
                {
                  icon: faLayerGroup,
                  title: "Component Library",
                  desc: "Hundreds of pre-built components that you can customize and combine."
                },
                {
                  icon: faShieldHalved,
                  title: "Built-in Best Practices",
                  desc: "Automatic SEO, accessibility, and performance optimizations."
                },
                {
                  icon: faRocket,
                  title: "One-Click Deployment",
                  desc: "Deploy directly to Vercel, Netlify, or export static files."
                },
                {
                  icon: faMessage,
                  title: "AI Content Assistant",
                  desc: "Generate copy, images, and even code snippets on demand."
                }
              ].map((feature, i) => (
                <div 
                  key={i} 
                  className="glass-card rounded-2xl p-8 border border-transparent hover:border-[#00F0FF]/30 transition-all hover:translate-y-[-4px]"
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
                {/* Timeline line */}
                <div className="hidden md:block absolute left-1/2 h-full w-0.5 bg-gradient-to-b from-[#00F0FF] to-[#0066FF] -translate-x-1/2"></div>

                {/* Steps */}
                {[
                  {
                    title: "Describe Your Vision",
                    desc: "Tell our AI what you need using simple language or even rough sketches.",
                    pos: "left"
                  },
                  {
                    title: "AI Generates Your Site",
                    desc: "Codaiq creates a complete website with design, code, and content.",
                    pos: "right"
                  },
                  {
                    title: "Customize & Publish",
                    desc: "Tweak the design, add your content, and go live with one click.",
                    pos: "left"
                  }
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
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
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
                        onChange={(e) => setPrompt(e.target.value)}
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
                      isGenerating
                        ? 'bg-[#00FF88]/80'
                        : 'bg-gradient-to-r from-[#00FF88] to-[#00FF88]/80 hover:shadow-lg hover:shadow-[#00FF88]/30'
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
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00FF88]/10 flex items-center justify-center">
                        <FontAwesomeIcon icon={faLightbulb} className="text-[#00FF88] w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Ready to Generate</h3>
                      <p className="text-[#CBD5E1] mb-4">Click "Generate Website" to see your creation</p>
                      <div className="inline-flex items-center glass-badge px-4 py-2 rounded-full text-sm">
                        <span className="text-[#00FF88] mr-2">💡</span>
                        <span>Try "Portfolio for a photographer"</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#0066FF] flex items-center justify-center">
                        <FontAwesomeIcon icon={faMessage} className="text-[#020617] w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Your Website Preview</h3>
                      <p className="text-[#CBD5E1] mb-4">Will appear here as you type</p>
                      <div className="inline-flex items-center glass-badge px-4 py-2 rounded-full text-sm">
                        <span className="text-[#00FF88] mr-2">✨</span>
                        <span>Try "E-commerce store for handmade jewelry"</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-gradient-to-b from-[#0a101f] to-[#020617]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Simple, <span className="text-[#00FF88]">Transparent</span> Pricing
              </h2>
              <p className="text-xl text-[#CBD5E1] max-w-3xl mx-auto">
                Start for free, upgrade as you grow
              </p>
            </div>

            {/* Toggle */}
            <div className="flex justify-center mb-12">
              <div className="glass-badge inline-flex p-1 rounded-full">
                <button 
                  className={`px-6 py-2 rounded-full font-medium ${!isYearly ? 'bg-gradient-to-r from-[#00F0FF] to-[#0066FF] text-[#020617]' : 'text-[#CBD5E1]'}`}
                  onClick={() => setIsYearly(false)}
                >
                  Monthly
                </button>
                <button 
                  className={`px-6 py-2 rounded-full font-medium ${isYearly ? 'bg-gradient-to-r from-[#00F0FF] to-[#0066FF] text-[#020617]' : 'text-[#CBD5E1]'}`}
                  onClick={() => setIsYearly(true)}
                >
                  Yearly (2 months free)
                </button>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Starter",
                  price: isYearly ? "$29/month" : "$29",
                  desc: "Perfect for individuals",
                  features: ["10 AI generations/month", "1 published site", "Basic templates", "Email support"],
                  popular: false
                },
                {
                  name: "Pro",
                  price: isYearly ? "$99/month" : "$99",
                  desc: "For growing businesses",
                  features: ["100 AI generations/month", "10 published sites", "Premium templates", "Priority support", "API access"],
                  popular: true
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  desc: "For large teams",
                  features: ["Unlimited generations", "Unlimited sites", "White-label", "Dedicated support", "SSO"],
                  popular: false
                }
              ].map((plan, i) => (
                <div 
                  key={i} 
                  className={`glass-card rounded-2xl overflow-hidden transition-all hover:scale-[1.02] relative ${
                    plan.popular 
                      ? 'border-[#00FF88] shadow-lg shadow-[#00FF88]/20' 
                      : 'border-transparent hover:border-[#00F0FF]/30'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-6 -translate-y-1/2 bg-gradient-to-r from-[#00FF88] to-[#00FF88]/80 text-[#020617] px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold mb-4 bg-gradient-to-br from-[#00F0FF] to-[#0066FF] bg-clip-text text-transparent">
                      {plan.price}
                    </div>
                    <p className="text-[#CBD5E1] mb-6">{plan.desc}</p>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center">
                          <FontAwesomeIcon icon={faCheck} className="text-[#00FF88] mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-3 rounded-lg font-bold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#00FF88] to-[#00FF88]/80 hover:shadow-lg hover:shadow-[#00FF88]/30'
                        : 'glass-button border border-[#00F0FF]/20 hover:border-[#00F0FF]/40'
                    }`}>
                      Get Started
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Lifetime Deal Banner */}
            <div className="glass-card mt-16 rounded-2xl border border-[#00FF88]/30 overflow-hidden max-w-4xl mx-auto">
              <div className="md:flex items-center">
                <div className="p-8 md:p-10 bg-gradient-to-br from-[#00FF88]/10 to-[#00FF88]/5">
                  <div className="inline-flex items-center px-4 py-1 rounded-full bg-[#00FF88] text-[#020617] text-sm font-bold mb-4">
                    🚀 LIMITED TIME
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Lifetime Deal</h3>
                  <p className="text-[#CBD5E1] mb-4">Pay once, use forever. Only for the first 500 customers.</p>
                  <div className="text-3xl font-bold text-[#00FF88] mb-6">$299 <span className="text-lg text-[#CBD5E1] line-through">$999</span></div>
                  <button className="glass-button hover:glass-button-hover px-6 py-3 rounded-lg font-bold border border-[#00FF88]/30 hover:border-[#00FF88]/50 hover:shadow-[#00FF88]/20 transition-all">
                    Claim Your Deal →
                  </button>
                </div>
                <div className="p-6 md:p-0 md:flex-1 bg-[#020617]/50">
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="inline-flex items-center glass-badge px-4 py-2 rounded-full mb-4">
                        <span className="text-[#00FF88] mr-2">🔥</span>
                        <span>47/500 claimed</span>
                      </div>
                      <div className="w-full bg-[#1e293b] rounded-full h-2 mb-2">
                        <div className="bg-gradient-to-r from-[#00FF88] to-[#00F0FF] h-2 rounded-full" style={{ width: '9.4%' }}></div>
                      </div>
                      <p className="text-sm text-[#CBD5E1]">Deal ends in 23 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5 -z-10"></div>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Loved by <span className="text-[#00FF88]">Thousands</span>
              </h2>
              <p className="text-xl text-[#CBD5E1] max-w-3xl mx-auto">
                Don't just take our word for it
              </p>
            </div>

            <div className="max-w-4xl mx-auto relative h-96">
              {[
                {
                  name: "Sarah K.",
                  role: "Founder, Bloom & Grow",
                  text: "Built our entire e-commerce site in one afternoon. The AI understood our floral aesthetic perfectly!",
                  stars: 5,
                  avatar: "SK"
                },
                {
                  name: "Mark T.",
                  role: "CTO, SaaS Startup",
                  text: "Reduced our dev costs by 70%. The generated React code is cleaner than our junior engineers' work.",
                  stars: 5,
                  avatar: "MT"
                },
                {
                  name: "Priya L.",
                  role: "Creative Director",
                  text: "I describe designs in metaphors ('make it feel like a jazz solo') and Codaiq just gets it. Mind-blowing.",
                  stars: 4,
                  avatar: "PL"
                }
              ].map((testimonial, i) => (
                <div 
                  key={i}
                  className={`absolute inset-0 glass-card rounded-2xl p-8 transition-opacity duration-500 ${
                    i === activeTestimonial ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#0066FF] flex items-center justify-center text-lg font-bold text-[#020617] mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-[#CBD5E1]">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-[#CBD5E1] mb-6">{testimonial.text}</p>
                  <div className="flex">
                    {[...Array(5)].map((_, j) => (
                      <FontAwesomeIcon 
                        key={j}
                        icon={faStar}
                        className={`w-5 h-5 ${j < testimonial.stars ? 'text-[#FFD700]' : 'text-[#64748B]'}`}
                      />
                    ))}
                  </div>
                </div>
              ))}

              <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i === activeTestimonial ? 'bg-[#00FF88] w-6' : 'bg-[#64748B]'
                    }`}
                    onClick={() => setActiveTestimonial(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="glass-footer border-t border-[#1e293b]">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#0066FF] flex items-center justify-center">
                  <FontAwesomeIcon icon={faRocket} className="text-[#020617] w-4 h-4" />
                </div>
                <span className="text-xl font-bold">Codaiq</span>
              </div>
              <p className="text-[#CBD5E1] mb-6">The AI co-founder for your web projects. Build faster, smarter, better.</p>
              <div className="flex space-x-4">
                {[
                  { icon: faTwitter, name: "Twitter" },
                  { icon: faLinkedin, name: "LinkedIn" },
                  { icon: faGithub, name: "GitHub" },
                  { icon: faDiscord, name: "Discord" }
                ].map((social) => (
                  <a 
                    key={social.name} 
                    href="#" 
                    className="w-10 h-10 glass-button rounded-full flex items-center justify-center hover:border-[#00F0FF]/40 transition-all"
                  >
                    <FontAwesomeIcon icon={social.icon} className="text-[#CBD5E1] hover:text-[#00FF88] transition-colors" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Templates", "Integrations"]
              },
              {
                title: "Resources",
                links: ["Documentation", "Academy", "Blog", "Community"]
              },
              {
                title: "Company",
                links: ["About", "Careers", "Contact", "Press"]
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Security", "GDPR"]
              }
            ].map((column, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold mb-6">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-[#CBD5E1] hover:text-[#00FF88] transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-[#1e293b] mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#64748B] text-sm mb-4 md:mb-0">© 2023 Codaiq. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-[#CBD5E1] hover:text-[#00FF88] transition-colors">Cookie Policy</a>
              <a href="#" className="text-sm text-[#CBD5E1] hover:text-[#00FF88] transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
