"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Outfit } from "next/font/google";
import DesktopNavigation from "./components/navigation/desktop-nav";
import MobileNavigation from "./components/navigation/mobile-nav";
import { cn } from "@/lib/utils";

const outfit = Outfit({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <header
      className={cn(
        "relative flex items-center justify-between p-4 transition-all duration-300",
        outfit.className,
      )}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="/">
          <Image src="/images/logo.jpg" alt="logo" width={60} height={60} />
        </Link>
      </motion.div>

      <DesktopNavigation />
      <MobileNavigation />
    </header>
  );
};

export default Header;
