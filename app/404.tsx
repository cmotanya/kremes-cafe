"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

function NotFoundPage() {
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();

  const handleButtonClick = () => {
    setIsExiting(true);
    // Delay the actual navigation by 1 second to allow for exit animation
    setTimeout(() => {
      router.back();
    }, 500);
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-gray-900 px-2 text-center text-gray-300 md:px-0">
      <AnimatePresence>
        {!isExiting && (
          <>
            <motion.div
              className="pb-10"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Image src="/404.svg" alt="404" width={400} height={400} />
            </motion.div>
            <motion.div
              className="pb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-xl">
                The page you&apos;re looking for could not be found!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button
                onClick={handleButtonClick}
                className="flex items-center gap-2 rounded-lg bg-gray-800/50 px-4 py-3 text-lg text-gray-400 transition duration-300 ease-in-out hover:bg-gray-800"
              >
                <ArrowLeft /> Go Back
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NotFoundPage;
