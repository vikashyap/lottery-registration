"use server";
import { db } from "@/db";
import { pricesTable } from "@/db/schema";
import { PriceItemType } from "../types";

export async function updatePrizes(
  updates: { items: PriceItemType[] },
  type: "standard" | "birthday" = "standard"
) {
  try {
    const user = await db.select().from(pricesTable);
    if (!user.length) throw new Error("prizes not found");
    
    // Update the correct field based on type
    const updateData = type === "birthday" 
      ? { birthday_items: updates.items }
      : { items: updates.items };
    
    await db.update(pricesTable).set(updateData);
  } catch (err) {
    console.error("update prizes error:", err);
    throw err;
  }
}
