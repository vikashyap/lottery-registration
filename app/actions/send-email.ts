"use server";

import { Resend } from "resend";
import QRCode from "qrcode";
import PrizeNotificationEmail from "@/components/prize-notification";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface SendPrizeEmailParams {
  userEmail: string;
  userName: string;
  prizeName: string;
  prizeColor: string;
}

export async function sendPrizeEmail({
  userEmail,
  userName,
  prizeName,
  prizeColor,
}: SendPrizeEmailParams) {
  try {
    if (!resend) {
      console.log("Resend API key not configured. Email not sent.");
      return {
        success: false,
        error:
          "Resend API key not configured. Please add RESEND_API_KEY to environment variables.",
      };
    }

    // Generate QR code as data URL
    const rewardUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reward?email=${encodeURIComponent(userEmail)}`;
    console.log("reward url", rewardUrl);
    const qrCodeDataUrl = await QRCode.toDataURL(rewardUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Super Jack Muay Thai <onboarding@resend.dev>", // Change this to your verified domain
      to: [userEmail],
      subject: `🎉 Herzlichen Glückwunsch! Sie haben ${prizeName} gewonnen!`,
      react: PrizeNotificationEmail({
        userName,
        prizeName,
        prizeColor,
        qrCodeDataUrl,
        rewardUrl,
      }),
    });

    if (error) {
      console.error("Error sending email:", error);
      return { success: false, error: error.message };
    }

    console.log("Email sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Error in sendPrizeEmail:", error);
    return { success: false, error: String(error) };
  }
}
