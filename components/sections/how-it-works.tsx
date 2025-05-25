import { motion } from "framer-motion";
import { Cloud, MessageCircle, Palette, Rocket } from "lucide-react";

const workflowSteps = [
  {
    step: 1,
    title: "Describe Your Vision",
    desc: "Natural language or visual input",
    icon: MessageCircle,
    color: "from-blue-400 to-blue-600",
  },
  {
    step: 2,
    title: "AI Architecture",
    desc: "Automatic tech stack selection",
    icon: Rocket,
    color: "from-purple-400 to-purple-600",
  },
  {
    step: 3,
    title: "Refine & Customize",
    desc: "Real-time visual editor",
    icon: Palette,
    color: "from-pink-400 to-pink-600",
  },
  {
    step: 4,
    title: "Launch & Scale",
    desc: "Global deployment & analytics",
    icon: Cloud,
    color: "from-green-400 to-green-600",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-24 lg:py-32 px-4 lg:px-8 relative bg-gray-900 min-h-screen"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-20 lg:mb-24"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-8 text-white leading-tight">
            From <span className="text-blue-400">Vision</span> to
            <br />
            <span className="text-purple-400">Reality</span> in 4 Steps
          </h2>
        </motion.div>

        {/* Mobile & Tablet Layout - Vertical */}
        <div className="lg:hidden">
          <div className="relative max-w-2xl mx-auto">
            {/* Vertical Timeline */}
            <div className="absolute left-8 sm:left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 via-pink-400 to-green-400 opacity-50 rounded-full" />

            <div className="space-y-8 sm:space-y-12">
              {workflowSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  className="relative"
                >
                  {/* Step Number Circle */}
                  <div
                    className={`absolute left-4 sm:left-6 w-8 h-8 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-sm sm:text-xl shadow-xl z-10`}
                  >
                    {step.step}
                  </div>

                  {/* Content Card */}
                  <div className="ml-16 sm:ml-24 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-6 sm:p-8 rounded-3xl hover:bg-gray-800/70 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                      {/* Icon */}
                      <div
                        className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${step.color} bg-opacity-20 flex items-center justify-center`}
                      >
                        <step.icon
                          className={`w-6 h-6 sm:w-8 sm:h-8 ${
                            i === 0
                              ? "text-blue-400"
                              : i === 1
                              ? "text-purple-400"
                              : i === 2
                              ? "text-pink-400"
                              : "text-green-400"
                          }`}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-white">
                          {step.title}
                        </h3>
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout - Horizontal */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Horizontal Timeline */}
            <div className="absolute top-24 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-green-400 w-3/4 mx-auto rounded-full opacity-50" />

            <div className="grid grid-cols-4 gap-6 xl:gap-8">
              {workflowSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-6 xl:p-8 rounded-3xl text-center relative z-10 hover:-translate-y-2 transition-all duration-300 hover:bg-gray-800/70"
                >
                  {/* Step Number Badge */}
                  <div
                    className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-xl`}
                  >
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 xl:w-20 xl:h-20 mx-auto mt-8 mb-6 rounded-2xl bg-gradient-to-r ${step.color} bg-opacity-20 flex items-center justify-center`}
                  >
                    <step.icon
                      className={`w-8 h-8 xl:w-10 xl:h-10 ${
                        i === 0
                          ? "text-blue-400"
                          : i === 1
                          ? "text-purple-400"
                          : i === 2
                          ? "text-pink-400"
                          : "text-green-400"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl xl:text-2xl font-bold mb-4 text-white leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm xl:text-base leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
