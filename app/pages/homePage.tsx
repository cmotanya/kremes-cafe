"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  cormorant,
  customers,
  features,
  grotesque,
  playfair,
  todaysSpecials,
} from "../utils/lib";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../utils/cn";
import TrustedCustomers from "../components/trustedCustomers";
import { ChefHat, Clock, Phone, User, UtensilsCrossed } from "lucide-react";
import FlipText from "../components/flipText";
import FeatureCard from "../components/featureCard";
import OrderButton from "../components/order/orderButton";

const HomePage = () => {
  const [currentSpecial, setCurrentSpecial] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };
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

  return (
    <section id="#home" className="relative h-dvh w-full">
      {/* Main Content - Centered */}
      <div className="relative z-20 mt-28 h-full items-center justify-center md:mt-0 md:flex">
        <div className="container mx-auto grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          {/* Left Column - Main Text */}
          <div className="flex flex-col items-center justify-center space-y-8 border-black/10 text-center md:space-y-16 md:border-2">
            {/* Cafe Name */}
            <motion.div
              variants={fadeUpVariants}
              custom={0}
              className="text-5xl font-bold tracking-tighter"
            >
              <h1
                className={cn(
                  "bg-clip-text text-6xl lg:text-8xl",
                  playfair.className,
                )}
              >
                <FlipText word="KREMES" />
              </h1>
              <h3
                className={cn(
                  "text-2xl font-medium tracking-tight md:text-3xl lg:text-4xl",
                  cormorant.className,
                )}
              >
                Cafe and Restaurant
              </h3>
            </motion.div>

            {/* Feature Grid */}
            <div className={cn("flex flex-col gap-4", grotesque.className)}>
              {features.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </div>

            {/* Social Proof */}
            <motion.div
              variants={fadeUpVariants}
              custom={4}
              initial="hidden"
              animate="visible"
              className="flex gap-8 rounded-lg bg-white/5 p-3 backdrop-blur-md"
            >
              <div className="flex items-center -space-x-5">
                {customers.map((customer, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                  >
                    <Image
                      src={customer}
                      alt={`Customer ${index + 1}`}
                      width={40}
                      height={40}
                      loading="lazy"
                      className="size-10 rounded-full border-2 border-white object-cover"
                    />
                  </motion.div>
                ))}
                <motion.span
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="flex size-10 items-center justify-center rounded-full bg-gray-800 text-white"
                >
                  +99
                </motion.span>
              </div>

              <div className={cn("text-sm font-bold", grotesque.className)}>
                <p>
                  Trusted by{" "}
                  <span>
                    <TrustedCustomers />
                  </span>
                </p>
                <p>Join them today!</p>
              </div>
            </motion.div>
          </div>

          {/* Menu Button */}
          <motion.div
            variants={fadeUpVariants}
            custom={5}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-6 flex w-[90%] flex-col items-center space-y-4"
          >
            <motion.button className="group z-50 flex w-full items-center justify-center gap-4 rounded-full bg-primary p-3 text-white/90 backdrop-blur-md transition-all duration-300 active:scale-95">
              <UtensilsCrossed className="size-5 transition-transform duration-300 group-hover:rotate-12" />
              <span className="text-lg font-medium uppercase">
                Try Our Delicious Menu
              </span>
            </motion.button>

            <button className="flex w-full items-center justify-center gap-4 rounded-full border-2 border-primary p-3 text-lg font-medium uppercase">
              <Phone className="size-5" />
              Contact Us
            </button>
          </motion.div>

          {/* Right Column - Image Slider */}
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
                    objectFit="cover"
                    loading="lazy"
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

                <div className="relative pt-4">
                  <OrderButton item={todaysSpecials[currentSpecial]} />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
