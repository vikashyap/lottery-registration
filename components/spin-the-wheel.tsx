"use client";

import { motion } from "framer-motion";
import { PrizeWheel } from "./prize-wheel";
import { usePrizeStore } from "@/app/store";

import { PriceItemType } from "@/app/types";

interface Props {
  prices: PriceItemType[];
}

export function SpinTheWheel(props: Props) {
  const isRegistered = usePrizeStore()?.isRegistered;
  const wonPrize = usePrizeStore()?.wonPrize;
  if (!isRegistered || wonPrize) {
    return null;
  }
  return (
    <motion.div
      key="wheel"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6 md:mb-8">
        <div className="inline-block backdrop-blur-md bg-black/45 px-4 md:px-6 py-3 md:py-4 rounded-2xl border border-white/30">
          <img
            src="/logo.svg"
            alt="Super Jack Muay Thai Logo"
            className="h-8 md:h-10 mx-auto mb-1"
          />
          <h2
            className="text-lg md:text-xl font-bold text-white mb-0.5"
            style={{
              textShadow:
                "0 0 20px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,1)",
            }}
          >
            SUPER JACK MUAY THAI
          </h2>
          <p
            className="text-xs text-white/90 mb-2"
            style={{
              textShadow: "0 0 15px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            Your authentic Muay Thai gym in Berlin
          </p>
          <div className="border-t border-white/20 pt-2 mt-2">
            <h1
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-balance text-white"
              style={{
                textShadow:
                  "0 0 30px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.7), 0 4px 20px rgba(0,0,0,0.8), 2px 2px 4px rgba(0,0,0,1)",
              }}
            >
              Drehen Sie das Rad!
            </h1>
            <p
              className="text-sm md:text-base text-white max-w-2xl mx-auto text-pretty font-medium"
              style={{
                textShadow:
                  "0 0 20px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,1)",
              }}
            >
              Klicken Sie auf den Button, um das Glücksrad zu drehen und Ihren
              Preis zu gewinnen!
            </p>
          </div>
        </div>
      </div>

      {/* Centered Prize Wheel */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <PrizeWheel prices={props.prices} />
        </div>
      </div>
    </motion.div>
  );
}
