"use server";

import { usersTable } from "@/db/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { UserInsert } from "../types";
import { revalidateTag, updateTag } from "next/cache";

const db = drizzle(process.env.DATABASE_URL!);

export async function insertUser(userData: UserInsert) {
  await db.insert(usersTable).values({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    price: userData.price,
  });
}

export async function isEmailRegistered(email: string) {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  return user.length > 0;
}

export async function getUserByEmail(email: string) {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);
  return user[0] ?? null;
}

export async function updateUserPriceByEmail(email: string, price: string) {
  console.log("DB URL present:", !!process.env.DATABASE_URL);
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
    console.log("existing:", user);
    const res = await db
      .update(usersTable)
      .set({ price })
      .where(eq(usersTable.email, email));
    revalidateTag("users", "max");
    updateTag("users");
    console.log("update res:", res);
  } catch (err) {
    console.error("test-db error:", err);
  }
}

export async function updateUserByEmail(
  email: string,
  updates: Partial<{
    price: string;
    name: string;
    phone: string;
    isClaimed: boolean;
  }>
) {
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
    if (!user.length) throw new Error("User not found");
    const res = await db
      .update(usersTable)
      .set(updates)
      .where(eq(usersTable.email, email));
    revalidateTag("users", "max");
    updateTag("users");
  } catch (err) {
    console.error("updateUserByEmail error:", err);
    throw err;
  }
}
