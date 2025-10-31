"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Gift,
  Ticket,
  Shirt,
  Calendar,
  Percent,
  Sparkles,
  MapPin,
  Mail,
  QrCode,
} from "lucide-react";
import QRCode from "qrcode";

const prizeIcons = {
  "Kostenloses Training": Gift,
  "15% Rabatt": Percent,
  "Keine Anmeldegebühr": Ticket,
  "100€ Gutschein": Sparkles,
  "T-Shirt": Shirt,
  "Ein Monat Training": Calendar,
};

const prizeColors = {
  "Kostenloses Training": "#10b981",
  "15% Rabatt": "#3b82f6",
  "Keine Anmeldegebühr": "#a855f7",
  "100€ Gutschein": "#f59e0b",
  "T-Shirt": "#ef4444",
  "Ein Monat Training": "#6366f1",
};

interface PrizeClaimProps {
  prize: string;
  userEmail: string;
}

export function PrizeClaim({ prize, userEmail }: PrizeClaimProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrData = `${window.location.origin}/reward/?email=${encodeURIComponent(userEmail)}`;
        const url = await QRCode.toDataURL(qrData, {
          width: 300,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        });
        setQrCodeUrl(url);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQRCode();
  }, [userEmail]);

  const Icon = prizeIcons[prize as keyof typeof prizeIcons] || Gift;
  const color = prizeColors[prize as keyof typeof prizeColors] || "#10b981";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="p-8 bg-black/15 backdrop-blur-2xl border-white/30 shadow-2xl">
        {/* Congratulations Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
            Herzlichen Glückwunsch!
          </h1>
          <p className="text-xl text-white/90 drop-shadow-lg">
            Sie haben gewonnen:
          </p>
        </motion.div>

        {/* Prize Display with Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.4,
            duration: 0.5,
            type: "spring",
            bounce: 0.5,
          }}
          className="flex flex-col items-center mb-8"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1,
            }}
            className="mb-4"
          >
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center shadow-2xl"
              style={{ backgroundColor: color }}
            >
              <Icon className="w-16 h-16 text-white" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="px-8 py-4 rounded-2xl text-3xl font-bold text-white shadow-2xl"
            style={{ backgroundColor: color }}
          >
            {prize}
          </motion.div>
        </motion.div>

        {/* Email Confirmation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20"
        >
          <div className="flex items-start gap-3 mb-4">
            <Mail className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                QR-Code per E-Mail gesendet!
              </h3>
              <p className="text-white/80 text-sm">
                Wir haben Ihnen einen QR-Code an{" "}
                <span className="font-semibold">{userEmail}</span> gesendet.
                Zeigen Sie diesen QR-Code im Studio vor, um Ihren Preis
                einzulösen.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* QR Code Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-2 mb-4">
              <QrCode className="w-5 h-5 text-white" />
              <h3 className="text-lg font-semibold text-white">Ihr QR-Code</h3>
            </div>
            {qrCodeUrl ? (
              <div className="bg-white p-4 rounded-lg">
                <img
                  src={qrCodeUrl || "/placeholder.svg"}
                  alt="QR Code"
                  className="w-full h-auto"
                />
              </div>
            ) : (
              <div className="bg-white/20 p-4 rounded-lg flex items-center justify-center h-64">
                <p className="text-white">QR-Code wird generiert...</p>
              </div>
            )}
            <p className="text-xs text-white/70 mt-3 text-center">
              Zeigen Sie diesen Code im Studio vor, um Ihren Preis zu erhalten
            </p>
          </motion.div>

          {/* Studio Location Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-white" />
              <h3 className="text-lg font-semibold text-white">
                Besuchen Sie uns
              </h3>
            </div>
            <div className="mb-4">
              <p className="text-white font-semibold mb-2">
                Super Jack Muay Thai
              </p>
              <p className="text-white/80 text-sm mb-4">
                Kommen Sie zu unserem Studio in Berlin, um Ihren Preis
                abzuholen!
              </p>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              >
                <a
                  href="https://maps.app.goo.gl/X5uttU5XCRLx6yxb8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Auf Google Maps öffnen
                </a>
              </Button>
            </div>

            {/* Embedded Map */}
            <div className="rounded-lg overflow-hidden border-2 border-white/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.1234567890123!2d13.404954!3d52.520008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDMxJzEyLjAiTiAxM8KwMjQnMTcuOCJF!5e0!3m2!1sen!2sde!4v1234567890123!5m2!1sen!2sde"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Super Jack Muay Thai Location"
              />
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-6 text-center"
        >
          <p className="text-white/70 text-sm">
            Bitte bringen Sie Ihren QR-Code und einen gültigen Ausweis mit, wenn
            Sie Ihren Preis abholen.
          </p>
        </motion.div>
      </Card>
    </motion.div>
  );
}
