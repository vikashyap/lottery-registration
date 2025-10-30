"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Ticket, Shirt, Calendar, Percent, Sparkles } from "lucide-react";
import { usePrizeStore } from "@/app/store";
import { toast } from "sonner";
import { PriceItemType } from "@/app/types";
import { updateUserPriceByEmail } from "@/app/actions/user-server";
import { IconMap } from "@/consts";
import { sendPrizeEmail } from "@/app/actions/send-email";

interface Props {
  prices?: PriceItemType[];
}

export function PrizeWheel(props: Props) {
  const { prices } = props;
  const email = usePrizeStore.getState().userEmail;
  const name = usePrizeStore.getState().userName;
  const prizeList =
    prices?.map((price, index) => ({
      id: index + 1,
      name: price.price,
      description: price.description || "Gift",
      color: `hsl(${(index * 360) / prices.length}, 70%, 50%)`,
    })) || [];

  const wonPrize = usePrizeStore()?.wonPrize;
  const setWonPrize = usePrizeStore()?.setWonPrize;
  const isRegistered = usePrizeStore()?.isRegistered;
  const disabled = !isRegistered;

  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const onPrizeWon = async (prize: string) => {
    console.log("Prize won:", prize);
    try {
      await updateUserPriceByEmail(email, prize);
      setWonPrize(prize);
      await sendPrizeEmail({
        userEmail: email,
        userName: name,
        prizeName: prize,
        prizeColor: `hsl(${(Math.random() * 360) / Math.random()}, 70%, 50%)`,
      });
      toast.success(
        `Herzlichen Glückwunsch! Sie haben ${prize} gewonnen! Wir haben Ihnen eine E-Mail mit den Details Ihres Preises gesendet.`,
        {
          style: {
            background: "#10b981",
            color: "white",
            border: "none",
          },
          duration: 6000,
        }
      );
    } catch (error) {
      console.error("[v0] Error saving prize:", error);
    }
  };

  const handleSpin = async () => {
    if (isSpinning || disabled) return;

    setIsSpinning(true);
    const randomRotation = 1800 + Math.random() * 1800; // 5-10 full rotations
    const finalRotation = rotation + randomRotation;
    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);

      const normalizedRotation = finalRotation % 360;
      const segmentAngle = 360 / prizeList.length; // 60 degrees per segment
      const prizeIndex =
        Math.floor((360 - normalizedRotation) / segmentAngle) %
        prizeList.length;
      const wonPrizeName = prizeList[prizeIndex].name;
      onPrizeWon(wonPrizeName);
    }, 4000);
  };

  const createWheelSegments = () => {
    const segments = [];
    const segmentAngle = 360 / prizeList.length;
    const radius = 200;
    const centerX = 200;
    const centerY = 200;

    for (let i = 0; i < prizeList.length; i++) {
      const startAngle = (segmentAngle * i - 90) * (Math.PI / 180);
      const endAngle = (segmentAngle * (i + 1) - 90) * (Math.PI / 180);

      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);
      const x2 = centerX + radius * Math.cos(endAngle);
      const y2 = centerY + radius * Math.sin(endAngle);

      const largeArcFlag = segmentAngle > 180 ? 1 : 0;

      const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

      const textAngle = segmentAngle * i + segmentAngle / 2 - 90;
      const textRadius = radius * 0.65;
      const textX =
        centerX + textRadius * Math.cos((textAngle * Math.PI) / 180);
      const textY =
        centerY + textRadius * Math.sin((textAngle * Math.PI) / 180);

      const Icon = IconMap[prizeList[i].description!] || Gift;

      segments.push(
        <g key={prizeList[i].id}>
          <path
            d={pathData}
            fill={prizeList[i].color}
            stroke="white"
            strokeWidth="3"
          />
          <g
            transform={`translate(${textX}, ${textY}) rotate(${
              textAngle + 90
            })`}
          >
            <foreignObject x="-30" y="-30" width="60" height="60">
              <div className="flex flex-col items-center justify-center h-full">
                <Icon className="w-6 h-6 text-white drop-shadow-lg" />
                <span className="text-white font-bold text-[10px] drop-shadow-lg text-center mt-1 leading-tight">
                  {prizeList[i].name.split(" ").slice(0, 2).join(" ")}
                </span>
              </div>
            </foreignObject>
          </g>
        </g>
      );
    }

    return segments;
  };

  return (
    <Card className="p-6 bg-black/15 backdrop-blur-2xl border-white/30 shadow-2xl shadow-black/50 w-full h-full flex flex-col">
      <div className="space-y-6 flex-1 flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white drop-shadow-lg">
            {wonPrize ? "Ihr Gewinn" : "Glücksrad"}
          </h2>
          <p className="text-sm md:text-base text-white drop-shadow-md text-pretty">
            {wonPrize
              ? `Herzlichen Glückwunsch! Sie haben ${wonPrize} gewonnen!`
              : disabled
                ? "Registrieren Sie sich, um zu spielen!"
                : "Drehen Sie das Rad und gewinnen Sie tolle Preise!"}
          </p>
        </div>

        <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
          {/* Outer glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 opacity-30 blur-3xl animate-pulse" />

          {/* Pointer arrow at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 z-20">
            <div className="relative">
              <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[36px] border-t-white drop-shadow-2xl" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[30px] border-t-red-500" />
            </div>
          </div>

          {/* Spinning wheel SVG */}
          <div className="relative w-full h-full">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full transition-transform duration-[4000ms] ease-out drop-shadow-2xl"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {/* Outer border circle */}
              <circle
                cx="200"
                cy="200"
                r="200"
                fill="none"
                stroke="white"
                strokeWidth="8"
              />

              {/* Wheel segments */}
              {createWheelSegments()}

              {/* Center circle for button */}
              <circle cx="200" cy="200" r="50" fill="white" />
            </svg>

            {/* Center spin button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                onClick={handleSpin}
                disabled={isSpinning || disabled || wonPrize !== null}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 hover:from-yellow-300 hover:via-amber-400 hover:to-orange-400 shadow-2xl border-4 border-white disabled:opacity-50 transition-all hover:scale-110 active:scale-95"
              >
                <div className="flex flex-col items-center gap-1">
                  <Sparkles className="w-8 h-8 text-white animate-pulse" />
                  <span className="text-white font-bold text-sm drop-shadow-lg">
                    {wonPrize ? "FERTIG" : isSpinning ? "..." : "DREH!"}
                  </span>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {wonPrize ? (
          <div className="text-center">
            <div className="inline-block px-6 py-3 rounded-full text-xl font-bold text-white shadow-2xl bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 animate-pulse">
              {wonPrize}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xs text-white/80 drop-shadow-md mb-2">
              Mögliche Gewinne:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {prizeList.map((prize) => (
                <div
                  key={prize.id}
                  className="px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg"
                  style={{ backgroundColor: prize.color }}
                >
                  {prize.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
