import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "ui_grid_cards_rels" CASCADE;
  DROP TABLE "home_page_rels" CASCADE;
  ALTER TABLE "article_web" DROP COLUMN IF EXISTS "content_html";
  ALTER TABLE "book" DROP COLUMN IF EXISTS "content_html";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "ui_grid_cards_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"article_web_id" uuid,
  	"article_pdf_id" uuid,
  	"book_id" uuid,
  	"video_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "home_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"ui_grid_cards_id" uuid
  );
  
  ALTER TABLE "article_web" ADD COLUMN "content_html" varchar;
  ALTER TABLE "book" ADD COLUMN "content_html" varchar;
  DO $$ BEGIN
   ALTER TABLE "ui_grid_cards_rels" ADD CONSTRAINT "ui_grid_cards_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."ui_grid_cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "ui_grid_cards_rels" ADD CONSTRAINT "ui_grid_cards_rels_article_web_fk" FOREIGN KEY ("article_web_id") REFERENCES "public"."article_web"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "ui_grid_cards_rels" ADD CONSTRAINT "ui_grid_cards_rels_article_pdf_fk" FOREIGN KEY ("article_pdf_id") REFERENCES "public"."article_pdf"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "ui_grid_cards_rels" ADD CONSTRAINT "ui_grid_cards_rels_book_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "ui_grid_cards_rels" ADD CONSTRAINT "ui_grid_cards_rels_video_fk" FOREIGN KEY ("video_id") REFERENCES "public"."video"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_ui_grid_cards_fk" FOREIGN KEY ("ui_grid_cards_id") REFERENCES "public"."ui_grid_cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "ui_grid_cards_rels_order_idx" ON "ui_grid_cards_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "ui_grid_cards_rels_parent_idx" ON "ui_grid_cards_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "ui_grid_cards_rels_path_idx" ON "ui_grid_cards_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "ui_grid_cards_rels_article_web_id_idx" ON "ui_grid_cards_rels" USING btree ("article_web_id");
  CREATE INDEX IF NOT EXISTS "ui_grid_cards_rels_article_pdf_id_idx" ON "ui_grid_cards_rels" USING btree ("article_pdf_id");
  CREATE INDEX IF NOT EXISTS "ui_grid_cards_rels_book_id_idx" ON "ui_grid_cards_rels" USING btree ("book_id");
  CREATE INDEX IF NOT EXISTS "ui_grid_cards_rels_video_id_idx" ON "ui_grid_cards_rels" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "home_page_rels_order_idx" ON "home_page_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "home_page_rels_parent_idx" ON "home_page_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "home_page_rels_path_idx" ON "home_page_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "home_page_rels_ui_grid_cards_id_idx" ON "home_page_rels" USING btree ("ui_grid_cards_id");`)
}
