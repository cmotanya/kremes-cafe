"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PhoneCall, UtensilsCrossed } from "lucide-react";
import FeatureCard from "./components/featureCard";
import FlipText from "./components/flipText";
import TrustedCustomers from "./components/trustedCustomers";
import {
  playfair,
  cormorant,
  grotesque,
  customers,
  features,
} from "../lib/lib";
import Link from "next/link";
// import DishOfTheDay from "./components/dishOfTheDay";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DishOfTheDay from "./components/dishOfTheDay";
// import Header from "./header";

const HomePage = () => {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <>
      {/* <Header /> */}
      <section id="#home" className="relative h-dvh w-full p-5">
        {/* Main Content - Centered */}
        <div className="relative z-20 h-full items-center justify-center md:mt-0 md:flex">
          <div className="container mx-auto grid gap-4 md:grid-cols-2">
            {/* Left Column - Main Text */}
            <div>
              <div className="flex flex-col items-center justify-center space-y-8 text-center">
                {/* Cafe Name */}
                <motion.div
                  variants={fadeUpVariants}
                  custom={0}
                  initial="hidden"
                  animate="visible"
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
                <div
                  className={cn(
                    "flex flex-wrap items-center justify-center gap-4",
                    grotesque.className,
                  )}
                >
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

              {/*  Button */}
              <motion.div
                variants={fadeUpVariants}
                custom={5}
                initial="hidden"
                animate="visible"
                className="mx-auto mt-8 flex w-full flex-col items-center justify-between gap-4"
              >
                <Button
                  asChild
                  className="w-full rounded-full bg-primary py-6 text-lg font-medium uppercase text-white transition-transform active:scale-95"
                >
                  <Link href={"/menu"}>
                    {" "}
                    <UtensilsCrossed /> Our Menu
                  </Link>
                </Button>

                <Button
                  asChild
                  variant={"outline"}
                  className="w-full rounded-full border-2 border-gray-200 py-6 text-lg font-medium uppercase transition-transform active:scale-95"
                >
                  <Link href="/contact">
                    <PhoneCall /> Contact Us
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Right Column - Image Slider */}
            <DishOfTheDay />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
