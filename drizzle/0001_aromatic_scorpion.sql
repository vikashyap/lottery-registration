ALTER TABLE "prices" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "prices" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "prices" ALTER COLUMN "price" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "prices" ALTER COLUMN "description" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "admin" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "prices" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;