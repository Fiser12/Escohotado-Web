import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_book_ediciones_variant" AS ENUM('audiobook', 'ebook', 'book');
  CREATE TYPE "public"."enum_book_ediciones_language" AS ENUM('es', 'en');
  CREATE TABLE IF NOT EXISTS "book_ediciones" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"variant" "enum_book_ediciones_variant",
  	"language" "enum_book_ediciones_language"
  );
  
  CREATE TABLE IF NOT EXISTS "book" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"cover_id" uuid NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"published_at" timestamp(3) with time zone NOT NULL,
  	"seeds" varchar DEFAULT '',
  	"permissions_seeds" varchar DEFAULT '',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "book_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"taxonomy_id" varchar,
  	"permission_id" varchar
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "book_id" uuid;
  DO $$ BEGIN
   ALTER TABLE "book_ediciones" ADD CONSTRAINT "book_ediciones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."book"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "book" ADD CONSTRAINT "book_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
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
  
  DO $$ BEGIN
   ALTER TABLE "book_rels" ADD CONSTRAINT "book_rels_permission_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permission"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "book_ediciones_order_idx" ON "book_ediciones" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "book_ediciones_parent_id_idx" ON "book_ediciones" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "book_cover_idx" ON "book" USING btree ("cover_id");
  CREATE INDEX IF NOT EXISTS "book_updated_at_idx" ON "book" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "book_created_at_idx" ON "book" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "book_rels_order_idx" ON "book_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "book_rels_parent_idx" ON "book_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "book_rels_path_idx" ON "book_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "book_rels_taxonomy_id_idx" ON "book_rels" USING btree ("taxonomy_id");
  CREATE INDEX IF NOT EXISTS "book_rels_permission_id_idx" ON "book_rels" USING btree ("permission_id");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_book_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_book_id_idx" ON "payload_locked_documents_rels" USING btree ("book_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "book_ediciones" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "book" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "book_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "book_ediciones" CASCADE;
  DROP TABLE "book" CASCADE;
  DROP TABLE "book_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_book_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_book_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "book_id";
  DROP TYPE "public"."enum_book_ediciones_variant";
  DROP TYPE "public"."enum_book_ediciones_language";`)
}
