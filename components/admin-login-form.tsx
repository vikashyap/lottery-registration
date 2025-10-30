"use client";

import type React from "react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Image from "next/image";
import { adminLogin } from "@/app/actions";

export function AdminLoginForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    // Validation
    const newErrors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      newErrors.username = "Benutzername ist erforderlich";
    }

    if (!password.trim()) {
      newErrors.password = "Passwort ist erforderlich";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    startTransition(async () => {
      try {
        const res = await adminLogin({ username, password });
        toast.success("Erfolgreich angemeldet!", {
          description: "Willkommen zurück, Admin",
        });
        router.push("/admin/dashboard");
      } catch (err) {
        toast.error("Anmeldung fehlgeschlagen", {
          description: "Ungültiger Benutzername oder Passwort",
        });
        setErrors({
          username: "Ungültige Anmeldedaten",
          password: "Ungültige Anmeldedaten",
        });
      } finally {
        setIsLoading(false);
      }
    });

    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center p-4">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/images/hero-background.avif)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo and Branding */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.svg"
              alt="Super Jack Muay Thai Logo"
              width={80}
              height={80}
              className="drop-shadow-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">
            SUPER JACK MUAY THAI
          </h1>
          <p className="text-white/80 mt-2 drop-shadow-md">Admin Portal</p>
        </div>

        {/* Login Form */}
        <div className="backdrop-blur-xl bg-black/40 border border-white/30 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Admin Anmeldung
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white font-medium">
                Benutzername
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-black/30 border-white/30 text-white placeholder:text-white/40 focus:border-white/50"
                  placeholder="admin"
                  disabled={isLoading}
                />
              </div>
              {errors.username && (
                <p className="text-red-400 text-sm">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-medium">
                Passwort
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-black/30 border-white/30 text-white placeholder:text-white/40 focus:border-white/50"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-6 text-lg shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? "Anmelden..." : "Anmelden"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
