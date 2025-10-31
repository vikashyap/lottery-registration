"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { motion } from "framer-motion";
import { Sparkles, Gift, QrCodeIcon } from "lucide-react";
import { PriceItemType } from "../types";
import { IconMap } from "@/consts";

interface Props {
  prizes: PriceItemType[];
}

export function ScanClientPage(props: Props) {
  const { prizes } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrGenerated, setQrGenerated] = useState(false);

  useEffect(() => {
    const generateQR = async () => {
      if (canvasRef.current) {
        try {
          // Generate QR code for the main page
          const url = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}`;
          typeof window !== "undefined" ? window.location.origin : "/";
          await QRCode.toCanvas(canvasRef.current, url, {
            width: 240,
            margin: 2,
            color: {
              dark: "#000000",
              light: "#FFFFFF",
            },
            errorCorrectionLevel: "H",
          });
          setQrGenerated(true);
        } catch (error) {
          console.error("Error generating QR code:", error);
        }
      }
    };

    generateQR();
  }, []);

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
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-2xl"
        >
          {/* Main Card - Reduced padding from p-8 md:p-12 to p-6 md:p-8 */}
          <div className="backdrop-blur-2xl bg-white/10 rounded-3xl border border-white/20 p-6 md:p-8 shadow-2xl relative overflow-hidden">
            {/* Glass shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>

            <div className="relative z-10">
              {/* Logo - Reduced spacing from mb-8 to mb-5 and logo size */}
              <div className="text-center mb-5">
                <img
                  src="https://cdn.prod.website-files.com/683b51dd412f8269a3d25bc1/683b577fbcb1b49516dc881d_sjmt-logo.svg"
                  alt="Super Jack Muay Thai Logo"
                  className="h-10 md:h-12 mx-auto mb-3"
                />
                <h2
                  className="text-lg md:text-xl font-bold text-white mb-1"
                  style={{
                    textShadow:
                      "0 0 20px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,1)",
                  }}
                >
                  SUPER JACK MUAY THAI
                </h2>
                <p
                  className="text-xs md:text-sm text-white/90"
                  style={{
                    textShadow:
                      "0 0 15px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8)",
                  }}
                >
                  Your authentic Muay Thai gym in Berlin
                </p>
              </div>

              {/* Divider - Reduced spacing from mb-8 to mb-5 */}
              <div className="border-t border-white/20 mb-5"></div>

              {/* Main Heading - Reduced spacing from mb-8 to mb-5 */}
              <div className="text-center mb-5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center gap-2 mb-3"
                >
                  <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-amber-400" />
                  <h1
                    className="text-2xl md:text-4xl font-bold text-white text-balance"
                    style={{
                      textShadow:
                        "0 0 30px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.7), 0 4px 20px rgba(0,0,0,0.8), 2px 2px 4px rgba(0,0,0,1)",
                    }}
                  >
                    Scannen & Gewinnen!
                  </h1>
                  <Gift className="w-6 h-6 md:w-8 md:h-8 text-amber-400" />
                </motion.div>

                <p
                  className="text-sm md:text-base text-white max-w-xl mx-auto text-pretty font-medium leading-relaxed"
                  style={{
                    textShadow:
                      "0 0 20px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,1)",
                  }}
                >
                  Scannen Sie den QR-Code mit Ihrem Smartphone und drehen Sie
                  das Glücksrad für Ihre Chance auf tolle Preise!
                </p>
              </div>

              {/* QR Code - Reduced gap from gap-6 to gap-4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: qrGenerated ? 1 : 0.5, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-col items-center gap-4"
              >
                {/* QR Code Container - Reduced padding from p-6 to p-4 */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white p-4 rounded-2xl shadow-2xl">
                    <canvas ref={canvasRef} className="block" />
                  </div>
                </div>

                {/* Instructions */}
                <div className="flex items-center gap-2 text-white/90">
                  <QrCodeIcon className="w-5 h-5 text-amber-400" />
                  <p
                    className="text-xs md:text-sm font-medium"
                    style={{
                      textShadow:
                        "0 0 15px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8)",
                    }}
                  >
                    Öffnen Sie die Kamera-App und scannen Sie den Code
                  </p>
                </div>
              </motion.div>

              {/* Prize List - Reduced spacing from mt-10 pt-8 to mt-6 pt-6 and mb-4 to mb-3 */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <h3
                  className="text-base md:text-lg font-bold text-white text-center mb-3"
                  style={{
                    textShadow:
                      "0 0 20px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8)",
                  }}
                >
                  Mögliche Gewinne:
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {prizes.map((prize, idx) => {
                    const Icon = IconMap[prize.description!] || Gift;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + idx * 0.1 }}
                        style={{ backgroundColor: prize.color }}
                        className={`${prize.color} text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {prize.price}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Text - Reduced spacing from mt-6 to mt-4 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center text-white/70 text-xs md:text-sm mt-4"
            style={{
              textShadow: "0 0 15px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            Jeder Teilnehmer hat die gleiche Gewinnchance. Viel Glück!
          </motion.p>
        </motion.div>
      </div>
    </main>
  );
}
