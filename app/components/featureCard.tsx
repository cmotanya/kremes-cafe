import React from "react";
import { motion } from "framer-motion";

interface Feature {
  icon: React.ElementType;
  text: string | React.ReactNode;
}

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUpVariants}
      className="relative flex w-[14rem] items-center space-x-3 whitespace-nowrap rounded-md border-2 border-accent p-2 backdrop-blur-md"
    >
      <div className="rounded-lg bg-white/10 p-1 backdrop-blur-md transition-transform">
        <feature.icon className="size-5 text-secondary" />
      </div>
      <span className="text-sm font-medium">{feature.text}</span>
    </motion.div>
  );
};

export default FeatureCard;
