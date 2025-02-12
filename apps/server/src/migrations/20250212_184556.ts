import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "article_pdf" ADD COLUMN "content_html" varchar;
  ALTER TABLE "article_web" ADD COLUMN "content_html" varchar;
  ALTER TABLE "book" ADD COLUMN "content_html" varchar;
  ALTER TABLE "video" ADD COLUMN "content_html" varchar;
  ALTER TABLE "article_pdf" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "article_web" DROP COLUMN IF EXISTS "description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "article_pdf" ADD COLUMN "description" varchar;
  ALTER TABLE "article_web" ADD COLUMN "description" varchar;
  ALTER TABLE "article_pdf" DROP COLUMN IF EXISTS "content_html";
  ALTER TABLE "article_web" DROP COLUMN IF EXISTS "content_html";
  ALTER TABLE "book" DROP COLUMN IF EXISTS "content_html";
  ALTER TABLE "video" DROP COLUMN IF EXISTS "content_html";`)
}
