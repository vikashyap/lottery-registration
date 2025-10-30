import {
  integer,
  pgTable,
  varchar,
  boolean,
  serial,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  phone: varchar({ length: 20 }),
  price: varchar({ length: 100 }),
  isClaimed: boolean().default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adminTable = pgTable("admin", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull().unique(),
  passwordHash: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pricesTable = pgTable("prices", {
  id: serial("id").primaryKey(),
  items: jsonb("items")
    .$type<Array<{ price: string; description?: string; color: string }>>()
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
