import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "taxonomy_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" varchar,
  	"url" varchar,
  	"label" varchar
  );
  
  DROP INDEX IF EXISTS "taxonomy_slug_idx";
  DROP INDEX IF EXISTS "article_web_slug_idx";
  DROP INDEX IF EXISTS "book_slug_idx";
  ALTER TABLE "taxonomy" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "article_web" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "book" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "taxonomy" ADD COLUMN "slug_lock" boolean DEFAULT true;
  ALTER TABLE "article_web" ADD COLUMN "slug_lock" boolean DEFAULT true;
  ALTER TABLE "book" ADD COLUMN "slug_lock" boolean DEFAULT true;
  ALTER TABLE "video_rels" ADD COLUMN "taxonomy_id" varchar;
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
  
  CREATE INDEX IF NOT EXISTS "taxonomy_breadcrumbs_order_idx" ON "taxonomy_breadcrumbs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "taxonomy_breadcrumbs_parent_id_idx" ON "taxonomy_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "taxonomy_breadcrumbs_doc_idx" ON "taxonomy_breadcrumbs" USING btree ("doc_id");
  DO $$ BEGIN
   ALTER TABLE "video_rels" ADD CONSTRAINT "video_rels_taxonomy_fk" FOREIGN KEY ("taxonomy_id") REFERENCES "public"."taxonomy"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "video_rels_taxonomy_id_idx" ON "video_rels" USING btree ("taxonomy_id");
  CREATE INDEX IF NOT EXISTS "taxonomy_slug_idx" ON "taxonomy" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "article_web_slug_idx" ON "article_web" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "book_slug_idx" ON "book" USING btree ("slug");
  ALTER TABLE "taxonomy" DROP COLUMN IF EXISTS "seed";
  ALTER TABLE "article_pdf" DROP COLUMN IF EXISTS "seeds";
  ALTER TABLE "article_web" DROP COLUMN IF EXISTS "seeds";
  ALTER TABLE "book" DROP COLUMN IF EXISTS "seeds";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "taxonomy_breadcrumbs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "taxonomy_breadcrumbs" CASCADE;
  ALTER TABLE "video_rels" DROP CONSTRAINT "video_rels_taxonomy_fk";
  
  DROP INDEX IF EXISTS "video_rels_taxonomy_id_idx";
  DROP INDEX IF EXISTS "taxonomy_slug_idx";
  DROP INDEX IF EXISTS "article_web_slug_idx";
  DROP INDEX IF EXISTS "book_slug_idx";
  ALTER TABLE "taxonomy" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "article_web" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "book" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "taxonomy" ADD COLUMN "seed" varchar;
  ALTER TABLE "article_pdf" ADD COLUMN "seeds" varchar DEFAULT '';
  ALTER TABLE "article_web" ADD COLUMN "seeds" varchar DEFAULT '';
  ALTER TABLE "book" ADD COLUMN "seeds" varchar DEFAULT '';
  CREATE UNIQUE INDEX IF NOT EXISTS "taxonomy_slug_idx" ON "taxonomy" USING btree ("slug");
  CREATE UNIQUE INDEX IF NOT EXISTS "article_web_slug_idx" ON "article_web" USING btree ("slug");
  CREATE UNIQUE INDEX IF NOT EXISTS "book_slug_idx" ON "book" USING btree ("slug");
  ALTER TABLE "taxonomy" DROP COLUMN IF EXISTS "slug_lock";
  ALTER TABLE "article_web" DROP COLUMN IF EXISTS "slug_lock";
  ALTER TABLE "book" DROP COLUMN IF EXISTS "slug_lock";
  ALTER TABLE "video_rels" DROP COLUMN IF EXISTS "taxonomy_id";`)
}
