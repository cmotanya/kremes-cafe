import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "../utils/cn";
import { navigationItems } from "../utils/lib";

const DesktopNavigation = () => {
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
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <div className="flex items-center justify-between p-4">
      <nav className="hidden md:block">
        <div className="flex space-x-4 text-xl">
          {navigationItems.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className={cn(
                "group relative px-3 py-2 font-medium uppercase hover:text-primary",
                scrolled && "text-gray-800",
              )}
            >
              {item}
              <span className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 bg-primary transition-transform group-hover:scale-x-100" />
            </Link>
          ))}
          <button className="rounded-full bg-secondary px-6 py-2 font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-none">
            ORDER NOW
          </button>
        </div>
      </nav>
    </div>
  );
};

export default DesktopNavigation;
