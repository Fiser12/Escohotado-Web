import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "search_results" ADD COLUMN "permissions_seeds" varchar;
  ALTER TABLE "search_results" ADD COLUMN "href" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "search_results" DROP COLUMN IF EXISTS "permissions_seeds";
  ALTER TABLE "search_results" DROP COLUMN IF EXISTS "href";`)
}
