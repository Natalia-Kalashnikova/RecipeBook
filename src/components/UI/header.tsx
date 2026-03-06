// "use client";
// import { Breadcrumbs, Button } from "@heroui/react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { Menu, X } from "lucide-react";

// // Logo component
// const Logo = () => (
//   <Image
//     src="/logo.png"
//     alt="Home recipes collection logo"
//     width={40}
//     height={40}
//     priority
//   />
// );

// // Breadcrumbs component
// const HeaderBreadcrumbs = () => (
//   <Breadcrumbs>
//     <Breadcrumbs.Item href="#">Recipes</Breadcrumbs.Item>
//     <Breadcrumbs.Item>About Us</Breadcrumbs.Item>
//   </Breadcrumbs>
// );

// // Authentication buttons component
// const AuthButtons = ({ isMobile = false }: { isMobile?: boolean }) => (
//   <div className={`flex ${isMobile ? "flex-col gap-2 mt-4" : "gap-2"}`}>
//     <Button variant="secondary">Sign Up</Button>
//     <Button>Log in</Button>
//   </div>
// );

// // Main Header component
// const Header = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <header className="relative container mx-auto flex items-center justify-between py-4 px-4 md:px-8 lg:px-16">
//       {/* Left section: Logo + Text + Breadcrumbs */}
//       <div className="flex items-center gap-6">
//         {/* Logo + HomeCooking text */}
//         <Link href="/" className="flex items-center gap-2">
//           <Logo />
//           <p className="text-rose-400 font-bold m-0 leading-none">
//             HomeCooking
//           </p>
//         </Link>

//         {/* Breadcrumbs (hidden on mobile) */}
//         <div className="hidden md:flex items-center">
//           <HeaderBreadcrumbs />
//         </div>
//       </div>

//       {/* Right section: Auth buttons or Mobile menu */}
//       <div className="flex items-center">
//         {/* Desktop buttons */}
//         <div className="hidden md:flex">
//           <AuthButtons />
//         </div>

//         {/* Mobile menu button */}
//         <button
//           className="md:hidden ml-2 p-2"
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
//         >
//           {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile dropdown menu */}
//       {mobileMenuOpen && (
//         <div className={`absolute top-full left-0 w-full bg-white shadow-md p-4 flex flex-col transition-all duration-300 md:hidden ${
//           mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
//         }`}>
//           <HeaderBreadcrumbs />
//           <AuthButtons isMobile />
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;

"use client";

import { Breadcrumbs, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Recipes", href: "/recipes" },
  { label: "About Us", href: "/about" },
];

const Logo = () => (
  <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
    <Image
      src="/logo.png"
      alt="HomeCooking"
      width={40}
      height={40}
      priority
    />
    <span className="text-rose-500 font-bold text-lg tracking-tight">
      HomeCooking
    </span>
  </Link>
);

const AuthButtons = ({ isMobile = false }: { isMobile?: boolean }) => (
  <div className={`flex ${isMobile ? "flex-col w-full gap-3" : "gap-2"}`}>
    <Button
      variant="secondary"
      className={isMobile ? "justify-start" : ""}
    >
      Sign Up
    </Button>
    <Button
      variant="primary"
      className={isMobile ? "w-full" : ""}
    >
      Log in
    </Button>
  </div>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock scrolling when the menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">

        {/* Left: Logo & Desktop Navigation */}
        <div className="flex items-center gap-8">
          <Logo />

          <div className="hidden md:block">
            <Breadcrumbs>
              {NAV_LINKS.map((link) => (
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
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
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
            className="absolute top-full left-0 w-full bg-white border-b shadow-xl md:hidden z-40 overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-6">
              <ul className="space-y-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xl font-medium text-gray-800 hover:text-rose-500"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t">
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