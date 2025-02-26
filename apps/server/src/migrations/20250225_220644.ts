import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "article_web" ADD COLUMN "source" varchar;
  ALTER TABLE "article_web" ADD COLUMN "preview_content" varchar;
  ALTER TABLE "article_pdf" DROP COLUMN IF EXISTS "content_html";
  ALTER TABLE "article_web" DROP COLUMN IF EXISTS "content_html";
  ALTER TABLE "book" DROP COLUMN IF EXISTS "content_html";
  ALTER TABLE "video" DROP COLUMN IF EXISTS "content_html";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "article_pdf" ADD COLUMN "content_html" varchar;
  ALTER TABLE "article_web" ADD COLUMN "content_html" varchar;
  ALTER TABLE "book" ADD COLUMN "content_html" varchar;
  ALTER TABLE "video" ADD COLUMN "content_html" varchar;
  ALTER TABLE "article_web" DROP COLUMN IF EXISTS "source";
  ALTER TABLE "article_web" DROP COLUMN IF EXISTS "preview_content";`)
}
