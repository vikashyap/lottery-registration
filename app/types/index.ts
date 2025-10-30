import { pricesTable, usersTable } from "@/db/schema";

export type PricesType = typeof pricesTable.$inferSelect; // { id: number; items: Array<{ price: string; description?: string }>; createdAt: Date }
export type PriceItemType = PricesType["items"][number]; // { price: string; description?: string }
export type UserInsert = typeof usersTable.$inferInsert;
export type UserType = typeof usersTable.$inferSelect;
