'use client';

import dynamic from 'next/dynamic';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faChevronRight,
  faRocket,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "../mobile-menu";

// Dynamically import UserButton with no SSR
const DynamicUserButton = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.UserButton),
  { ssr: false }
);

const userButtonAppearance = {
  elements: {
    // Avatar styling
    avatarBox:
      "w-10 h-10 glass-layer rounded-full hover:bg-gray-800/30 transition-all duration-300 hover:scale-105",

    // Dropdown/Modal styling
    card: "bg-gray-800/95 backdrop-blur-lg border border-gray-600/50 shadow-2xl",
    headerTitle: "text-white font-bold",
    headerSubtitle: "text-gray-300",

    // User info section
    userPreview:
      "bg-gray-700/40 border border-gray-600/40 rounded-lg p-4",
    userPreviewMainIdentifier: "text-white font-semibold",
    userPreviewSecondaryIdentifier: "text-gray-300",

    // Menu items
    menuItem:
      "text-gray-100 hover:bg-gray-700/50 hover:text-white rounded-lg transition-all duration-200",
    menuItemIcon: "text-gray-300",
    menuItemText: "text-gray-100 font-medium",

    // Footer/branding
    footer:
      "bg-gray-700/40 border-t border-gray-600/40 rounded-b-lg",
    footerActionText: "text-gray-300 text-xs",
    footerActionLink:
      "text-blue-400 hover:text-blue-300 text-xs transition-colors",

    // Dividers
    divider: "bg-gray-600/50",

    // Close button
    modalCloseButton:
      "text-gray-300 hover:text-white transition-colors",
  },
  variables: {
    colorPrimary: "#3b82f6",
    colorText: "#f9fafb",
    colorTextSecondary: "#d1d5db",
    colorBackground: "#1f2937",
    colorInputBackground: "#374151",
    borderRadius: "0.75rem",
  },
};

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
                icon={faRocket as IconProp}
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
                {/* When User is NOT Signed In */}
                <SignedOut>
                  <SignInButton>
                    <button className="glass-layer px-6 py-2 rounded-full hover:bg-gray-800/30 transition-all duration-300 hover:scale-105">
                      Log In
                    </button>
                  </SignInButton>

                  <SignUpButton>
                    <button className="bg-gradient-to-r from-blue-400 to-purple-500 px-6 py-2 rounded-full hover:shadow-2xl hover:shadow-blue-400/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
                      <span>Get Started</span>
                      <FontAwesomeIcon
                        icon={faChevronRight as IconProp}
                        className="w-4 h-4"
                      />
                    </button>
                  </SignUpButton>
                </SignedOut>

                {/* When User is Signed In */}
                <SignedIn>
                  <div className="flex items-center gap-3">
                    <DynamicUserButton
                      afterSignOutUrl="/"
                      appearance={userButtonAppearance}
                    />

                    <Link href="/dashboard">
                      <button className="bg-gradient-to-r from-blue-400 to-purple-500 px-6 py-2 rounded-full hover:shadow-2xl hover:shadow-blue-400/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
                        <FontAwesomeIcon
                          icon={faTachometerAlt as IconProp}
                          className="w-4 h-4"
                        />
                        <span>Dashboard</span>
                      </button>
                    </Link>
                  </div>
                </SignedIn>
              </div>
            </div>

            {/* Mobile Right Section */}
            <div className="lg:hidden flex items-center gap-3">
              {/* Mobile Auth Buttons */}
              <SignedOut>
                <SignInButton>
                  <button className="glass-layer p-2 rounded-full hover:bg-gray-800/30 transition-colors">
                    <span className="text-sm px-2">Login</span>
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center gap-2">
                  <DynamicUserButton
                    afterSignOutUrl="/"
                    appearance={{
                      ...userButtonAppearance,
                      elements: {
                        ...userButtonAppearance.elements,
                        avatarBox: "w-8 h-8 glass-layer rounded-full hover:bg-gray-800/30 transition-colors",
                      }
                    }}
                  />
                </div>
              </SignedIn>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="glass-layer p-2 rounded-full hover:bg-gray-800/30 transition-colors"
              >
                <FontAwesomeIcon icon={faBars as IconProp} className="w-5 h-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
