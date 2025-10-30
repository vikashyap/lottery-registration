"use client";

import type React from "react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Mail, User, Phone } from "lucide-react";
import { useState } from "react";
import * as z from "zod";
import { toast } from "sonner";
import { usePrizeStore } from "@/app/store";
import { UserInsert } from "@/app/types";
import { insertUser, isEmailRegistered } from "@/app/actions";

const registrationSchema: z.ZodType<UserInsert> = z.object({
  name: z
    .string()
    .min(2, "Name muss mindestens 2 Zeichen lang sein")
    .max(100, "Name darf maximal 100 Zeichen lang sein"),
  email: z
    .email("Bitte geben Sie eine gültige E-Mail-Adresse ein")
    .min(1, "E-Mail-Adresse ist erforderlich"),
  phone: z
    .string()
    .min(1, "Telefonnummer ist erforderlich")
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
      "Bitte geben Sie eine gültige Telefonnummer ein"
    ),
  terms: z.boolean().refine((val) => val === true, {
    message: "Sie müssen die Teilnahmebedingungen akzeptieren",
  }),
});

export function RegistrationForm() {
  const setIsRegistered = usePrizeStore()?.setIsRegistered;
  const setUserEmail = usePrizeStore()?.setUserEmail;
  const setUserName = usePrizeStore()?.setUserName;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    terms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onRegistrationComplete = (formData: {
    name: string;
    email: string;
    phone: string;
  }) => {
    console.log("Registration form data:", formData);

    setUserEmail(formData.email);
    setUserName(formData.name);

    toast.success(
      "Danke für Ihre Registrierung! Drehen Sie das Rad und gewinnen Sie tolle Preise!",
      {
        style: {
          background: "#f59e0b",
          color: "white",
          border: "none",
        },
        duration: 4000,
      }
    );

    setIsRegistered(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate with Zod
      const validatedData = registrationSchema.parse(formData);

      // Check if email is already registered - call server action (or API route)
      const alreadyRegistered = await isEmailRegistered(validatedData.email);
      if (alreadyRegistered) {
        setErrors({ email: "Diese E-Mail-Adresse ist bereits registriert." });
        setIsSubmitting(false);
        return;
      }

      await insertUser({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone!,
        price: validatedData.price!,
      });

      // If validation passes, call the callback
      onRegistrationComplete({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone!,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          const key = err.path && err.path.length > 0 ? err.path[0] : undefined;
          if (key !== undefined) {
            newErrors[String(key)] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6 bg-black/15 backdrop-blur-2xl border-white/30 shadow-2xl shadow-black/50 w-full h-full flex flex-col">
      <div className="space-y-6 flex-1 flex flex-col">
        <div className="text-center lg:text-left">
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-white drop-shadow-lg">
            Jetzt registrieren
          </h2>
          <p className="text-sm text-white drop-shadow-md text-pretty">
            Füllen Sie das Formular aus und sichern Sie sich Ihre Chance auf
            tolle Preise
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 flex-1 flex flex-col"
        >
          <div className="space-y-5 flex-1">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-white font-medium drop-shadow-md text-sm">
                Vollständiger Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
                <Input
                  placeholder="Max Mustermann"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>
              {errors.name && (
                <p className="text-red-300 text-xs drop-shadow-md">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-white font-medium drop-shadow-md text-sm">
                E-Mail-Adresse
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
                <Input
                  type="email"
                  placeholder="max@beispiel.de"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>
              {errors.email && (
                <p className="text-red-300 text-xs drop-shadow-md">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="text-white font-medium drop-shadow-md text-sm">
                Telefonnummer
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
                <Input
                  type="tel"
                  placeholder="+49 123 456789"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>
              {errors.phone && (
                <p className="text-red-300 text-xs drop-shadow-md">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <Checkbox
                checked={formData.terms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, terms: checked === true })
                }
                className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black mt-1"
              />
              <div className="space-y-1">
                <label className="text-sm text-white/90 leading-relaxed cursor-pointer drop-shadow-md font-normal">
                  Ich akzeptiere die Teilnahmebedingungen und stimme der
                  Verarbeitung meiner Daten zu. Ich möchte über
                  Gewinnbenachrichtigungen per E-Mail informiert werden.
                </label>
                {errors.terms && (
                  <p className="text-red-300 text-xs drop-shadow-md">
                    {errors.terms}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-white/90 font-semibold py-6 text-lg cursor-pointer "
            disabled={isSubmitting}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Jetzt am Glücksrad drehen
          </Button>
        </form>

        <div className="pt-4 border-t border-white/20">
          <p className="text-xs text-white/80 text-center text-pretty drop-shadow-md">
            Nach der Registrierung erhalten Sie sofort Zugang zum Glücksrad.
            Alle Teilnehmer haben die gleiche Gewinnchance. Viel Glück!
          </p>
        </div>
      </div>
    </Card>
  );
}
