'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faChevronRight,
  faRocket,
  faSignOutAlt,
  faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useState } from 'react';
import MobileMenu from '../mobile-menu';
import Image from 'next/image';

export default function Header({ user }: { user: { email: string, name: string, image: string } | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed w-full top-0 z-50 backdrop-blur-xl border-b border-gray-800/30">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="w-[140px] h-[50px] flex items-center relative"
            >
              <Image fill src={'/logo.svg'} alt='logo' />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="glass-navbar px-8 py-3 rounded-full flex gap-8">
                {['Features', 'How It Works', 'Templates', 'Pricing', 'Academy', 'Careers'].map((item) => (
                  <Link
                    key={item}
                    href={
                      item.toLowerCase() === 'careers'
                        ? '/careers'
                        : `/#${item.toLowerCase().replace(/\s+/g, '-')}`
                    }
                    className="hover:text-blue-400 transition-colors duration-300 hover:scale-105"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center gap-3">
                {!user ? (
                  <>
                    <button
                      onClick={() => signIn()}
                      className="glass-layer px-6 py-2 rounded-full hover:bg-gray-800/30 transition-all duration-300 hover:scale-105"
                    >
                      Log In
                    </button>
                    <button
                      onClick={() => signIn()}
                      className="bg-gradient-to-r from-blue-400 to-purple-500 px-6 py-2 rounded-full hover:shadow-2xl hover:shadow-blue-400/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
                    >
                      <span>Get Started</span>
                      <FontAwesomeIcon icon={faChevronRight as IconProp} className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <Image
                      src={user.image || '/default-avatar.png'}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full glass-layer hover:bg-gray-800/30 hover:scale-105 transition-all duration-300"
                    />
                    <Link href="/dashboard">
                      <button className="bg-gradient-to-r from-blue-400 to-purple-500 px-6 py-2 rounded-full hover:shadow-2xl hover:shadow-blue-400/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
                        <FontAwesomeIcon icon={faTachometerAlt as IconProp} className="w-4 h-4" />
                        <span>Dashboard</span>
                      </button>
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="bg-gradient-to-r from-red-500 to-pink-500 px-6 py-2 rounded-full hover:shadow-2xl hover:shadow-red-400/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 text-white"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt as IconProp} className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Nav */}
            <div className="lg:hidden flex items-center gap-3">
              {!user ? (
                <button
                  onClick={() => signIn()}
                  className="glass-layer p-2 rounded-full hover:bg-gray-800/30 transition-colors"
                >
                  <span className="text-sm px-2">Login</span>
                </button>
              ) : (
                <Image
                  src={user.image || '/default-avatar.png'}
                  alt="User"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full glass-layer hover:bg-gray-800/30 transition-colors"
                />
              )}

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
      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
    </>
  );
}
