"use server";
import { cookies } from "next/headers";

export async function logOut() {
  try {
    const cookieStore = await cookies();
    console.log("Logging out... ");
    cookieStore.delete("admin_id");
    cookieStore.delete("admin_email");
    console.log("Logged out successfully.");
  } catch (error) {
    console.error("Error logging out:", error);
  }
}
