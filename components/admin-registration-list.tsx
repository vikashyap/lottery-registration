"use client";

import { motion } from "framer-motion";
import {
  Gift,
  Calendar,
  Percent,
  Ticket,
  Shirt,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  User,
  LogOut,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { logOut } from "@/app/actions/logout";
import { PriceItemType, UserType } from "@/app/types";
import { IconMap } from "@/consts";

// Mock data for registered users
const registrations = [
  {
    id: 1,
    name: "Max Mustermann",
    email: "max.mustermann@example.com",
    phone: "+49 123 456789",
    prize: "Kostenloses Training",
    prizeIcon: Gift,
    prizeColor: "bg-emerald-500",
    isClaimed: true,
    registeredAt: "2025-01-28 14:30",
  },
  {
    id: 2,
    name: "Anna Schmidt",
    email: "anna.schmidt@example.com",
    phone: "+49 987 654321",
    prize: "15% Rabatt",
    prizeIcon: Percent,
    prizeColor: "bg-blue-500",
    isClaimed: false,
    registeredAt: "2025-01-28 15:45",
  },
  {
    id: 3,
    name: "Thomas Weber",
    email: "thomas.weber@example.com",
    phone: "+49 555 123456",
    prize: "Ein Monat Training",
    prizeIcon: Calendar,
    prizeColor: "bg-indigo-500",
    isClaimed: true,
    registeredAt: "2025-01-28 16:20",
  },
  {
    id: 4,
    name: "Sarah Müller",
    email: "sarah.mueller@example.com",
    phone: "+49 777 888999",
    prize: "T-Shirt",
    prizeIcon: Shirt,
    prizeColor: "bg-red-500",
    isClaimed: false,
    registeredAt: "2025-01-28 17:10",
  },
  {
    id: 5,
    name: "Michael Fischer",
    email: "michael.fischer@example.com",
    phone: "+49 333 444555",
    prize: "100€ Gutschein",
    prizeIcon: Ticket,
    prizeColor: "bg-amber-500",
    isClaimed: true,
    registeredAt: "2025-01-28 18:00",
  },
  {
    id: 6,
    name: "Julia Becker",
    email: "julia.becker@example.com",
    phone: "+49 666 777888",
    prize: "Keine Anmeldegebühr",
    prizeIcon: Ticket,
    prizeColor: "bg-purple-500",
    isClaimed: false,
    registeredAt: "2025-01-28 19:15",
  },
];

export default function AdminRegistrationList({
  users,
  prices,
}: {
  users: UserType[];
  prices: PriceItemType[];
}) {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "claimed" | "unclaimed"
  >("all");

  const registrations = users.map((user, index) => {
    const iconString = prices.find((f) => f.price === user.price)?.description;
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      prize: user.price,
      prizeIcon: IconMap[iconString!] || Gift,
      prizeColor: `hsl(${(index * 360) / users.length}, 70%, 50%)`,
      isClaimed: user.isClaimed,
      registeredAt: user.createdAt.toISOString().slice(0, 16).replace("T", " "),
    };
  });

  const totalRegistrations = registrations.length;
  const claimedCount = registrations.filter((r) => r.isClaimed).length;
  const unclaimedCount = totalRegistrations - claimedCount;

  const filteredRegistrations = registrations.filter((registration) => {
    if (activeFilter === "claimed") return registration.isClaimed;
    if (activeFilter === "unclaimed") return !registration.isClaimed;
    return true;
  });

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
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            {/* Header */}
            <div className="backdrop-blur-xl bg-black/50 rounded-2xl border border-white/30 p-6 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Admin Dashboard
                  </h1>
                  <p className="text-white/80">
                    Registrierte Teilnehmer - Glücksrad Gewinnspiel
                  </p>
                </div>
                <Button
                  onClick={() => {
                    console.log("Logging out...");
                    logOut();
                  }}
                  variant="outline"
                  className="bg-red-500/20 border-red-500/50 text-white hover:bg-red-500/30 hover:border-red-500/70"
                >
                  <LogOut size={16} className="mr-2" />
                  Abmelden
                </Button>
              </div>

              <div className="flex gap-4 mt-6 flex-wrap">
                <button
                  onClick={() => setActiveFilter("claimed")}
                  className={`backdrop-blur-md border rounded-xl px-4 py-2 transition-all hover:scale-105 ${
                    activeFilter === "claimed"
                      ? "bg-emerald-500/40 border-emerald-500/80 ring-2 ring-emerald-500/50"
                      : "bg-emerald-500/20 border-emerald-500/50"
                  }`}
                >
                  <div className="text-emerald-400 text-sm font-medium">
                    Eingelöst
                  </div>
                  <div className="text-white text-2xl font-bold">
                    {claimedCount}
                  </div>
                </button>
                <button
                  onClick={() => setActiveFilter("unclaimed")}
                  className={`backdrop-blur-md border rounded-xl px-4 py-2 transition-all hover:scale-105 ${
                    activeFilter === "unclaimed"
                      ? "bg-amber-500/40 border-amber-500/80 ring-2 ring-amber-500/50"
                      : "bg-amber-500/20 border-amber-500/50"
                  }`}
                >
                  <div className="text-amber-400 text-sm font-medium">
                    Ausstehend
                  </div>
                  <div className="text-white text-2xl font-bold">
                    {unclaimedCount}
                  </div>
                </button>
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`backdrop-blur-md border rounded-xl px-4 py-2 transition-all hover:scale-105 ${
                    activeFilter === "all"
                      ? "bg-blue-500/40 border-blue-500/80 ring-2 ring-blue-500/50"
                      : "bg-blue-500/20 border-blue-500/50"
                  }`}
                >
                  <div className="text-blue-400 text-sm font-medium">
                    Gesamt
                  </div>
                  <div className="text-white text-2xl font-bold">
                    {totalRegistrations}
                  </div>
                </button>
              </div>
            </div>

            {/* Registration Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredRegistrations.map((registration, index) => {
                const PrizeIcon = registration.prizeIcon;

                return (
                  <motion.div
                    key={registration.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => {
                      window.location.href = `/reward?email=${encodeURIComponent(
                        registration.email
                      )}`;
                    }}
                    className="backdrop-blur-xl bg-black/40 rounded-xl border border-white/30 overflow-hidden hover:border-white/50 transition-all hover:scale-105 cursor-pointer"
                  >
                    {/* Prize Header with Icon */}
                    <div
                      className={`${registration.prizeColor} p-3 relative overflow-hidden`}
                      style={{ background: registration.prizeColor }}
                    >
                      <div className="absolute top-0 right-0 opacity-20">
                        <PrizeIcon size={60} strokeWidth={1} />
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-1">
                          <PrizeIcon size={20} className="text-white" />
                        </div>
                        <h3 className="text-sm font-bold text-white leading-tight">
                          {registration.prize}
                        </h3>
                      </div>
                    </div>

                    {/* User Information */}
                    <div className="p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <User
                          size={14}
                          className="text-white/60 mt-0.5 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs text-white/60">Name</div>
                          <div className="text-white text-xs font-medium truncate">
                            {registration.name}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Mail
                          size={14}
                          className="text-white/60 mt-0.5 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs text-white/60">E-Mail</div>
                          <div className="text-white text-xs truncate">
                            {registration.email}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Phone
                          size={14}
                          className="text-white/60 mt-0.5 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs text-white/60">Telefon</div>
                          <div className="text-white text-xs">
                            {registration.phone}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="pt-2 border-t border-white/10">
                          <div className="text-xs text-white/60">
                            Registriert
                          </div>
                          <div className="text-white text-xs">
                            {registration.registeredAt}
                          </div>
                        </div>
                        {registration.isClaimed ? (
                          <Badge className="bg-emerald-500/90 text-white border-0 text-xs px-1.5 py-0">
                            <CheckCircle2 size={10} className="mr-0.5" />
                            Eingelöst
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-500/90 text-white border-0 text-xs px-1.5 py-0">
                            <XCircle size={10} className="mr-0.5" />
                            Ausstehend
                          </Badge>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
