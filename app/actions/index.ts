"use server";

import { pricesTable, usersTable } from "@/db/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { cacheTag } from "next/cache";
import { eq } from "drizzle-orm";
import {
  getUserByEmail,
  getUsers,
  insertUser,
  isEmailRegistered,
} from "./user";
import { adminLogin } from "./admin-login";

const db = drizzle(process.env.DATABASE_URL!);

export async function getPrices() {
  "use cache";
  cacheTag("cart");
  const pricesData = await db
    .select({ items: pricesTable.items })
    .from(pricesTable);
  const prices = pricesData.flatMap((price) => price.items);
  return prices;
}

export { insertUser, isEmailRegistered, getUsers, getUserByEmail, adminLogin };
