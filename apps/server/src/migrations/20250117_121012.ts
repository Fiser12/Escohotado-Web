import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "home_page_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_page_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tailwind_class_names" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "home_page" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"hero_description" varchar,
  	"tailwind_grid_class_names" varchar DEFAULT 'grid-cols-1 md:grid-cols-4',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
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
  
  CREATE TABLE IF NOT EXISTS "_home_page_v_version_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar NOT NULL,
  	"link" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_home_page_v_version_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tailwind_class_names" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_home_page_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_hero_description" varchar,
  	"version_tailwind_grid_class_names" varchar DEFAULT 'grid-cols-1 md:grid-cols-4',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_home_page_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"article_web_id" uuid,
  	"article_pdf_id" uuid,
  	"book_id" uuid,
  	"video_id" uuid
  );
  
  DO $$ BEGIN
   ALTER TABLE "home_page_hero_buttons" ADD CONSTRAINT "home_page_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page_cards" ADD CONSTRAINT "home_page_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
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
  
  DO $$ BEGIN
   ALTER TABLE "_home_page_v_version_hero_buttons" ADD CONSTRAINT "_home_page_v_version_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_home_page_v_version_cards" ADD CONSTRAINT "_home_page_v_version_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_article_web_fk" FOREIGN KEY ("article_web_id") REFERENCES "public"."article_web"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_article_pdf_fk" FOREIGN KEY ("article_pdf_id") REFERENCES "public"."article_pdf"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_book_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_video_fk" FOREIGN KEY ("video_id") REFERENCES "public"."video"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "home_page_hero_buttons_order_idx" ON "home_page_hero_buttons" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_page_hero_buttons_parent_id_idx" ON "home_page_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_page_cards_order_idx" ON "home_page_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_page_cards_parent_id_idx" ON "home_page_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_page_rels_order_idx" ON "home_page_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "home_page_rels_parent_idx" ON "home_page_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "home_page_rels_path_idx" ON "home_page_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "home_page_rels_article_web_id_idx" ON "home_page_rels" USING btree ("article_web_id");
  CREATE INDEX IF NOT EXISTS "home_page_rels_article_pdf_id_idx" ON "home_page_rels" USING btree ("article_pdf_id");
  CREATE INDEX IF NOT EXISTS "home_page_rels_book_id_idx" ON "home_page_rels" USING btree ("book_id");
  CREATE INDEX IF NOT EXISTS "home_page_rels_video_id_idx" ON "home_page_rels" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "_home_page_v_version_hero_buttons_order_idx" ON "_home_page_v_version_hero_buttons" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_home_page_v_version_hero_buttons_parent_id_idx" ON "_home_page_v_version_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_home_page_v_version_cards_order_idx" ON "_home_page_v_version_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_home_page_v_version_cards_parent_id_idx" ON "_home_page_v_version_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_home_page_v_created_at_idx" ON "_home_page_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_home_page_v_updated_at_idx" ON "_home_page_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_home_page_v_rels_order_idx" ON "_home_page_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_home_page_v_rels_parent_idx" ON "_home_page_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_home_page_v_rels_path_idx" ON "_home_page_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_home_page_v_rels_article_web_id_idx" ON "_home_page_v_rels" USING btree ("article_web_id");
  CREATE INDEX IF NOT EXISTS "_home_page_v_rels_article_pdf_id_idx" ON "_home_page_v_rels" USING btree ("article_pdf_id");
  CREATE INDEX IF NOT EXISTS "_home_page_v_rels_book_id_idx" ON "_home_page_v_rels" USING btree ("book_id");
  CREATE INDEX IF NOT EXISTS "_home_page_v_rels_video_id_idx" ON "_home_page_v_rels" USING btree ("video_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_page_hero_buttons" CASCADE;
  DROP TABLE "home_page_cards" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_rels" CASCADE;
  DROP TABLE "_home_page_v_version_hero_buttons" CASCADE;
  DROP TABLE "_home_page_v_version_cards" CASCADE;
  DROP TABLE "_home_page_v" CASCADE;
  DROP TABLE "_home_page_v_rels" CASCADE;`)
}
