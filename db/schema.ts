import {
  integer,
  pgTable,
  varchar,
  boolean,
  serial,
  timestamp,
  jsonb,
  date,
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
  birthday_items: jsonb("birthday_items")
    .$type<Array<{ price: string; description?: string; color: string }>>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const membersTable = pgTable("members", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  status: varchar("status", { length: 50 }),
  geburtstag: date("geburtstag"), // stores as YYYY-MM-DD
  nachname: varchar("nachname", { length: 100 }),
  vorname: varchar("vorname", { length: 100 }),
});
