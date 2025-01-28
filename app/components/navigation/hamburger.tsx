import { cn } from "@/lib/utils";

const HamburgerMenu = ({
  onclick,
  isOpen,
}: {
  onclick: () => void;
  isOpen: boolean;
}) => {
  return (
    <button
      onClick={onclick}
      aria-label={cn(isOpen ? "Close Menu" : "Open Menu")}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      className={cn(
        "relative z-[1010] flex h-14 w-14 cursor-pointer flex-col items-center justify-center rounded-full transition-colors duration-300",
        isOpen ? "bg-red-500" : "bg-transparent",
      )}
    >
      <div className="relative h-6 w-8">
        <span
          className={cn(
            "absolute left-0 h-1 w-full transform transition duration-300",
            isOpen ? "top-1/2 -rotate-45 bg-white" : "top-0.5 bg-primary",
          )}
        ></span>
        <span
          className={cn(
            "absolute left-0 top-3 h-1 w-full transform transition duration-300",
            isOpen ? "opacity-0" : "bg-primary",
          )}
        ></span>
        <span
          className={cn(
            "absolute right-0 h-1 w-3/4 transform transition duration-300",
            isOpen
              ? "top-1/2 w-full rotate-45 bg-white"
              : "top-[1.35rem] bg-primary",
          )}
        ></span>
      </div>
    </button>
  );
};

export default HamburgerMenu;
