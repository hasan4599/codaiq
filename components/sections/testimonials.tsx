import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CTO @ TechInnovate",
    text: "Codaiq revolutionized our development process. We reduced website launch time from 6 weeks to 2 hours while maintaining enterprise-grade quality.",
    stars: 5,
    image: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Founder @ StartUpAI",
    text: "The AI-generated code is cleaner than most junior developers. It's like having a senior engineer available 24/7.",
    stars: 5,
    image: "MC",
  },
  {
    name: "Emma Wilson",
    role: "Creative Director @ DesignHub",
    text: "Finally a tool that understands creative direction. The AI interprets abstract concepts better than some humans!",
    stars: 5,
    image: "EW",
  },
  {
    name: "David Martinez",
    role: "Head of Product @ FinTech Corp",
    text: "Cut our development costs by 70% while improving site performance. The ROI was immediate and substantial.",
    stars: 5,
    image: "DM",
  },
  {
    name: "Lisa Thompson",
    role: "Lead Developer @ WebSolutions",
    text: "The learning curve was practically non-existent. Our team was productive from day one, creating complex applications effortlessly.",
    stars: 5,
    image: "LT",
  },
  {
    name: "James Rodriguez",
    role: "Product Manager @ CloudTech",
    text: "What used to take our team months now takes days. The quality and speed of development has transformed our entire business model.",
    stars: 5,
    image: "JR",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonialsPerSlide = 1;
  const maxIndex = testimonials.length - 1;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [maxIndex, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: SetStateAction<number>) => {
    setCurrentIndex(index);
  };

  const getCurrentTestimonial = () => {
    return testimonials[currentIndex];
  };

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-24 lg:py-32 px-4 lg:px-8 bg-gradient-to-b from-gray-900/50 to-gray-950/50 relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 text-white leading-tight">
            Trusted by<span className="text-purple-400"> Industry Leaders</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See what our customers are saying about their transformation
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-full flex items-center justify-center text-white hover:bg-gray-700/80 transition-all duration-300 shadow-lg hover:scale-110"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-full flex items-center justify-center text-white hover:bg-gray-700/80 transition-all duration-300 shadow-lg hover:scale-110"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonial Display */}
          <div className="overflow-hidden max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                {(() => {
                  const testimonial = getCurrentTestimonial();
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-gray-800/50 backdrop-blur-sm border border-purple-400/20 p-8 lg:p-12 rounded-3xl hover:bg-gray-800/70 transition-all duration-300 hover:border-purple-400/40 hover:scale-[1.02] group text-center"
                    >
                      {/* Header with avatar and info */}
                      <div className="flex flex-col items-center gap-6 mb-8">
                        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-3xl bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-2xl lg:text-3xl font-bold text-gray-900 shadow-lg group-hover:shadow-purple-400/25 transition-shadow duration-300">
                          {testimonial.image}
                        </div>
                        <div className="text-center">
                          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                            {testimonial.name}
                          </h3>
                          <p className="text-gray-400 text-lg lg:text-xl">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>

                      {/* Testimonial text */}
                      <p className="text-gray-300 mb-8 leading-relaxed text-lg lg:text-xl max-w-3xl mx-auto">
                        "{testimonial.text}"
                      </p>

                      {/* Stars rating */}
                      <div className="flex justify-center gap-2">
                        {[...Array(testimonial.stars)].map((_, j) => (
                          <Star
                            key={j}
                            className="w-6 h-6 lg:w-7 lg:h-7 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </motion.div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-purple-400 scale-125 shadow-lg shadow-purple-400/50"
                    : "bg-gray-600 hover:bg-gray-500 hover:scale-110"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
