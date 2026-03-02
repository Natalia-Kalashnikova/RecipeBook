"use client";
import { Breadcrumbs, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

// Logo component
const Logo = () => {
  // Returns the logo image
  return (
    <Image
      src="/logo.png"
      alt="Home recipes collection logo"
      width={40}
      height={40}
      priority
    />
  );
};

// Breadcrumbs component
const HeaderBreadcrumbs = () => {
  // Returns static breadcrumbs
  return (
    <Breadcrumbs>
      <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#">Products</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#">Electronics</Breadcrumbs.Item>
      <Breadcrumbs.Item>Laptop</Breadcrumbs.Item>
    </Breadcrumbs>
  );
};

// Authentication buttons component
const AuthButtons = () => {
  // Returns Sign Up and Log in buttons
  return (
    <div className="flex gap-2" role="group" aria-label="Authentication buttons">
      <Button variant="secondary">Sign Up</Button>
      <Button>Log in</Button>
    </div>
  );
};

// Main Header component
const Header = () => {
  // Returns the main header containing logo, breadcrumbs, and auth buttons
  return (
    <header className="container mx-auto flex items-center justify-between py-4">
      {/* Left section: Logo + Breadcrumbs */}
      <div className="flex items-center gap-6">
        {/* Logo + HomeCooking text */}
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <p className="text-rose-400 font-bold m-0 leading-0">HomeCooking</p>
        </Link>
        {/* Breadcrumbs */}
        <div className="flex items-center">
          <HeaderBreadcrumbs />
        </div>
      </div>

      {/* Right section: Auth buttons */}
      <AuthButtons />
    </header>
  );
};

export default Header;