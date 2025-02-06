"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChefHat, User } from "lucide-react";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import OrderButton from "./order/orderButton";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { todaysSpecials } from "@/lib/menuItem";

interface DishOfTheDayProps {
  interval?: number;
}

const DishOfTheDay = ({ interval = 5000 }: DishOfTheDayProps) => {
  const [currentSpecial, setCurrentSpecial] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  const firstFourSpecial = useMemo(() => todaysSpecials.slice(0, 3), []);
  const todaysSpecial = firstFourSpecial[currentSpecial];

  const nextSlide = useCallback(() => {
    setCurrentSpecial((prev) =>
      prev === firstFourSpecial.length - 1 ? 0 : prev + 1,
    );
  }, [firstFourSpecial.length]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let intervalId: NodeJS.Timeout;

    if (!isHovered) {
      intervalId = setInterval(nextSlide, interval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [mounted, isHovered, nextSlide, interval]);

  const specialsVariants = {
    enter: { x: 50, opacity: 0 },
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      x: -50,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  if (!mounted || !todaysSpecial) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background mt-4 h-full w-full items-center justify-center overflow-hidden"
    >
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Today&apos;s Special
      </h2>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSpecial}
          variants={specialsVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="space-y-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-live="polite"
        >
          <div className="aspect-video h-[12rem] w-full md:h-[20rem]">
            <Image
              src={todaysSpecial.image}
              alt={todaysSpecial.name}
              width={500}
              height={500}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className={cn(
                "h-full w-full transform rounded-md object-cover object-center transition-transform duration-300 ease-in-out",
                isHovered ? "scale-105" : "scale-100",
              )}
            />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-2xl font-semibold md:text-xl">
              {todaysSpecial.name}
            </h3>
            <p>{todaysSpecial.description}</p>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock size={20} aria-label="Preparation time" />
                <span>{todaysSpecial.prep}</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat aria-label="Difficulty level" />
                <span>{todaysSpecial.difficulty}</span>
              </div>
              <div className="flex items-center gap-2">
                <User aria-label="Number of orders" />
                <span>{todaysSpecial.orders}</span>
              </div>
            </div>
          </div>

          <OrderButton item={todaysSpecial} />
        </motion.div>
      </AnimatePresence>

      {/* Pagination Indicators */}
      <div className="mt-4 flex justify-center gap-2">
        {firstFourSpecial.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSpecial(index)}
            className={cn(
              "h-2 w-2 rounded-full",
              currentSpecial === index ? "bg-gray-800" : "bg-gray-300",
            )}
            aria-label={`Go to dish ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default DishOfTheDay;
