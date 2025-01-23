import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const HamburgerMenu = ({
  onclick,
  isOpen,
}: {
  onclick: () => void;
  isOpen: boolean;
}) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <button
      onClick={onclick}
      aria-label={cn(isOpen ? "Close Menu" : "Open Menu")}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      className={cn(
        "relative z-[1010] flex h-14 w-14 cursor-pointer flex-col items-center justify-center rounded-full transition-colors duration-300",
        hasScrolled && isOpen
          ? "bg-red-500"
          : hasScrolled
            ? "bg-primary"
            : isOpen
              ? "bg-red-500"
              : "bg-transparent",
      )}
    >
      <div className="relative h-6 w-8">
        <span
          className={cn(
            "absolute left-0 h-1 w-full transform transition duration-300",
            isOpen ? "top-1/2 -rotate-45 bg-white" : "top-0.5 bg-primary",
            hasScrolled ? "bg-white" : "",
          )}
        ></span>
        <span
          className={cn(
            "absolute left-0 top-3 h-1 w-full transform transition duration-300",
            isOpen ? "opacity-0" : "bg-primary",
            hasScrolled ? "bg-white" : "",
          )}
        ></span>
        <span
          className={cn(
            "absolute right-0 h-1 w-3/4 transform transition duration-300",
            isOpen
              ? "top-1/2 w-full rotate-45 bg-white"
              : "top-[1.35rem] bg-primary",
            hasScrolled ? "bg-white" : "",
          )}
        ></span>
      </div>
    </button>
  );
};

export default HamburgerMenu;
