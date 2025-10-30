"use client";
import { motion } from "framer-motion";
import { PrizeClaim } from "./prize-claim";
import { usePrizeStore } from "@/app/store";

export function WonThePrize() {
  const userEmail = usePrizeStore()?.userEmail;
  const wonPrize = usePrizeStore()?.wonPrize;
  if (!wonPrize) {
    return null;
  }
  return (
    <motion.div
      key="prize-claim"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6 md:mb-8">
        <div className="inline-block backdrop-blur-md bg-black/45 px-4 md:px-6 py-3 md:py-4 rounded-2xl border border-white/30">
          <img
            src="https://cdn.prod.website-files.com/683b51dd412f8269a3d25bc1/683b577fbcb1b49516dc881d_sjmt-logo.svg"
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
            className="text-xs text-white/90"
            style={{
              textShadow: "0 0 15px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            Your authentic Muay Thai gym in Berlin
          </p>
        </div>
      </div>

      {wonPrize && <PrizeClaim prize={wonPrize} userEmail={userEmail} />}
    </motion.div>
  );
}
