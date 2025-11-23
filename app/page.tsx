import { getPrices } from "./actions";
import { AnimatePresence } from "framer-motion";
import { Registration } from "@/components/registration";
import { SpinTheWheel } from "@/components/spin-the-wheel";
import { WonThePrize } from "@/components/won-the-price";
import { getMembers } from "./actions/user";
import { Suspense } from "react";

async function LotteryContent() {
  const prices = await getPrices();
  const members = await getMembers();
  
  return (
    <div className="max-w-7xl mx-auto">
      <AnimatePresence mode="wait">
        <Registration
          prices={prices}
          key="registration"
          members={members}
        />
        <SpinTheWheel key="spin-the-wheel" prices={prices} />
        <WonThePrize key="won-the-prize" />
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/images/hero-background.avif)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-4 md:py-6">
        <Suspense fallback={<div className="text-white text-center p-10">Laden...</div>}>
          <LotteryContent />
        </Suspense>
      </div>
    </main>
  );
}
