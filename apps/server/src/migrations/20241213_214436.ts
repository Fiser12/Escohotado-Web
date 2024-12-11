import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "search_results" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"priority" numeric,
  	"tags" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "search_results_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"video_id" uuid,
  	"article_web_id" uuid,
  	"article_pdf_id" uuid
  );
  
  ALTER TABLE "video_rels" DROP CONSTRAINT "video_rels_taxonomy_fk";
  
  DROP INDEX IF EXISTS "video_rels_taxonomy_id_idx";
  ALTER TABLE "video" ADD COLUMN "url_free" varchar;
  ALTER TABLE "video" ADD COLUMN "permissions_seeds" varchar DEFAULT '';
  ALTER TABLE "video_rels" ADD COLUMN "permission_id" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "search_results_id" uuid;
  DO $$ BEGIN
   ALTER TABLE "search_results_rels" ADD CONSTRAINT "search_results_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search_results"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_results_rels" ADD CONSTRAINT "search_results_rels_video_fk" FOREIGN KEY ("video_id") REFERENCES "public"."video"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_results_rels" ADD CONSTRAINT "search_results_rels_article_web_fk" FOREIGN KEY ("article_web_id") REFERENCES "public"."article_web"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_results_rels" ADD CONSTRAINT "search_results_rels_article_pdf_fk" FOREIGN KEY ("article_pdf_id") REFERENCES "public"."article_pdf"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "search_results_updated_at_idx" ON "search_results" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "search_results_created_at_idx" ON "search_results" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "search_results_rels_order_idx" ON "search_results_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "search_results_rels_parent_idx" ON "search_results_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "search_results_rels_path_idx" ON "search_results_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "search_results_rels_video_id_idx" ON "search_results_rels" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "search_results_rels_article_web_id_idx" ON "search_results_rels" USING btree ("article_web_id");
  CREATE INDEX IF NOT EXISTS "search_results_rels_article_pdf_id_idx" ON "search_results_rels" USING btree ("article_pdf_id");
  DO $$ BEGIN
   ALTER TABLE "video_rels" ADD CONSTRAINT "video_rels_permission_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permission"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_results_fk" FOREIGN KEY ("search_results_id") REFERENCES "public"."search_results"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "video_rels_permission_id_idx" ON "video_rels" USING btree ("permission_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_search_results_id_idx" ON "payload_locked_documents_rels" USING btree ("search_results_id");
  ALTER TABLE "video" DROP COLUMN IF EXISTS "seeds";
  ALTER TABLE "video_rels" DROP COLUMN IF EXISTS "taxonomy_id";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "search_results" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "search_results_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "search_results" CASCADE;
  DROP TABLE "search_results_rels" CASCADE;
  ALTER TABLE "video_rels" DROP CONSTRAINT "video_rels_permission_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_search_results_fk";
  
  DROP INDEX IF EXISTS "video_rels_permission_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_search_results_id_idx";
  ALTER TABLE "video" ADD COLUMN "seeds" varchar DEFAULT '';
  ALTER TABLE "video_rels" ADD COLUMN "taxonomy_id" varchar;
  DO $$ BEGIN
   ALTER TABLE "video_rels" ADD CONSTRAINT "video_rels_taxonomy_fk" FOREIGN KEY ("taxonomy_id") REFERENCES "public"."taxonomy"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "video_rels_taxonomy_id_idx" ON "video_rels" USING btree ("taxonomy_id");
  ALTER TABLE "video" DROP COLUMN IF EXISTS "url_free";
  ALTER TABLE "video" DROP COLUMN IF EXISTS "permissions_seeds";
  ALTER TABLE "video_rels" DROP COLUMN IF EXISTS "permission_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "search_results_id";`)
}
