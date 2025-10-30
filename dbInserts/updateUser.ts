// scripts/test-db.ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { updateUserPriceByEmail } from "../app/actions/user-server";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const email = "kashyapvikas20+2@gmail.com";
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
      .set({ price: "15% Rabatt" })
      .where(eq(usersTable.email, email));
    console.log("update res:", res);
  } catch (err) {
    console.error("test-db error:", err);
  }
}

main();
