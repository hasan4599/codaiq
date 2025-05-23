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
  {/* ... Unveränderter Pricing-Bereich wie im Original ... */}
</section>

{/* Testimonials Section */}
<section className="py-28 relative overflow-hidden">
  {/* ... Unveränderter Testimonials-Bereich wie im Original ... */}
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
              <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM15 9l-6 6m0-6l6 6" />
            </svg>
          </div>
          <span className="text-xl font-bold">Codaiq</span>
        </div>
        <p className="text-[#CBD5E1] mb-6">The AI co-founder for your web projects. Build faster, smarter, better.</p>
        <div className="flex space-x-4">
          {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((social) => (
            <a key={social} className="w-10 h-10 glass-layer-2 rounded-full flex items-center justify-center hover:bg-[#00FF88]/10 hover:border-[#00FF88]/30 transition-all">
              <span className="sr-only">{social}</span>
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