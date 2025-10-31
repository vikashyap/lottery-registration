import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { pricesTable, usersTable } from "@/db/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  await db.insert(pricesTable).values({
    items: [
      {
        price: "Kostenloses Training",
        description: "Kostenloses Training",
        color: "red",
      },
      { price: "15% Rabatt", description: "15% Rabatt", color: "red" },
      {
        price: "Keine Anmeldegebühr",
        description: "Keine Anmeldegebühr",
        color: "red",
      },
      { price: "100€ Gutschein", description: "100€ Gutschein", color: "red" },
      { price: "T-Shirt", description: "T-Shirt", color: "red" },
      {
        price: "Ein Monat Training",
        description: "Ein Monat Training",
        color: "red",
      },
    ],
  });

  const prices = await db.select().from(pricesTable);
  console.log("Getting all prices from the database: ", prices);
}

main();
