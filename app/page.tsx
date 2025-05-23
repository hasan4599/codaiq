// app/page.tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import { Poppins } from 'next/font/google'
import Head from 'next/head'

// Icons (ersetzbar durch deine eigenen)
const CpuChipIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const MagicWandIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const PaperAirplaneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
)

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
)

// Typen
type Message = {
  role: 'user' | 'ai'
  text: string
}

// Font
const poppins = Poppins({ 
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap'
})

export default function Home() {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Let's build your dream website! Describe it in a few words:" }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // User-Nachricht hinzufügen
    setMessages(prev => [...prev, { role: 'user', text: inputValue }])
    setInputValue('')
    setIsTyping(true)

    // Simulierte AI-Antwort nach 1.5s
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: `Great! I've created a "${inputValue}" website. Here's what I included:\n\n• Modern design\n• Mobile-optimized\n• SEO-ready\n\nWant to customize anything?` 
      }])
      setIsTyping(false)
    }, 1500)
  }

  // Auto-Scroll zum neuesten Nachricht
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <main className={`min-h-screen ${poppins.className} bg-[#020617] text-fuchsia-50 overflow-hidden`}>
      {/* Global Styles */}
      <style jsx global>{`
        .glass-layer-1 {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .glass-layer-2 {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .glass-layer-3 {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
        }
        .animate-float-slow {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float 5s ease-in-out infinite;
        }
        .text-gradient-primary {
          background: linear-gradient(135deg, #00F0FF 0%, #0066FF 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* Floating Background Elements */}
      <div className="fixed -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-[#0066FF]/10 blur-[150px] animate-float-slow -z-10"></div>
      <div className="fixed -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-[#00FF88]/10 blur-[120px] animate-float-fast -z-10"></div>

      {/* Header */}
      <header className="fixed w-full glass-layer-1 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
              <CpuChipIcon className="w-5 h-5 text-[#020617]" />
            </div>
            <span className="text-xl font-bold">Codaiq</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {['Features', 'Pricing', 'Academy', 'Marketplace'].map((item) => (
              <a key={item} className="hover:text-[#00FF88] transition-colors">{item}</a>
            ))}
            <button className="bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-2 rounded-full hover:shadow-lg hover:shadow-cyan-500/20 transition-all">
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 px-6">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="relative z-10">
            <div className="glass-layer-1 inline-flex items-center px-5 py-2.5 rounded-full mb-8 border border-[#00FF88]/30">
              <span className="text-[#00FF88] mr-2">🚀</span>
              <span className="text-sm font-medium">NO-CODE REVOLUTION</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Your AI Co-founder for <br/>
              <span className="text-gradient-primary">Web Development</span>
            </h1>
            <p className="text-xl text-[#CBD5E1] mb-10 max-w-lg">
              From idea to revenue-generating business in 60 seconds. 
              The only tool that <span className="text-[#00FF88] font-medium">codes, designs, and markets</span> for you.
            </p>
            <div className="flex flex-wrap gap-4 mb-16">
              <button className="glass-layer-2 hover:glass-layer-3 px-8 py-4 rounded-full text-lg font-semibold border border-[#00F0FF]/30 hover:border-[#00F0FF]/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all">
                Launch Your Site →
              </button>
              <button className="flex items-center space-x-2 group">
                <div className="glass-layer-1 group-hover:glass-layer-2 w-14 h-14 rounded-full flex items-center justify-center border border-[#00FF88]/30 group-hover:border-[#00FF88]/50 transition-all">
                  <svg className="w-5 h-5 text-[#00FF88]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-lg font-medium">See Magic in Action</span>
              </button>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  {['FF5F57', 'FEBC2E', '28C840'].map((color, i) => (
                    <div key={i} className="w-8 h-8 rounded-full" style={{ backgroundColor: `#${color}` }}></div>
                  ))}
                </div>
                <span className="text-sm">Featured on YC</span>
              </div>
              <div className="h-8 w-px bg-[#334155]"></div>
              <div className="flex items-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm">4.9/5 (2,300+ reviews)</span>
              </div>
            </div>
          </div>

          {/* Right Column - Durable-Style Chatbot */}
          <div className="relative group">
            <div className="glass-layer-3 rounded-3xl overflow-hidden border border-[#00F0FF]/20 hover:border-[#00F0FF]/40 transition-all duration-500 shadow-xl shadow-[#0066FF]/10">
              <div className="p-1">
                {/* Chatbot Header */}
                <div className="flex items-center px-5 py-3 border-b border-[#1e293b]">
                  <div className="flex space-x-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
                  </div>
                  <div className="flex-1 text-center font-medium">Codaiq Builder</div>
                  <div className="w-8 h-8 rounded-full bg-[#00FF88]/10 flex items-center justify-center">
                    <MagicWandIcon className="w-4 h-4 text-[#00FF88]" />
                  </div>
                </div>
                
                {/* Chat Content */}
                <div 
                  ref={chatContainerRef}
                  className="h-80 p-5 overflow-y-auto bg-gradient-to-b from-[#020617]/50 to-[#0f172a]/50"
                >
                  <div className="space-y-4">
                    {/* AI Message */}
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                          <CpuChipIcon className="w-6 h-6 text-[#020617]" />
                        </div>
                      </div>
                      <div className="glass-layer-1 rounded-2xl px-4 py-3 max-w-[80%]">
                        <p>Let's build your dream website! Describe it in a few words:</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {["E-commerce store", "Portfolio", "SaaS Dashboard", "Restaurant Site"].map((item) => (
                            <button 
                              key={item}
                              className="text-xs glass-layer-2 hover:glass-layer-3 px-3 py-1.5 rounded-full border border-[#00FF88]/20 hover:border-[#00FF88]/40 transition-all"
                              onClick={() => setInputValue(item)}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* User Messages */}
                    {messages.filter(m => m.role === 'user').map((msg, i) => (
                      <div key={`user-${i}`} className="flex justify-end">
                        <div className="glass-layer-2 rounded-2xl px-4 py-3 max-w-[80%] bg-gradient-to-r from-[#00FF88]/10 to-[#00FF88]/5 border border-[#00FF88]/20">
                          <p>{msg.text}</p>
                        </div>
                      </div>
                    ))}

                    {/* AI Responses */}
                    {messages.filter(m => m.role === 'ai' && m.text !== "Let's build your dream website! Describe it in a few words:").map((msg, i) => (
                      <div key={`ai-${i}`} className="flex">
                        <div className="flex-shrink-0 mr-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                            <CpuChipIcon className="w-6 h-6 text-[#020617]" />
                          </div>
                        </div>
                        <div className="glass-layer-1 rounded-2xl px-4 py-3 max-w-[80%]">
                          <p>{msg.text}</p>
                        </div>
                      </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex">
                        <div className="flex-shrink-0 mr-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                            <CpuChipIcon className="w-6 h-6 text-[#020617]" />
                          </div>
                        </div>
                        <div className="glass-layer-1 rounded-2xl px-4 py-3 w-32">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-bounce"></div>
                            <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-bounce" style={{animationDelay: '0.4s'}}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Input Area */}
                <div className="border-t border-[#1e293b] p-4 bg-[#020617]/30">
                  <form onSubmit={handleSubmit} className="flex">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Try 'Modern e-commerce for sneakers'"
                      className="flex-1 glass-layer-1 rounded-l-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-[#00F0FF] placeholder-[#64748B]"
                    />
                    <button
                      type="submit"
                      disabled={isTyping}
                      className="glass-layer-2 hover:glass-layer-3 px-6 rounded-r-full font-bold bg-gradient-to-r from-[#00FF88] to-[#00FF88]/80 hover:from-[#00FF88] hover:to-[#00FF88] transition-all flex items-center justify-center w-16"
                    >
                      <PaperAirplaneIcon className="w-5 h-5 text-[#020617]" />
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Floating AI Orb */}
            <div className="absolute -top-5 -right-5 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-400/30 z-10">
              <SparklesIcon className="w-8 h-8 text-[#020617] animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 bg-gradient-to-b from-[#020617] to-[#0a101f]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6">From Idea to <span className="text-[#00FF88]">High-Fidelity</span> in Minutes</h2>
            <p className="text-xl text-[#CBD5E1] max-w-3xl mx-auto">The most powerful AI web builder with human-level design intelligence</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🧠', title: 'Context-Aware AI', desc: 'Understands your industry & style preferences' },
              { icon: '🎨', title: 'Design Engine', desc: 'Generates unique layouts—never cookie-cutter' },
              { icon: '⚡', title: 'Instant Publishing', desc: 'One-click deploy to global edge network' },
              { icon: '🤖', title: 'SEO Autopilot', desc: 'Auto-optimized content structure' },
              { icon: '🔌', title: 'API-First', desc: 'Connect any tool with smart webhooks' },
              { icon: '✨', title: 'Magic CMS', desc: 'Content updates via natural language' }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="glass-layer-1 rounded-2xl p-8 hover:border-[#00FF88]/30 border border-transparent transition-all hover:scale-[1.02] group"
              >
                <div className="text-4xl mb-4 group-hover:-translate-y-1 transition-transform">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-[#CBD5E1]">{feature.desc}</p>
                <div className="mt-4 h-[2px] bg-gradient-to-r from-transparent via-[#00FF88]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <h2 className="text-4xl font-bold text-center mb-20">How Codaiq <span className="text-[#00FF88]">Works</span></h2>
          
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { step: '1', title: 'Describe', desc: 'Type what you need ("SaaS dashboard for analytics")' },
              { step: '2', title: 'Generate', desc: 'AI creates multiple design variants' },
              { step: '3', title: 'Refine', desc: 'Edit with natural language prompts' }
            ].map((item, i) => (
              <div key={i} className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold text-center mb-3">{item.title}</h3>
                <p className="text-[#CBD5E1] text-center">{item.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-24 left-full w-16 h-1 bg-gradient-to-r from-[#00F0FF] to-[#00FF88]"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}