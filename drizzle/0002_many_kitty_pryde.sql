ALTER TABLE "admin" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "prices" ADD COLUMN "items" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "prices" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "prices" DROP COLUMN "price";--> statement-breakpoint
ALTER TABLE "prices" DROP COLUMN "description";