"use client";
import { usePrizeStore } from "@/app/store";
import { motion } from "framer-motion";
import { PrizeWheel } from "./prize-wheel";
import { RegistrationForm } from "./registration-form";
import { Suspense } from "react";
import { MemberType, PriceItemType } from "@/app/types";

interface Props {
  prices: PriceItemType[];
  members: MemberType[];
}

export function Registration({ prices, members }: Props) {
  const isRegistered = usePrizeStore()?.isRegistered;
  if (isRegistered) {
    return null;
  }
  return (
    <motion.div
      key="registration"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
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
              Drehen & Gewinnen!
            </h1>
            <p
              className="text-sm md:text-base text-white max-w-2xl mx-auto text-pretty font-medium"
              style={{
                textShadow:
                  "0 0 20px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,1)",
              }}
            >
              Registrieren Sie sich jetzt und drehen Sie das Glücksrad für Ihre
              Chance auf tolle Preise
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        {/* Prize Wheel */}
        <div className="order-2 lg:order-1 flex">
          <Suspense>
            <PrizeWheel prices={prices} />
          </Suspense>
        </div>

        {/* Registration Form */}
        <div className="order-1 lg:order-2 flex">
          <RegistrationForm members={members} />
        </div>
      </div>
    </motion.div>
  );
}
