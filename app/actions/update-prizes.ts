"use server";
import { db } from "@/db";
import { pricesTable } from "@/db/schema";
import { PriceItemType } from "../types";
import { revalidateTag, updateTag } from "next/cache";

export async function updatePrizes(updates: { items: PriceItemType[] }) {
  try {
    const user = await db.select().from(pricesTable);
    if (!user.length) throw new Error("prizes not found");
    await db.update(pricesTable).set(updates);
    revalidateTag("cart", "max");
    updateTag("cart");
  } catch (err) {
    console.error("update prizes error:", err);
    throw err;
  }
}
