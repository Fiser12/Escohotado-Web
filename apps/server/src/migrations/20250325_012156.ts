import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "permission_slug_idx";
  ALTER TABLE "permission" ALTER COLUMN "slug" SET NOT NULL;
  CREATE UNIQUE INDEX IF NOT EXISTS "permission_slug_idx" ON "permission" USING btree ("slug");
  ALTER TABLE "permission" DROP COLUMN IF EXISTS "slug_lock";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "permission_slug_idx";
  ALTER TABLE "permission" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "permission" ADD COLUMN "slug_lock" boolean DEFAULT true;
  CREATE INDEX IF NOT EXISTS "permission_slug_idx" ON "permission" USING btree ("slug");`)
}
