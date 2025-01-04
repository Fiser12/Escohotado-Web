import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "video" ADD COLUMN "forum_post_id" varchar;
  ALTER TABLE "video" ADD COLUMN "last_forum_sync" timestamp(3) with time zone;
  ALTER TABLE "video" ADD COLUMN "last_forum_posts" jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "video" DROP COLUMN IF EXISTS "forum_post_id";
  ALTER TABLE "video" DROP COLUMN IF EXISTS "last_forum_sync";
  ALTER TABLE "video" DROP COLUMN IF EXISTS "last_forum_posts";`)
}
