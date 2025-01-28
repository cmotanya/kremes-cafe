import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChefHat, User } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { todaysSpecials } from "../utils/lib";
import OrderButton from "./order/orderButton";
import Image from "next/image";

const DishOfTheDay = () => {
  const [currentSpecial, setCurrentSpecial] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSpecial((prev) =>
      prev === todaysSpecials.length - 1 ? 0 : prev + 1,
    );
  }, []);

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;

    if (!isHovered) {
      intervalId = setInterval(nextSlide, 5000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isHovered, nextSlide]);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background mt-4 w-full items-center justify-center overflow-hidden p-5"
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
        >
          <div className="aspect-video h-[12rem] w-full md:h-[20rem]">
            <Image
              src={todaysSpecials[currentSpecial].image}
              alt={todaysSpecials[currentSpecial].name}
              width={500}
              height={500}
              priority
              className={cn(
                "h-full w-full transform rounded-md object-cover object-center transition-transform duration-300 ease-in-out",
                isHovered ? "scale-105" : "scale-100",
              )}
            />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-2xl font-semibold md:text-xl">
              {todaysSpecials[currentSpecial].name}
            </h3>
            <p>{todaysSpecials[currentSpecial].description}</p>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>{todaysSpecials[currentSpecial].prep}</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat />
                <span>{todaysSpecials[currentSpecial].difficulty}</span>
              </div>
              <div className="flex items-center gap-2">
                <User />
                <span>{todaysSpecials[currentSpecial].orders}</span>
              </div>
            </div>
          </div>

          <OrderButton item={todaysSpecials[currentSpecial]} />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default DishOfTheDay;
