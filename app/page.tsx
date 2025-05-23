'use client';

export default function Home() {
  return (
    <>
      {/* Live Demo Section */}
      <section className="py-28 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6">See the <span className="text-gradient-primary">Magic</span> in Action</h2>
            <p className="text-xl text-[#CBD5E1] max-w-3xl mx-auto">Type a prompt and watch your website generate in real-time</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Code Editor */}
            <div className="glass-layer-2 rounded-2xl overflow-hidden border border-[#00F0FF]/20">
              <div className="flex items-center px-5 py-3 border-b border-[#1e293b] bg-[#020617]/50">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
                </div>
                <div className="text-sm font-mono">prompt.js</div>
              </div>
              <div className="p-5 bg-[#0f172a]/50 h-96">
                <div className="font-mono text-sm">
                  <div className="text-[#CBD5E1] mb-4">// Describe your website</div>
                  <div className="flex">
                    <span className="text-[#00FF88] mr-2">const</span>
                    <span className="text-[#F8FAFC]">prompt</span>
                    <span className="text-[#00F0FF]">=</span>
                    <input 
                      type="text" 
                      placeholder="'Modern SaaS dashboard with dark mode'"
                      className="flex-1 bg-transparent border-b border-[#00FF88]/50 focus:outline-none text-[#F8FAFC] ml-2"
                    />
                  </div>
                  <div className="mt-8 text-[#CBD5E1]">
                    <span className="text-[#00FF88]">await</span> codaiq.<span className="text-[#00F0FF]">build</span>(prompt);
                  </div>
                </div>
                <button className="glass-layer-2 hover:glass-layer-3 mt-6 w-full py-3 rounded-lg font-bold bg-gradient-to-r from-[#00FF88] to-[#00FF88]/80 hover:from-[#00FF88] hover:to-[#00FF88] transition-all flex items-center justify-center">
                  Generate Website
                </button>
              </div>
            </div>

            {/* Preview Iframe */}
            <div className="glass-layer-3 rounded-2xl overflow-hidden border border-[#00FF88]/20">
              <div className="flex items-center px-5 py-3 border-b border-[#1e293b] bg-[#020617]/50">
                <div className="flex-1 text-center font-medium">Live Preview</div>
                <div className="w-8 h-8 rounded-full bg-[#00F0FF]/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#00F0FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
              </div>
              <div className="bg-[#020617]/30 h-96 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="w-8 h-8 text-[#020617]"
                      viewBox="0 0 24 24" 
                      strokeWidth="2" 
                      stroke="currentColor" 
                      fill="none"
                    >
                      <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM15 9l-6 6m0-6l6 6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Your Website Preview</h3>
                  <p className="text-[#CBD5E1] mb-4">Will appear here as you type</p>
                  <div className="inline-flex items-center glass-layer-1 px-4 py-2 rounded-full text-sm">
                    <span className="text-[#00FF88] mr-2">✨</span>
                    <span>Try "Portfolio for a photographer"</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-28 bg-gradient-to-b from-[#0a101f] to-[#020617]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6">Simple, <span className="text-[#00FF88]">Transparent</span> Pricing</h2>
            <p className="text-xl text-[#CBD5E1] max-w-3xl mx-auto">Start for free, upgrade as you grow</p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="glass-layer-1 inline-flex p-1 rounded-full">
              <button className="px-6 py-2 rounded-full font-medium bg-gradient-to-br from-cyan-400 to-blue-500 text-[#020617]">
                Monthly
              </button>
              <button className="px-6 py-2 rounded-full font-medium text-[#CBD5E1] hover:text-[#00FF88] transition-colors">
                Yearly (2 months free)
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$29",
                desc: "Perfect for individuals",
                features: ["10 AI generations/month", "1 published site", "Basic templates", "Email support"],
                popular: false
              },
              {
                name: "Pro",
                price: "$99",
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
                className={`glass-layer-2 rounded-2xl overflow-hidden border transition-all hover:scale-[1.02] relative ${
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
                  <div className="text-4xl font-bold mb-4 bg-gradient-to-br from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {plan.price}
                  </div>
                  <p className="text-[#CBD5E1] mb-6">{plan.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center">
                        <svg className="w-5 h-5 text-[#00FF88] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-lg font-bold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#00FF88] to-[#00FF88]/80 hover:shadow-lg hover:shadow-[#00FF88]/30'
                      : 'glass-layer-1 hover:glass-layer-2 border border-[#00F0FF]/20 hover:border-[#00F0FF]/40'
                  }`}>
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-layer-1 mt-16 rounded-2xl border border-[#00FF88]/30 overflow-hidden max-w-4xl mx-auto">
            <div className="md:flex items-center">
              <div className="p-8 md:p-10 bg-gradient-to-br from-[#00FF88]/10 to-[#00FF88]/5">
                <div className="inline-flex items-center px-4 py-1 rounded-full bg-[#00FF88] text-[#020617] text-sm font-bold mb-4">
                  🚀 LIMITED TIME
                </div>
                <h3 className="text-2xl font-bold mb-3">Lifetime Deal</h3>
                <p className="text-[#CBD5E1] mb-4">Pay once, use forever. Only for the first 500 customers.</p>
                <div className="text-3xl font-bold text-[#00FF88] mb-6">$189 <span className="text-lg text-[#CBD5E1] line-through">$999</span></div>
                <button className="glass-layer-2 hover:glass-layer-3 px-6 py-3 rounded-lg font-bold bg-gradient-to-r from-[#00FF88] to-[#00FF88]/80 hover:from-[#00FF88] hover:to-[#00FF88] transition-all">
                  Claim Your Deal →
                </button>
              </div>
              <div className="p-6 md:p-0 md:flex-1 bg-[#020617]/50">
                <div className="h-full flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="inline-flex items-center glass-layer-2 px-4 py-2 rounded-full mb-4">
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
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5 -z-10"></div>
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6">Loved by <span className="text-[#00FF88]">Thousands</span></h2>
            <p className="text-xl text-[#CBD5E1] max-w-3xl mx-auto">Don't just take our word for it</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
              <div key={i} className="glass-layer-2 rounded-2xl p-8 hover:border-[#00FF88]/30 border border-transparent transition-all">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-lg font-bold text-[#020617] mr-4">
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
                    <svg 
                      key={j} 
                      className={`w-5 h-5 ${j < testimonial.stars ? 'text-[#FFD700]' : 'text-[#64748B]'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-layer-1 border-t border-[#1e293b]">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-[#020617]"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                  >
                    <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-
