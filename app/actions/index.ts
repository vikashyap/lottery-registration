"use server";

import { pricesTable, usersTable } from "@/db/schema";
import { drizzle } from "drizzle-orm/neon-http";
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
  const pricesData = await db
    .select({ items: pricesTable.items, birthday_items: pricesTable.birthday_items })
    .from(pricesTable);
  
  if (!pricesData.length) {
    return { standard: [], birthday: [] };
  }
  
  const standard = pricesData[0].items || [];
  const birthday = pricesData[0].birthday_items || [];
  
  return { standard, birthday };
}

export { insertUser, isEmailRegistered, getUsers, getUserByEmail, adminLogin };
