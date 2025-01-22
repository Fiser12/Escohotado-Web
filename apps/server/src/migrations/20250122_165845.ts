import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "articulos_page" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "videos_page" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DROP TABLE "home_page_hero_buttons" CASCADE;
  DROP TABLE "home_page_blocks_grid_cards" CASCADE;
  DROP TABLE "home_page_rels" CASCADE;
  ALTER TABLE "video" ADD COLUMN "content" jsonb;
  ALTER TABLE "home_page" ADD COLUMN "content" jsonb NOT NULL;
  ALTER TABLE "home_page" DROP COLUMN IF EXISTS "hero_description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "home_page_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_page_blocks_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"grid_cards_id" uuid NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "home_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"article_web_id" uuid,
  	"article_pdf_id" uuid,
  	"book_id" uuid,
  	"video_id" uuid
  );
  
  DROP TABLE "articulos_page" CASCADE;
  DROP TABLE "videos_page" CASCADE;
  ALTER TABLE "home_page" ADD COLUMN "hero_description" varchar;
  DO $$ BEGIN
   ALTER TABLE "home_page_hero_buttons" ADD CONSTRAINT "home_page_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page_blocks_grid_cards" ADD CONSTRAINT "home_page_blocks_grid_cards_grid_cards_id_ui_grid_cards_id_fk" FOREIGN KEY ("grid_cards_id") REFERENCES "public"."ui_grid_cards"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page_blocks_grid_cards" ADD CONSTRAINT "home_page_blocks_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_article_web_fk" FOREIGN KEY ("article_web_id") REFERENCES "public"."article_web"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_article_pdf_fk" FOREIGN KEY ("article_pdf_id") REFERENCES "public"."article_pdf"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_book_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_video_fk" FOREIGN KEY ("video_id") REFERENCES "public"."video"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "home_page_hero_buttons_order_idx" ON "home_page_hero_buttons" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_page_hero_buttons_parent_id_idx" ON "home_page_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_page_blocks_grid_cards_order_idx" ON "home_page_blocks_grid_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_page_blocks_grid_cards_parent_id_idx" ON "home_page_blocks_grid_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_page_blocks_grid_cards_path_idx" ON "home_page_blocks_grid_cards" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "home_page_blocks_grid_cards_grid_cards_idx" ON "home_page_blocks_grid_cards" USING btree ("grid_cards_id");
  CREATE INDEX IF NOT EXISTS "home_page_rels_order_idx" ON "home_page_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "home_page_rels_parent_idx" ON "home_page_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "home_page_rels_path_idx" ON "home_page_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "home_page_rels_article_web_id_idx" ON "home_page_rels" USING btree ("article_web_id");
  CREATE INDEX IF NOT EXISTS "home_page_rels_article_pdf_id_idx" ON "home_page_rels" USING btree ("article_pdf_id");
  CREATE INDEX IF NOT EXISTS "home_page_rels_book_id_idx" ON "home_page_rels" USING btree ("book_id");
  CREATE INDEX IF NOT EXISTS "home_page_rels_video_id_idx" ON "home_page_rels" USING btree ("video_id");
  ALTER TABLE "video" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "home_page" DROP COLUMN IF EXISTS "content";`)
}
