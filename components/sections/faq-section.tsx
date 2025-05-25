"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqItems = [
  {
    question: "How does the AI website builder work?",
    answer:
      "Our AI analyzes your description and automatically generates a complete website with optimized code, responsive design, and professional styling. You can then customize it further using our visual editor.",
  },
  {
    question: "Do I need coding experience?",
    answer:
      "Not at all! Codaiq is designed for everyone. Simply describe what you want in plain English, and our AI will handle all the technical aspects of building your website.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "Yes, you can connect your existing domain or purchase a new one through our platform. We handle all the technical setup including SSL certificates and DNS configuration.",
  },
  {
    question: "What kind of websites can I build?",
    answer:
      "You can build any type of website including landing pages, e-commerce stores, portfolios, blogs, SaaS applications, and more. Our AI is trained on thousands of website patterns.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes! Our free plan includes basic features and allows you to build and host simple websites. You can upgrade anytime to access advanced features and remove limitations.",
  },
  {
    question: "How fast can I build a website?",
    answer:
      "Most websites are generated within minutes. Complex sites with custom features may take longer, but you can typically have a professional website live within an hour.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const accordionVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
};

const iconVariants = {
  collapsed: { rotate: 0 },
  expanded: { rotate: 180 },
};

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 xl:py-28 bg-gradient-to-b from-[#0a101f] via-[#0f1629] to-[#020617] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.2),transparent_50%)]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Frequently Asked
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Questions
            </span>
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Everything you need to know about building websites with AI
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-3 sm:space-y-4"
        >
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.2 },
              }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl backdrop-blur-md bg-white/[0.02] border border-white/[0.05] shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] via-transparent to-pink-500/[0.02]" />

                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                <div className="relative">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 text-left focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-xl sm:rounded-2xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-white group-hover:text-purple-300 transition-colors duration-300 pr-4">
                        {item.question}
                      </h3>
                      <motion.div
                        variants={iconVariants}
                        animate={openIndex === index ? "expanded" : "collapsed"}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 text-purple-400 group-hover:text-purple-300"
                      >
                        <ChevronDown className="w-full h-full" />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        variants={accordionVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        className="overflow-hidden"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-5 lg:pb-6"
                        >
                          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />
                          <p className="text-xs sm:text-sm lg:text-base text-gray-300 leading-relaxed">
                            {item.answer}
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
