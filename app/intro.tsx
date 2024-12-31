"use client";

import React, { useState, useEffect } from "react";
import { ImageSlider } from "./components/image-slider";
import { IconArrowRight, IconClock, IconMapPin } from "@tabler/icons-react";
import { cn } from "./utils/cn";
import { FlipWords } from "./components/FlipWord/flip-words";
import Image from "next/image";

const Intro = () => {
  const [isVisible, setIsVisible] = useState(false);
  const images = ["/images/1.jpg", "/images/2.jpg"];
  const customers = [
    "/images/customer1.jpg",
    "/images/customer2.jpg",
    "/images/customer3.jpg",
    "/images/customer4.jpg",
    "/images/customer5.jpg",
  ];

  const features = [
    { icon: IconClock, text: "Open 7AM-10PM" },
    {
      icon: IconMapPin,
      text: (
        <FlipWords
          words={["Nyali Links Road", "Westlands", "Greenwood, Nyali"]}
        />
      ),
    },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <ImageSlider images={images}>
        {/* Overlay gradient */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

        {/* Dynamic light effect */}
        <div className="absolute inset-0 z-30">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-accent opacity-30 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-primary opacity-30 blur-3xl delay-1000" />
        </div>

        <div className="relative z-50 flex h-full w-full flex-col items-center justify-center px-4 text-center">
          {/* Badge */}
          <div
            className={cn(
              "transform transition-all duration-700",
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-20 opacity-0",
            )}
          >
            <span className="mb-8 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
              ⭐️ Voted Best Cafe 2024
            </span>
          </div>

          {/* Main title */}
          <div
            className={cn(
              "transform transition-all duration-700",
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-20 opacity-0",
            )}
          >
            <h1 className="text-balance text-7xl font-bold tracking-tighter text-white md:text-9xl">
              <span className="bg-gradient-to-r from-primary via-white to-accent bg-clip-text text-transparent">
                KREMES
              </span>
              <span className="mt-2 block text-4xl font-medium md:tracking-tight">
                Cafe & Bistro
              </span>
            </h1>
          </div>

          {/* Tagline */}
          <h3
            className={cn(
              "mt-6 transform text-balance text-sm leading-tight text-white transition-all delay-200 duration-700",
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-20 opacity-0",
            )}
          >
            Where every cup tells a story and every dish creates a memory
          </h3>

          {/* Feature Badges */}
          <div
            className={cn(
              "mt-8 flex transform gap-2 overflow-hidden transition-all delay-300 duration-700 md:flex-row md:gap-4",
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-20 opacity-0",
            )}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex w-[11rem] items-center space-x-2 whitespace-nowrap rounded-full bg-white/10 p-2 backdrop-blur-md"
              >
                <feature.icon className="size-5 text-primary" />
                <span className="text-sm font-medium text-white">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className={cn(
              "mt-14 flex w-3/4 transform flex-col items-center gap-4 transition-all delay-300 duration-700 md:w-auto md:flex-row",
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-20 opacity-0",
            )}
          >
            <button className="group relative w-full overflow-hidden rounded-full bg-primary px-6 py-3 text-lg font-medium uppercase transition-all hover:-translate-y-1 hover:shadow-lg md:w-fit">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Order Now
                <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] transition duration-500 ease-out group-hover:translate-x-0" />
            </button>
            <button className="w-full rounded-full border border-white px-6 py-3 text-lg font-medium uppercase text-white backdrop-blur-md md:w-fit">
              Explore Menu
            </button>
          </div>

          {/* Social Proof */}
          <div
            className={cn(
              "mt-16 transform transition-all delay-500 duration-700",
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-20 opacity-0",
            )}
          >
            <div className="flex items-center justify-center gap-4">
              <div className="flex -space-x-3">
                {customers.map((customer, index) => (
                  <Image
                    src={customer}
                    alt={`Happy customer ${index + 1}`}
                    key={index}
                    width={30}
                    height={30}
                    className="size-10 rounded-full border-2 border-white/80 object-cover object-center"
                  />
                ))}
              </div>
              <div className="text-sm text-white/70">
                <p className="font-medium">
                  {" "}
                  Trusted by <span className="text-primary">+1000</span>{" "}
                  customers
                </p>
              </div>
            </div>
          </div>
        </div>
      </ImageSlider>
    </section>
  );
};

export default Intro;
