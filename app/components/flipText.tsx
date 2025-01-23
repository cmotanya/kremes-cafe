import { AnimatePresence, motion, Variants } from "framer-motion";
import React from "react";
import { cn } from "../utils/cn";

interface FlipTextProps {
  word: string;
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
}

const FlipText = ({
  word,
  duration = 0.5,
  delayMultiple = 0.08,
  framerProps = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },
  className,
}: FlipTextProps) => {
  return (
    <div className="flex justify-center space-x-2">
      <AnimatePresence mode="wait">
        {word.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={"hidden"}
            animate={"visible"}
            exit={"hidden"}
            variants={framerProps}
            transition={{ duration, delay: index * delayMultiple }}
            className={cn("origin-center drop-shadow-sm", className)}
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FlipText;
