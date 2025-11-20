import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { membersTable } from "@/db/schema";
import members from "../members.json"; // Adjust path as needed

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  // Transform JSON to the right table shape
  const memberRows = members.map((m: any) => ({
    email: m["E-Mail"],
    status: m["Status"],
    geburtstag: m["Geburtstag"] ? m["Geburtstag"].slice(0, 10) : null,
    nachname: m["Nachname"],
    vorname: m["Vorname"],
  }));

  // Batch insert all rows
  await db.insert(membersTable).values(memberRows);

  // Read back and log
  const allMembers = await db.select().from(membersTable);
  console.log("Getting all members from the database:", allMembers);
}

main();
