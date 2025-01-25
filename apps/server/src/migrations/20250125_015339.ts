import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "quote" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"quote" varchar NOT NULL,
  	"context" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "quote_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"book_id" uuid,
  	"video_id" uuid,
  	"article_pdf_id" uuid,
  	"article_web_id" uuid,
  	"taxonomy_id" varchar
  );
  
  ALTER TABLE "video" ADD COLUMN "view_count" numeric;
  ALTER TABLE "video" ADD COLUMN "duration" numeric;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "quote_id" uuid;
  DO $$ BEGIN
   ALTER TABLE "quote_rels" ADD CONSTRAINT "quote_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."quote"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quote_rels" ADD CONSTRAINT "quote_rels_book_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quote_rels" ADD CONSTRAINT "quote_rels_video_fk" FOREIGN KEY ("video_id") REFERENCES "public"."video"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quote_rels" ADD CONSTRAINT "quote_rels_article_pdf_fk" FOREIGN KEY ("article_pdf_id") REFERENCES "public"."article_pdf"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quote_rels" ADD CONSTRAINT "quote_rels_article_web_fk" FOREIGN KEY ("article_web_id") REFERENCES "public"."article_web"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quote_rels" ADD CONSTRAINT "quote_rels_taxonomy_fk" FOREIGN KEY ("taxonomy_id") REFERENCES "public"."taxonomy"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "quote_updated_at_idx" ON "quote" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "quote_created_at_idx" ON "quote" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "quote_rels_order_idx" ON "quote_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "quote_rels_parent_idx" ON "quote_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "quote_rels_path_idx" ON "quote_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "quote_rels_book_id_idx" ON "quote_rels" USING btree ("book_id");
  CREATE INDEX IF NOT EXISTS "quote_rels_video_id_idx" ON "quote_rels" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "quote_rels_article_pdf_id_idx" ON "quote_rels" USING btree ("article_pdf_id");
  CREATE INDEX IF NOT EXISTS "quote_rels_article_web_id_idx" ON "quote_rels" USING btree ("article_web_id");
  CREATE INDEX IF NOT EXISTS "quote_rels_taxonomy_id_idx" ON "quote_rels" USING btree ("taxonomy_id");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_quote_fk" FOREIGN KEY ("quote_id") REFERENCES "public"."quote"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_quote_id_idx" ON "payload_locked_documents_rels" USING btree ("quote_id");
  ALTER TABLE "video" DROP COLUMN IF EXISTS "description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quote_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "quote" CASCADE;
  DROP TABLE "quote_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_quote_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_quote_id_idx";
  ALTER TABLE "video" ADD COLUMN "description" varchar;
  ALTER TABLE "video" DROP COLUMN IF EXISTS "view_count";
  ALTER TABLE "video" DROP COLUMN IF EXISTS "duration";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "quote_id";`)
}
