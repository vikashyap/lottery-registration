ALTER TABLE "users" ADD COLUMN "price" varchar(100);--> statement-breakpoint
ALTER TABLE "admin" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "prices" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "updated_at";