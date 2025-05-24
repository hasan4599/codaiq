'use client';

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faXmark, faCommentDots, faRocket, faChevronRight,
  faMagic, faLayerGroup, faCloud, faBox, faBolt, faShield,
  faCube, faStar, faCheck, faMessage
} from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter, faLinkedin, faGithub, faDiscord
} from '@fortawesome/free-brands-svg-icons';
import { motion, useScroll, useTransform } from 'framer-motion';


export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>('');
  const [isYearly, setIsYearly] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const ref = useRef<HTMLDivElement>(null); // Add proper type annotation
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Rotate testimonials
  useEffect(() => {
    const iv = setInterval(() => setActiveTestimonial(prev => (prev + 1) % 3), 5000);
    return () => clearInterval(iv);
  }, []);

  // Generate AI
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setAiOutput('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({prompt})
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAiOutput(data.result);
    } catch(e) {
      console.error(e);
      setAiOutput('Error generating content.');
    } finally { setIsGenerating(false); }
  };

  return (
    <div ref={ref} className="min-h-screen bg-[#020617] text-gray-100 font-poppins overflow-x-hidden">
      {/* Parallax BG */}
      <motion.div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5 -z-10" style={{y:yBg}}/>

     {/* Header */}
<header className="fixed w-full top-0 z-50 backdrop-blur-xl border-b border-gray-800/30">
  <div className="container mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <button
        onClick={() => setIsMenuOpen(true)}
        className="glass-layer p-3 rounded-xl lg:hidden"
      >
        <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
      </button>
      <div className="glass-layer px-6 py-3 rounded-xl flex items-center gap-2">
        <FontAwesomeIcon
          icon={faRocket}
          className="text-blue-400 w-6 h-6 animate-pulse"
        />
        <span className="text-xl font-bold">Codaiq</span>
      </div>
    </div>
    <nav className="hidden lg:flex items-center gap-8">
      {['Features','How It Works','Templates','Pricing','Academy'].map(item => (
        <a 
          key={item} 
          href={`#${item.toLowerCase().replace(/ /g,'-')}`} 
          className="glass-navbar px-6 py-3 rounded-full hover:text-blue-400"
        >
          {item}
        </a>
      ))}
      <button className="bg-gradient-to-r from-blue-400 to-purple-500 px-8 py-3 rounded-full hover:shadow-lg flex items-center gap-2">
        Get Started <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
      </button>
    </nav>
  </div>
</header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-2xl p-8 lg:hidden z-50">
          <div className="flex justify-between items-center mb-12">
            <div className="glass-layer px-6 py-3 rounded-xl flex items-center gap-2">
              <FontAwesomeIcon icon={faRocket as IconProp} className="text-blue-400 w-6 h-6" /><span>Codaiq</span>
            </div>
            <button onClick={()=>setIsMenuOpen(false)} className="glass-layer p-3 rounded-xl">
              <FontAwesomeIcon icon={faXmark as IconProp} className="w-8 h-8" />
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            {['Features','How It Works','Templates','Pricing','Academy'].map(item=> (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g,'-')}`} onClick={()=>setIsMenuOpen(false)} className="glass-layer p-6 rounded-2xl text-2xl">
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Hero */}
      <section className="pt-48 pb-32 px-4 lg:px-8">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className="space-y-10">
            <h1 className="text-5xl lg:text-7xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Build Websites</span><br/>With Just Words
            </h1>
            <p className="text-xl text-gray-400 max-w-lg">
              From logo to hosting—all in one AI-powered workflow.
            </p>
            <div className="glass-layer p-8 rounded-3xl border border-blue-400/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-500/5 -z-10" />
              <div className="flex gap-6 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-400/10 flex items-center justify-center">
                  <FontAwesomeIcon icon={faMagic as IconProp} className="text-blue-400 text-2xl" />
                </div>
                <div>
                  <p className="font-medium">Describe your vision:</p>
                  <p className="text-gray-400 text-sm">e.g. “SaaS dashboard in dark mode”</p>
                </div>
              </div>
              <div className="flex gap-4">
                <input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Type description..."
                  className="flex-1 bg-gray-900/50 rounded-2xl px-6 py-4 border border-gray-800 focus:ring-2 focus:ring-blue-400" />
                <button onClick={handleGenerate} className="bg-gradient-to-r from-blue-400 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faChevronRight as IconProp} className="text-2xl" />
                </button>
              </div>
              <div className="mt-6 glass-layer p-4 rounded-xl min-h-[120px]">
                {isGenerating
                  ? <p className="text-center text-gray-400">Generating…</p>
                  : aiOutput
                    ? <pre className="whitespace-pre-wrap text-sm text-gray-200">{aiOutput}</pre>
                    : <p className="text-center text-gray-500">Your preview appears here</p>
                }
              </div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} transition={{duration:0.8,delay:0.2}}
            className="glass-layer rounded-3xl border border-purple-500/20 h-[600px] overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-500/10" />
            <div className="flex items-center justify-center h-full p-8">
              {!aiOutput && !isGenerating && (
                <div className="text-center space-y-4">
                  <FontAwesomeIcon icon={faLayerGroup as IconProp} className="text-purple-400 text-4xl" />
                  <p className="text-gray-400">Interactive preview shows here</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
      
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
        <div
          key={i}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-all duration-300 -z-10" />
          <div className="glass-feature p-10 flex flex-col items-start border border-white/10 rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.01] group-hover:border-white/20 transition-all duration-300">
            <div
              className={`w-16 h-16 rounded-2xl mb-6 bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg`}
            >
              <FontAwesomeIcon icon={feature.icon as IconProp} className="text-white text-2xl drop-shadow-xl" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">{feature.title}</h3>
            <p className="text-gray-200 leading-relaxed opacity-80">{feature.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 px-4 lg:px-8 relative">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-center mb-24">
              From <span className="text-blue-400">Vision</span> to<br />
              <span className="text-purple-400">Reality</span> in 4 Steps
            </h2>

            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Timeline */}
              <div className="hidden md:block absolute top-24 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
                w-3/4 mx-auto rounded-full opacity-50" />

              {[
                {
                  step: 1,
                  title: "Describe Your Vision",
                  desc: "Natural language or visual input",
                  icon: faCommentDots,
                  color: "from-blue-400 to-blue-600"
                },
                {
                  step: 2,
                  title: "AI Architecture",
                  desc: "Automatic tech stack selection",
                  icon: faRocket,
                  color: "from-purple-400 to-purple-600"
                },
                {
                  step: 3,
                  title: "Refine & Customize",
                  desc: "Real-time visual editor",
                  icon: faPalette,
                  color: "from-pink-400 to-pink-600"
                },
                {
                  step: 4,
                  title: "Launch & Scale",
                  desc: "Global deployment & analytics",
                  icon: faCloud,
                  color: "from-green-400 to-green-600"
                }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.2 }}
                  className="glass-layer p-8 rounded-3xl text-center relative z-10 hover:-translate-y-2 transition-transform"
                >
                  <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl 
                    bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-xl`}>
                    {step.step}
                  </div>
                  <div className={`w-16 h-16 ${i === 1 ? 'mt-4' : 'mt-8'} mx-auto mb-6 rounded-2xl 
                    bg-gradient-to-r ${step.color} bg-opacity-20 flex items-center justify-center`}>
                    <FontAwesomeIcon icon={step.icon as unknown as IconProp} className={`text-2xl ${i === 0 ? 'text-blue-400' : 
                      i === 1 ? 'text-purple-400' : i === 2 ? 'text-pink-400' : 'text-green-400'}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    {/* Pricing Section */}
<section id="pricing" className="py-32 px-4 lg:px-8 bg-gradient-to-b from-[#0a101f] to-[#020617]">
  <div className="container mx-auto">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* ... (gleicher Header-Code wie zuvor) */}

      {/* Pricing Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {pricingPlans.map((plan, i) => (
          <motion.div
            key={i}
            // ... (gleiche motion.props wie zuvor)
          >
            {/* ... (gleicher Hintergrund-Code wie zuvor) */}
            
            <div className={`p-8 rounded-3xl border-2 bg-gradient-to-b from-white/5 to-white/[0.01] ${
              plan.popular 
                ? 'border-purple-400 group-hover:border-purple-400/80' 
                : 'border-white/10 group-hover:border-white/20'
            } transition-all`}>
              {/* ... (gleicher Popular-Badge-Code wie zuvor) */}

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <FontAwesomeIcon 
                      icon={faCheck as IconProp} // KORREKTUR HIER
                      className="text-blue-400 mt-1 flex-shrink-0" 
                    />
                    <span className="text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* ... (gleicher Button-Code wie zuvor) */}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lifetime Deal */}
      <motion.div
        initial={{ scale: 0.95 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        className="relative group mt-20"
      >
        {/* ... (gleicher Hintergrund-Code wie zuvor) */}
        
        <div className="p-8 rounded-3xl border-2 border-purple-400/30 bg-gradient-to-b from-white/5 to-white/[0.01]">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center bg-purple-400/20 px-6 py-2 rounded-full mb-6">
              <FontAwesomeIcon 
                icon={faGem as IconProp} // KORREKTUR HIER
                className="text-purple-400 mr-2" 
              />
              <span>Exclusive Lifetime Offer</span>
            </div>
            
            {/* ... (restlicher Code unverändert) */}
          </div>
        </div>
      </motion.div>
    </motion.div>
  </div>
</section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 px-4 lg:px-8 bg-gradient-to-b from-[#0a101f]/50 to-[#020617]/50">
        <div className="container mx-auto">
          <h2 className="text-4xl lg:text-6xl font-bold text-center mb-20">
            Trusted by<span className="text-purple-400"> Industry Leaders</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CTO @ TechInnovate",
                text: "Codaiq revolutionized our development process. We reduced website launch time from 6 weeks to 2 hours while maintaining enterprise-grade quality.",
                stars: 5,
                image: "SJ"
              },
              {
                name: "Michael Chen",
                role: "Founder @ StartUpAI",
                text: "The AI-generated code is cleaner than most junior developers. It's like having a senior engineer available 24/7.",
                stars: 5,
                image: "MC"
              },
              {
                name: "Emma Wilson",
                role: "Creative Director @ DesignHub",
                text: "Finally a tool that understands creative direction. The AI interprets abstract concepts better than some humans!",
                stars: 5,
                image: "EW"
              },
              {
                name: "David Martinez",
                role: "Head of Product @ FinTech Corp",
                text: "Cut our development costs by 70% while improving site performance. The ROI was immediate and substantial.",
                stars: 5,
                image: "DM"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-layer p-8 rounded-3xl border border-purple-400/20"
              >
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center
                    text-xl font-bold text-gray-900">
                    {testimonial.image}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{testimonial.name}</h3>
                    <p className="text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, j) => (
                    <FontAwesomeIcon key={j} icon={faStar as unknown as IconProp} className="w-5 h-5" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/80 py-20 px-4 lg:px-8 border-t border-gray-800/50">
        <div className="container mx-auto grid md:grid-cols-4 gap-12">
          {/* Column 1 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faRocket as unknown as IconProp} className="text-purple-400 w-8 h-8" />
              <span className="text-2xl font-bold">Codaiq</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering the next generation of web creation through AI innovation.
            </p>
            <div className="flex gap-4">
              {[faTwitter, faLinkedin, faGithub, faDiscord].map((icon, i) => (
                <button
                  key={i}
                  className="glass-layer p-3 rounded-xl hover:bg-gray-800/30 transition-colors"
                >
                  <FontAwesomeIcon icon={icon as unknown as IconProp} className="w-6 h-6" />
                </button>
              ))}
            </div>
          </div>

          {/* Other Columns */}
          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Templates", "Integrations", "Roadmap"]
            },
            {
              title: "Resources",
              links: ["Documentation", "Academy", "Blog", "Community", "Status"]
            },
            {
              title: "Legal",
              links: ["Privacy Policy", "Terms of Service", "Security", "GDPR", "Cookie Settings"]
            }
          ].map((column, i) => (
            <div key={i} className="space-y-4">
              <h3 className="text-lg font-bold mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
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
          <p className="mt-2">Made with ❤️ in Berlin | VAT ID DE345678901</p>
        </div>
      </footer>
    </div>
  );
}
