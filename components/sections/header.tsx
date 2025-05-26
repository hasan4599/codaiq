import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faChevronRight,
  faRocket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "../mobile-menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Sticky Header */}
      <header className="fixed w-full top-0 z-50 backdrop-blur-xl border-b border-gray-800/30">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <nav className="flex items-center justify-between">
            {/* Logo - Always Left */}
            <Link
              href="/"
              className="glass-layer px-4 py-2 rounded-xl flex items-center gap-2"
            >
              <FontAwesomeIcon
                icon={faRocket as unknown as IconProp}
                className="text-blue-400 w-6 h-6 animate-pulse"
              />
              <span className="text-xl font-bold">Codaiq</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="glass-navbar px-8 py-3 rounded-full flex gap-8">
                {[
                  "Features",
                  "How It Works",
                  "Templates",
                  "Pricing",
                  "Academy",
                  "Careers",
                ].map((item) => (
                  <Link
                    key={item}
                    href={
                      item.toLowerCase() === "careers"
                        ? "/careers"
                        : `/#${item.toLowerCase().replace(/\s+/g, "-")}`
                    }
                    className="hover:text-blue-400 transition-colors duration-300 hover:scale-105"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              {/* Desktop Auth Buttons */}
              <div className="flex items-center gap-3">
                <button className="glass-layer px-6 py-2 rounded-full hover:bg-gray-800/30 transition-all duration-300 hover:scale-105">
                  <FontAwesomeIcon
                    icon={faUser as unknown as IconProp}
                    className="w-4 h-4 mr-2"
                  />
                  Log In
                </button>

                <button className="bg-gradient-to-r from-blue-400 to-purple-500 px-6 py-2 rounded-full hover:shadow-2xl hover:shadow-blue-400/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
                  <span>Get Started</span>
                  <FontAwesomeIcon
                    icon={faChevronRight as unknown as IconProp}
                    className="w-4 h-4"
                  />
                </button>
              </div>
            </div>

            {/* Mobile Right Section */}
            <div className="lg:hidden flex items-center gap-3">
              {/* Mobile Log In Button */}
              <button className="glass-layer p-2 rounded-full hover:bg-gray-800/30 transition-colors">
                <FontAwesomeIcon
                  icon={faUser as unknown as IconProp}
                  className="w-4 h-4"
                />
              </button>

              {/* Mobile Menu Button - Right Aligned with Round Background */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="glass-layer p-3 rounded-full hover:bg-gray-800/30 transition-colors"
              >
                <FontAwesomeIcon
                  icon={faBars as unknown as IconProp}
                  className="w-5 h-5"
                />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
    </>
  );
}
