import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "article_pdf" ADD COLUMN "last_forum_sync" timestamp(3) with time zone;
  ALTER TABLE "article_web" ADD COLUMN "last_forum_sync" timestamp(3) with time zone;
  ALTER TABLE "book" ADD COLUMN "last_forum_sync" timestamp(3) with time zone;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "article_pdf" DROP COLUMN IF EXISTS "last_forum_sync";
  ALTER TABLE "article_web" DROP COLUMN IF EXISTS "last_forum_sync";
  ALTER TABLE "book" DROP COLUMN IF EXISTS "last_forum_sync";`)
}
