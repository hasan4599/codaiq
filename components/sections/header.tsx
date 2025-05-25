import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faChevronRight,
  faRocket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Add the CSS animations */}

      <header className="fixed w-full top-0 z-50 backdrop-blur-xl border-b border-gray-800/30">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <nav className="flex items-center justify-between">
            {/* Mobile Navigation */}
            <div className="lg:hidden flex items-center gap-4">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="glass-layer p-3 rounded-xl hover:bg-gray-800/30 transition-colors"
              >
                <FontAwesomeIcon
                  icon={faBars as IconProp}
                  className="w-6 h-6"
                />
              </button>
              <div className="glass-layer py-2 rounded-xl flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faRocket as IconProp}
                  className="text-blue-400 w-6 h-6"
                />
                <span className="text-xl font-bold">Codaiq</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-12">
              <div className="glass-layer px-6 py-3 rounded-xl flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faRocket as IconProp}
                  className="text-blue-400 w-6 h-6 animate-pulse"
                />
                <span className="text-xl font-bold">Codaiq</span>
              </div>

              <div className="glass-navbar px-8 py-3 rounded-full flex gap-8">
                {[
                  "Features",
                  "How It Works",
                  "Templates",
                  "Pricing",
                  "Academy",
                ].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-sm md:text-base  hover:text-blue-400 transition-colors duration-300 hover:scale-105"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <button
              className="hidden lg:flex bg-gradient-to-r from-blue-400 to-purple-500 px-8 py-3 rounded-full 
                  hover:shadow-2xl hover:shadow-blue-400/30 transition-all duration-300 hover:-translate-y-0.5 items-center gap-2"
            >
              <span>Get Started</span>
              <FontAwesomeIcon
                icon={faChevronRight as IconProp}
                className="w-4 h-4"
              />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay - Glassmorphism Effect */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 p-4 sm:p-6">
          {/* Glassmorphism Overlay Container */}
          <div className="menu-container bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl h-full flex flex-col overflow-hidden">
            {/* Header Section */}
            <div className="flex justify-between items-center p-6 sm:p-8 border-b border-white/10">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faRocket as IconProp}
                  className="text-blue-400 w-5 h-5 sm:w-6 sm:h-6 animate-pulse"
                />
                <span className="text-lg sm:text-xl font-bold text-white">
                  Codaiq
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-3 sm:p-4 hover:bg-white/10 rounded-2xl hover:rotate-90 transition-all duration-300"
              >
                <FontAwesomeIcon
                  icon={faXmark as IconProp}
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                />
              </button>
            </div>

            {/* Navigation Section */}
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
              <nav className="flex flex-col gap-4 sm:gap-6 h-full justify-center max-w-md mx-auto">
                {[
                  "Features",
                  "How It Works",
                  "Templates",
                  "Pricing",
                  "Academy",
                ].map((item, index) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-2xl sm:text-3xl py-4 sm:py-6 px-6 sm:px-8 text-white font-medium hover:text-blue-400 hover:bg-white/5 rounded-2xl transition-all duration-300 hover:scale-105 hover:translate-x-2"
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "slideInFromRight 0.6s ease-out forwards",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="tracking-wide">{item}</span>
                      <FontAwesomeIcon
                        icon={faChevronRight as IconProp}
                        className="w-5 h-5 sm:w-6 sm:h-6 opacity-60 hover:opacity-100 transition-all duration-300"
                      />
                    </div>
                  </a>
                ))}
              </nav>
            </div>

            {/* Footer Section */}
            <div className="p-6 sm:p-8 border-t border-white/10">
              <div className="text-center max-w-md mx-auto">
                <p className="text-white/80 text-sm sm:text-base mb-4">
                  Ready to transform your development workflow?
                </p>
                <button className="w-full sm:w-auto bg-gradient-to-r from-blue-500/80 to-purple-500/80 px-6 sm:px-8 py-3 rounded-xl text-white font-medium hover:from-blue-500/90 hover:to-purple-500/90 transition-all duration-300 hover:scale-105">
                  Get Started Free
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
