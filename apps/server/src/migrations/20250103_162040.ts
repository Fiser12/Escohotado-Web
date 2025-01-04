import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "article_pdf" ADD COLUMN "forum_post_id" varchar;
  ALTER TABLE "article_pdf" ADD COLUMN "last_forum_posts" jsonb;
  ALTER TABLE "article_web" ADD COLUMN "forum_post_id" varchar;
  ALTER TABLE "article_web" ADD COLUMN "last_forum_posts" jsonb;
  ALTER TABLE "book" ADD COLUMN "forum_post_id" varchar;
  ALTER TABLE "book" ADD COLUMN "last_forum_posts" jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "article_pdf" DROP COLUMN IF EXISTS "forum_post_id";
  ALTER TABLE "article_pdf" DROP COLUMN IF EXISTS "last_forum_posts";
  ALTER TABLE "article_web" DROP COLUMN IF EXISTS "forum_post_id";
  ALTER TABLE "article_web" DROP COLUMN IF EXISTS "last_forum_posts";
  ALTER TABLE "book" DROP COLUMN IF EXISTS "forum_post_id";
  ALTER TABLE "book" DROP COLUMN IF EXISTS "last_forum_posts";`)
}
