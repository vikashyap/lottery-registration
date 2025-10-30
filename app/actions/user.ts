import { usersTable } from "@/db/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { cacheTag, revalidateTag, updateTag } from "next/cache";
import { eq } from "drizzle-orm";
import { UserInsert } from "../types";

const db = drizzle(process.env.DATABASE_URL!);

async function insertUser(userData: UserInsert) {
  "use server";
  await db.insert(usersTable).values({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    price: userData.price,
  });
  revalidateTag("users", "max");
  updateTag("users");
}

async function isEmailRegistered(email: string) {
  "use server";
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  return user.length > 0;
}

async function getUsers() {
  "use cache";
  cacheTag("users", "max");
  return db.select().from(usersTable);
}

async function getUserByEmail(email: string) {
  "use server";
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);
  return user[0] ?? null;
}

async function updateUserPriceByEmail(email: string, price: string) {
  "use server";
  await db.update(usersTable).set({ price }).where(eq(usersTable.email, email));
}

export {
  insertUser,
  isEmailRegistered,
  getUsers,
  getUserByEmail,
  updateUserPriceByEmail,
};
