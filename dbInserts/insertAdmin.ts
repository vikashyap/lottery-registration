import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { adminTable } from "@/db/schema";
import bcrypt from "bcryptjs";

const db = drizzle(process.env.DATABASE_URL!);

export async function upsertAdminFromEnv() {
  const username = process.env.ADMIN_USERNAME ?? "superjack";
  const rawPassword = "SUPERJACK@2025"; // set this before running
  if (!rawPassword) throw new Error("ADMIN_PASSWORD is required for seeding");

  const passwordHash = await bcrypt.hash(rawPassword, 12);

  const [admin] = await db
    .insert(adminTable)
    .values({ username, passwordHash })
    .onConflictDoUpdate({
      target: adminTable.username,
      set: { passwordHash },
    })
    .returning({ id: adminTable.id, username: adminTable.username });

  console.log("Upserted admin:", admin);

  return admin;
}
upsertAdminFromEnv();
