import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faChevronRight,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import MobileMenu from "../mobile-menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Add the CSS animations */}
      {/* Sticky Header */}
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
                  icon={faBars as unknown as IconProp}
                  className="w-6 h-6"
                />
              </button>
              <div className="glass-layer  py-2 rounded-xl flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faRocket as unknown as IconProp}
                  className="text-blue-400 w-6 h-6"
                />
                <span className="text-xl font-bold">Codaiq</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-12">
              <div className="glass-layer px-6 py-3 rounded-xl flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faRocket as unknown as IconProp}
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
                    className="hover:text-blue-400 transition-colors duration-300 hover:scale-105"
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
                icon={faChevronRight as unknown as IconProp}
                className="w-4 h-4"
              />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay - Glassmorphism Effect */}
      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
    </>
  );
}
