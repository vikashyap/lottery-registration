import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import "./globals.css";
import { AdminNav } from "@/components/admin-nav";
import { isAdminValid } from "./actions/admin-valid";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SUPER JACK MUAY THAI",
  description: "Your authentic Muay Thai gym in Berlin",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = await isAdminValid();
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {isAdmin && <AdminNav />}
        {children}
        <Analytics />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
