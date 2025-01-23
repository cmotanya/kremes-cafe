import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import { outfit, storyImages } from "./utils/lib";
import { cn } from "./utils/cn";

const About = () => {
  return (
    <section className="min-h-screen overflow-hidden py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn("mb-16 space-y-3 text-center", outfit.className)}
        >
          <h1 className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
            Our Story
          </h1>
          <p className="mx-auto text-black/70">
            {" "}
            A journey of culinary excellence since 2017.{" "}
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid gap-10 md:grid-cols-2">
          <motion.div className="space-y-6 text-lg">
            <p>
              What began as a modest café has blossomed into a culinary
              destination where innovation meets tradition. Our journey is
              marked by an unwavering commitment to quality, a passion for
              distinctive flavors, and a deep connection to our community.
            </p>
            <p>
              Each dish we serve tells a story - of carefully sourced
              ingredients, time-honored techniques, and creative inspiration.
              Our team of dedicated chefs brings together global influences
              while celebrating local flavors.
            </p>
          </motion.div>

          {/* Story Images */}
          <div className="relative grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative w-full overflow-hidden">
                <div className={storyImages[0].className}>
                  <Image
                    src={storyImages[0].src}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative w-full overflow-hidden">
                <div className={storyImages[1].className}>
                  <Image
                    src={storyImages[1].src}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
              </div>
            </div>

            <div className="relative w-full overflow-hidden">
              <div className={storyImages[2].className}>
                <Image
                  src={storyImages[2].src}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
