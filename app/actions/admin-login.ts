"use server";
import { eq } from "drizzle-orm";
import { adminTable } from "@/db/schema";
import { drizzle } from "drizzle-orm/neon-http";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const db = drizzle(process.env.DATABASE_URL!);

export async function adminLogin({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  // Fetch admin
  const [admin] = await db
    .select()
    .from(adminTable)
    .where(eq(adminTable.username, username))
    .limit(1);

  if (!admin) return { error: "Invalid credentials" };

  // Verify password
  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid) return { error: "Invalid credentials" };

  // Set cookie in a Server Action or Route Handler only
  const cookieStore = await cookies();
  cookieStore.set("admin_id", String(admin.id), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return { id: admin.id, username: admin.username };
}
