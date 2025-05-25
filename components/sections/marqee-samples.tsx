import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faCamera,
  faChartLine,
  faCode,
  faGamepad,
  faMedkit,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

export default function MarqueeSamples() {
  const sampleWebsites = [
    {
      id: 1,
      title: "AI SaaS Dashboard",
      category: "Analytics",
      icon: faChartLine,
      gradient: "from-blue-500 to-cyan-400",
      preview:
        "Modern analytics dashboard with real-time AI insights and dark mode interface",
    },
    {
      id: 2,
      title: "E-commerce Store",
      category: "Retail",
      icon: faStore,
      gradient: "from-purple-500 to-pink-400",
      preview:
        "Minimalist online store with 3D product displays and seamless checkout",
    },
    {
      id: 3,
      title: "Portfolio Studio",
      category: "Creative",
      icon: faCamera,
      gradient: "from-orange-500 to-red-400",
      preview:
        "Photography portfolio with immersive galleries and smooth animations",
    },
    {
      id: 4,
      title: "Gaming Platform",
      category: "Gaming",
      icon: faGamepad,
      gradient: "from-green-500 to-emerald-400",
      preview:
        "Interactive gaming hub with live leaderboards and social features",
    },
    {
      id: 5,
      title: "HealthTech App",
      category: "Medical",
      icon: faMedkit,
      gradient: "from-teal-500 to-blue-400",
      preview:
        "Telemedicine platform with patient portals and appointment scheduling",
    },
    {
      id: 6,
      title: "Dev Community",
      category: "Tech",
      icon: faCode,
      gradient: "from-indigo-500 to-purple-400",
      preview:
        "Developer community platform with code sharing and collaboration tools",
    },
  ];

  return (
    <section className="relative py-4 overflow-hidden bg-black/30 backdrop-blur-sm border-y border-white/10">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent" />

      {/* Marquee Container */}
      <div className="relative">
        <motion.div
          className="flex gap-6 whitespace-nowrap"
          animate={{
            x: [0, -100 * sampleWebsites.length],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* First set of samples */}
          {sampleWebsites.map((website) => (
            <div
              key={website.id}
              className="flex-shrink-0 w-72 group cursor-pointer"
            >
              <div className="glass-layer rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-4 hover:border-white/20 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-r ${website.gradient} flex items-center justify-center flex-shrink-0`}
                  >
                    <FontAwesomeIcon
                      icon={website.icon as IconProp}
                      className="text-white text-sm"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-semibold text-sm truncate">
                        {website.title}
                      </h4>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${website.gradient} text-white`}
                      >
                        {website.category}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                      {website.preview}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Duplicate set for seamless loop */}
          {sampleWebsites.map((website) => (
            <div
              key={`${website.id}-duplicate`}
              className="flex-shrink-0 w-72 group cursor-pointer"
            >
              <div className="glass-layer rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-4 hover:border-white/20 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-r ${website.gradient} flex items-center justify-center flex-shrink-0`}
                  >
                    <FontAwesomeIcon
                      icon={website.icon as IconProp}
                      className="text-white text-sm"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-semibold text-sm truncate">
                        {website.title}
                      </h4>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${website.gradient} text-white`}
                      >
                        {website.category}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                      {website.preview}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black/50 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black/50 to-transparent pointer-events-none z-10" />
    </section>
  );
}
