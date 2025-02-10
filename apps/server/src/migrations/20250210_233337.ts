import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "taxonomy_breadcrumbs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "taxonomy" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "book_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "taxonomy_breadcrumbs" CASCADE;
  DROP TABLE "taxonomy" CASCADE;
  DROP TABLE "book_rels" CASCADE;
  ALTER TABLE "article_pdf_rels" DROP CONSTRAINT IF EXISTS "article_pdf_rels_taxonomy_fk";
  ALTER TABLE "article_web_rels" DROP CONSTRAINT IF EXISTS "article_web_rels_taxonomy_fk";
  ALTER TABLE "video_rels" DROP CONSTRAINT IF EXISTS "video_rels_taxonomy_fk";
  ALTER TABLE "quote_rels" DROP CONSTRAINT IF EXISTS "quote_rels_taxonomy_fk";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_taxonomy_fk";
  
  DROP INDEX IF EXISTS "article_pdf_rels_taxonomy_id_idx";
  DROP INDEX IF EXISTS "article_web_rels_taxonomy_id_idx";
  DROP INDEX IF EXISTS "video_rels_taxonomy_id_idx";
  DROP INDEX IF EXISTS "quote_rels_taxonomy_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_taxonomy_id_idx";
  ALTER TABLE "article_pdf_rels" DROP COLUMN IF EXISTS "taxonomy_id";
  ALTER TABLE "article_web_rels" DROP COLUMN IF EXISTS "taxonomy_id";
  ALTER TABLE "video_rels" DROP COLUMN IF EXISTS "taxonomy_id";
  ALTER TABLE "quote_rels" DROP COLUMN IF EXISTS "taxonomy_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "taxonomy_id";`
)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "taxonomy_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" varchar,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "taxonomy" (
  	"id" varchar PRIMARY KEY NOT NULL,
  	"selectable" boolean DEFAULT true,
  	"singular_name" varchar NOT NULL,
  	"plural_name" varchar,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"parent_id" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "book_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"taxonomy_id" varchar
  );
  
  ALTER TABLE "article_pdf_rels" ADD COLUMN "taxonomy_id" varchar;
  ALTER TABLE "article_web_rels" ADD COLUMN "taxonomy_id" varchar;
  ALTER TABLE "video_rels" ADD COLUMN "taxonomy_id" varchar;
  ALTER TABLE "quote_rels" ADD COLUMN "taxonomy_id" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "taxonomy_id" varchar;
  DO $$ BEGIN
   ALTER TABLE "taxonomy_breadcrumbs" ADD CONSTRAINT "taxonomy_breadcrumbs_doc_id_taxonomy_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."taxonomy"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "taxonomy_breadcrumbs" ADD CONSTRAINT "taxonomy_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."taxonomy"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "taxonomy" ADD CONSTRAINT "taxonomy_parent_id_taxonomy_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."taxonomy"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "book_rels" ADD CONSTRAINT "book_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."book"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "book_rels" ADD CONSTRAINT "book_rels_taxonomy_fk" FOREIGN KEY ("taxonomy_id") REFERENCES "public"."taxonomy"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "taxonomy_breadcrumbs_order_idx" ON "taxonomy_breadcrumbs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "taxonomy_breadcrumbs_parent_id_idx" ON "taxonomy_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "taxonomy_breadcrumbs_doc_idx" ON "taxonomy_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX IF NOT EXISTS "taxonomy_slug_idx" ON "taxonomy" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "taxonomy_parent_idx" ON "taxonomy" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "taxonomy_updated_at_idx" ON "taxonomy" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "taxonomy_created_at_idx" ON "taxonomy" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "book_rels_order_idx" ON "book_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "book_rels_parent_idx" ON "book_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "book_rels_path_idx" ON "book_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "book_rels_taxonomy_id_idx" ON "book_rels" USING btree ("taxonomy_id");
  DO $$ BEGIN
   ALTER TABLE "article_pdf_rels" ADD CONSTRAINT "article_pdf_rels_taxonomy_fk" FOREIGN KEY ("taxonomy_id") REFERENCES "public"."taxonomy"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "article_web_rels" ADD CONSTRAINT "article_web_rels_taxonomy_fk" FOREIGN KEY ("taxonomy_id") REFERENCES "public"."taxonomy"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "video_rels" ADD CONSTRAINT "video_rels_taxonomy_fk" FOREIGN KEY ("taxonomy_id") REFERENCES "public"."taxonomy"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quote_rels" ADD CONSTRAINT "quote_rels_taxonomy_fk" FOREIGN KEY ("taxonomy_id") REFERENCES "public"."taxonomy"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_taxonomy_fk" FOREIGN KEY ("taxonomy_id") REFERENCES "public"."taxonomy"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "article_pdf_rels_taxonomy_id_idx" ON "article_pdf_rels" USING btree ("taxonomy_id");
  CREATE INDEX IF NOT EXISTS "article_web_rels_taxonomy_id_idx" ON "article_web_rels" USING btree ("taxonomy_id");
  CREATE INDEX IF NOT EXISTS "video_rels_taxonomy_id_idx" ON "video_rels" USING btree ("taxonomy_id");
  CREATE INDEX IF NOT EXISTS "quote_rels_taxonomy_id_idx" ON "quote_rels" USING btree ("taxonomy_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_taxonomy_id_idx" ON "payload_locked_documents_rels" USING btree ("taxonomy_id");`)
}
