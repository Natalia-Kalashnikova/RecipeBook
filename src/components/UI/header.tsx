'use client';

import { Breadcrumbs, Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Recipes', href: '/recipes' },
  { label: 'About Us', href: '/about' },
];

const Logo = () => (
  <Link
    href="/"
    className="flex items-center gap-2 transition-opacity hover:opacity-80">
    <Image src="/logo.png" alt="HomeCooking" width={40} height={40} priority />
    <span className="text-lg font-bold tracking-tight text-rose-500">
      HomeCooking
    </span>
  </Link>
);

const AuthButtons = ({ isMobile = false }: { isMobile?: boolean }) => (
  <div className={`flex ${isMobile ? 'w-full flex-col gap-3' : 'gap-2'}`}>
    <Button variant="secondary" className={isMobile ? 'justify-start' : ''}>
      Sign Up
    </Button>
    <Button variant="primary" className={isMobile ? 'w-full' : ''}>
      Log in
    </Button>
  </div>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock scrolling when the menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Left: Logo & Desktop Navigation */}
        <div className="flex items-center gap-8">
          <Logo />

          <div className="hidden md:block">
            <Breadcrumbs>
              {NAV_LINKS.map(link => (
                <Breadcrumbs.Item key={link.href} href={link.href}>
                  {link.label}
                </Breadcrumbs.Item>
              ))}
            </Breadcrumbs>
          </div>
        </div>

        {/* Right: Desktop Auth or Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <AuthButtons />
          </div>

          <button
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 z-40 w-full overflow-hidden border-b bg-white shadow-xl md:hidden">
            <div className="flex flex-col gap-6 p-6">
              <ul className="space-y-4">
                {NAV_LINKS.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xl font-medium text-gray-800 hover:text-rose-500"
                      onClick={() => setIsOpen(false)}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="border-t pt-4">
                <AuthButtons isMobile />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
