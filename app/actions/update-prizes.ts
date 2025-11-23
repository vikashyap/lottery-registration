"use server";
import { db } from "@/db";
import { pricesTable } from "@/db/schema";
import { PriceItemType } from "../types";

export async function updatePrizes(updates: { items: PriceItemType[] }) {
  try {
    const user = await db.select().from(pricesTable);
    if (!user.length) throw new Error("prizes not found");
    await db.update(pricesTable).set(updates);
  } catch (err) {
    console.error("update prizes error:", err);
    throw err;
  }
}
