'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronRight,
  faRocket,
  faTachometerAlt,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function MobileMenu({ onClose }: { onClose: () => void }) {
  const { data: session } = useSession();
  const isSignedIn = !!session;

  return (
    <div className="fixed inset-0 z-50 p-4 sm:p-6">
      {/* Glassmorphism Overlay Container */}
      <div className="menu-container bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl h-full flex flex-col overflow-hidden">
        {/* Header Section */}
        <div className="flex justify-between items-center p-6 sm:p-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faRocket as IconProp}
              className="text-blue-400 w-5 h-5 sm:w-6 sm:h-6 animate-pulse"
            />
            <span className="text-lg sm:text-xl font-bold text-white">Codaiq</span>
          </div>

          <button
            onClick={onClose}
            className="p-3 sm:p-4 hover:bg-white/10 rounded-2xl hover:rotate-90 transition-all duration-300"
          >
            <FontAwesomeIcon
              icon={faXmark as IconProp}
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
            />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-scroll">
          <nav className="flex flex-col gap-4 sm:gap-6 h-full justify-start max-w-md mx-auto">
            {[
              'Features',
              'How It Works',
              'Templates',
              'Pricing',
              'Academy',
              'Careers',
            ].map((item, index) => (
              <Link
                key={item}
                href={
                  item.toLowerCase() === 'careers'
                    ? '/careers'
                    : `/#${item.toLowerCase().replace(/\s+/g, '-')}`
                }
                className="text-2xl sm:text-3xl py-4 sm:py-6 px-6 sm:px-8 text-white font-medium hover:text-blue-400 hover:bg-white/5 rounded-2xl transition-all duration-300 hover:scale-105 hover:translate-x-2"
                onClick={onClose}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideInFromRight 0.6s ease-out forwards',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="tracking-wide">{item}</span>
                  <FontAwesomeIcon
                    icon={faChevronRight as IconProp}
                    className="w-5 h-5 sm:w-6 sm:h-6 opacity-60 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              </Link>
            ))}

            {/* Dashboard Link - Only shown when signed in */}
            {isSignedIn && (
              <Link
                href="/dashboard"
                className="text-2xl sm:text-3xl py-4 sm:py-6 px-6 sm:px-8 text-white font-medium hover:text-blue-400 hover:bg-white/5 rounded-2xl transition-all duration-300 hover:scale-105 hover:translate-x-2"
                onClick={onClose}
                style={{
                  animationDelay: `600ms`,
                  animation: 'slideInFromRight 0.6s ease-out forwards',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="tracking-wide">Dashboard</span>
                  <FontAwesomeIcon
                    icon={faTachometerAlt as IconProp}
                    className="w-5 h-5 sm:w-6 sm:h-6 opacity-60 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              </Link>
            )}
          </nav>
        </div>

        {/* Footer Section */}
        <div className="p-6 sm:p-8 border-t border-white/10">
          <div className="text-center max-w-md mx-auto">
            {!isSignedIn ? (
              <>
                <p className="text-white/80 text-sm sm:text-base mb-4">
                  Ready to transform your development workflow?
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={() => signIn()}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-xl text-white font-medium bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 hover:scale-105"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => signIn()}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-500/80 to-purple-500/80 px-6 sm:px-8 py-3 rounded-xl text-white font-medium hover:from-blue-500/90 hover:to-purple-500/90 transition-all duration-300 hover:scale-105"
                  >
                    Get Started Free
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-white/80 text-sm sm:text-base mb-4">Welcome back!</p>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: '/' });
                    onClose();
                  }}
                  className="w-full sm:w-auto bg-white/10 border border-white/20 px-6 sm:px-8 py-3 rounded-xl text-white font-medium hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
