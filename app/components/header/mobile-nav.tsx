import React, { useEffect, useState } from "react";
import HamburgerMenu from "./hamburger";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarClock, Clock, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigationItems } from "@/app/utils/lib";

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const navVariants = {
    open: { opacity: 1, x: 0, transition: { duration: 0.3 }, ease: "easeOut" },
    closed: {
      opacity: 0,
      x: "-100%",
      transition: { duration: 0.3 },
      ease: "easeIn",
    },
  };

  const itemVariants = {
    open: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.15, delay: index * 0.1 },
    }),
    closed: { opacity: 0, x: "-100%" },
  };

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

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <nav
      aria-label="Mobile Navigation Menu"
      className="fixed right-5 top-3 z-50 flex md:hidden"
    >
      <HamburgerMenu
        isOpen={isOpen}
        aria-hidden={isOpen}
        onclick={() => setIsOpen(!isOpen)}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={navVariants}
            aria-hidden={!isOpen}
            className={cn(
              "fixed inset-0 z-40 flex h-dvh flex-col items-center justify-between pt-[8rem] backdrop-blur-md",
              scrolled && "bg-slate-900/90",
            )}
          >
            {/* Navigation Items */}
            <motion.ul className="flex h-full w-full flex-col items-center gap-6">
              {navigationItems.map((item, index) => (
                <motion.li
                  role="menuitem"
                  custom={index}
                  variants={itemVariants}
                  key={item}
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    onClick={() => {
                      setIsOpen(false);
                      setActiveLink(item);
                    }}
                    className={cn(
                      "rounded-lg p-2 text-lg font-medium uppercase text-slate-900/90 hover:scale-105 focus:text-primary focus:ring-2 focus:ring-primary",
                      activeLink === item &&
                        "rounded-lg bg-secondary px-3 py-2 text-primary",
                      scrolled && "text-white/90",
                      scrolled && activeLink === item && "bg-accent text-white",
                    )}
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mt-auto w-full space-y-4 bg-slate-900/90 backdrop-blur-md"
            >
              <div className="grid grid-cols-2 gap-4 p-2">
                <Link
                  href={"tel:+2540712909475"}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-white hover:scale-105"
                >
                  <Phone size={20} />
                  <span className="text-sm font-medium">Call Now</span>
                </Link>

                <Link
                  href={"/reservation"}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-slate-900/90"
                >
                  <CalendarClock size={20} />
                  <span className="text-sm font-medium">Reserve</span>
                </Link>
              </div>

              <div className="space-y-4 rounded-lg bg-slate-800/50 p-4">
                <div className="flex items-center gap-3 text-slate-200">
                  <Clock size={20} className="mt-1 shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium">Hours</p>
                    <p>Mon - Fri: 7am - 10pm</p>
                    <p>Sat - Sun : 9am - 11pm</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <MapPin size={20} className="-mt-5 shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium">Location</p>
                    <p>Westlands, Nairobi</p>
                    <p>Link Road, Nyali</p>
                    <p>Greenwood Av, Mombasa</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MobileNavigation;
