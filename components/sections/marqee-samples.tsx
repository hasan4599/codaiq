import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function EnhancedMarqueeSamples() {
  const [hoveredId, setHoveredId] = useState<number | string | null>(null);

  const sampleWebsites = [
    {
      id: 1,
      title: "ConstructCo",
      category: "Construction",
      icon: "🏗️",
      gradient: "from-blue-500 to-cyan-400",
      preview:
        "Professional construction company with project showcases and service portfolios",
      screenshot: "/marquee/site-1.png",
      description:
        "Modern construction website featuring stunning project galleries, team profiles, and comprehensive service offerings with a clean, professional design.",
    },
    {
      id: 2,
      title: "Strategy Consulting",
      category: "Business",
      icon: "📊",
      gradient: "from-emerald-500 to-teal-400",
      preview:
        "Strategic consulting firm with data-driven insights and business solutions",
      screenshot: "/marquee/site-2.png",
      description:
        "Sophisticated business consulting platform showcasing expertise in strategic planning, market analysis, and growth optimization for enterprise clients.",
    },
    {
      id: 3,
      title: "Spark Creative",
      category: "Design",
      icon: "✨",
      gradient: "from-purple-500 to-pink-400",
      preview:
        "Creative agency with bold branding and innovative design solutions",
      screenshot: "/marquee/site-3.png",
      description:
        "Cutting-edge creative agency website featuring dynamic animations, portfolio showcases, and brand identity solutions with striking visual design.",
    },
    {
      id: 4,
      title: "E-commerce Store",
      category: "Retail",
      icon: "🛍️",
      gradient: "from-orange-500 to-red-400",
      preview:
        "Modern online store with seamless shopping experience and product catalogs",
      screenshot: "/marquee/site-4.png",
      description:
        "Comprehensive e-commerce platform with advanced product filtering, secure checkout, and personalized shopping experiences.",
    },
    {
      id: 5,
      title: "Tech Startup",
      category: "Technology",
      icon: "🚀",
      gradient: "from-indigo-500 to-blue-400",
      preview:
        "Innovative tech startup with SaaS solutions and cutting-edge products",
      screenshot: "/marquee/site-5.png",
      description:
        "Dynamic startup website showcasing innovative technology solutions, product demos, and investor relations with modern UI/UX design.",
    },
    {
      id: 6,
      title: "Portfolio Studio",
      category: "Creative",
      icon: "🎨",
      gradient: "from-pink-500 to-rose-400",
      preview:
        "Artist portfolio with immersive galleries and creative showcases",
      screenshot: "/marquee/site-6.png",
      description:
        "Stunning portfolio website featuring interactive galleries, project case studies, and creative process documentation with artistic flair.",
    },
  ];

  return (
    <section className="relative py-8 overflow-hidden bg-slate-900">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />

      {/* Section header */}
      <motion.div
        className="relative z-10 text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 text-white leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Featured Website
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Samples
          </span>
        </motion.h2>
        <motion.p
          className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Explore our diverse portfolio of websites across different industries
          and design styles
        </motion.p>
      </motion.div>

      {/* Marquee Container */}
      <div className="relative">
        <motion.div
          className="flex gap-6"
          animate={{
            x: [0, -100 * sampleWebsites.length * 4], // Calculate based on card width
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ width: `${sampleWebsites.length * 384 * 4}px` }} // 384px = w-80 + gap
        >
          {/* Multiple sets for seamless infinite scroll */}
          {Array.from({ length: 4 }).map((_, setIndex) =>
            sampleWebsites.map((website, index) => (
              <motion.div
                key={`${website.id}-set-${setIndex}`}
                className="flex-shrink-0 w-80 group cursor-pointer"
                onMouseEnter={() => setHoveredId(`${website.id}-${setIndex}`)}
                onMouseLeave={() => setHoveredId(null)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1 + setIndex * 0.05,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                <motion.div
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-500 overflow-hidden"
                  whileHover={{
                    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
                    borderColor: "rgba(148, 163, 184, 0.6)",
                  }}
                >
                  {/* Screenshot */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={website.screenshot}
                      alt={`${website.title} website screenshot`}
                      width={320}
                      height={192}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
                        `<svg width="320" height="192" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:${
                              website.gradient.includes("blue")
                                ? "#3B82F6"
                                : website.gradient.includes("emerald")
                                ? "#10B981"
                                : website.gradient.includes("purple")
                                ? "#8B5CF6"
                                : website.gradient.includes("orange")
                                ? "#F97316"
                                : website.gradient.includes("indigo")
                                ? "#6366F1"
                                : "#EC4899"
                            };stop-opacity:0.8" />
                            <stop offset="100%" style="stop-color:${
                              website.gradient.includes("cyan")
                                ? "#06B6D4"
                                : website.gradient.includes("teal")
                                ? "#14B8A6"
                                : website.gradient.includes("pink")
                                ? "#EC4899"
                                : website.gradient.includes("red")
                                ? "#EF4444"
                                : website.gradient.includes("blue")
                                ? "#3B82F6"
                                : "#F43F5E"
                            };stop-opacity:0.6" />
                          </linearGradient>
                        </defs>
                        <rect width="320" height="192" fill="url(#grad)" />
                        <text x="160" y="96" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" dy="0.3em">${
                          website.icon
                        }</text>
                      </svg>`
                      ).toString("base64")}`}
                      priority={website.id <= 3 && setIndex === 0} // Only prioritize first set
                      quality={75} // Optimized quality (default is 75)
                      sizes="(max-width: 768px) 280px, (max-width: 1200px) 320px, 320px"
                      loading={setIndex === 0 ? "eager" : "lazy"} // Eager load first set only
                      unoptimized={false} // Ensure optimization is enabled
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${website.gradient} text-white shadow-lg`}
                      >
                        {website.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-r ${website.gradient} flex items-center justify-center text-lg`}
                      >
                        {website.icon}
                      </div>
                      <h3 className="text-white font-bold text-lg truncate flex-1">
                        {website.title}
                      </h3>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      {website.preview}
                    </p>

                    {/* Expanded description on hover */}
                    <motion.div
                      className="overflow-hidden border-t border-slate-700 pt-3 mt-3"
                      initial={false}
                      animate={{
                        height:
                          hoveredId === `${website.id}-${setIndex}`
                            ? "auto"
                            : 0,
                        opacity:
                          hoveredId === `${website.id}-${setIndex}` ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="text-slate-400 text-xs leading-relaxed pb-3">
                        {website.description}
                      </p>
                    </motion.div>

                    {/* Action buttons */}
                    <motion.div
                      className="flex gap-2 mt-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <motion.button
                        className="flex-1 py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Details
                      </motion.button>
                      <motion.button
                        className={`px-4 py-2 bg-gradient-to-r ${website.gradient} text-white text-sm rounded-lg hover:shadow-lg transition-all duration-200`}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.3)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Live Demo
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-slate-900 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-slate-900 to-transparent pointer-events-none z-10" />

      {/* Custom CSS for smooth marquee animation */}
      <style jsx>{`
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
