import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "article_pdf" ALTER COLUMN "cover_id" DROP NOT NULL;
  ALTER TABLE "article_web" ALTER COLUMN "cover_id" DROP NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "article_pdf" ALTER COLUMN "cover_id" SET NOT NULL;
  ALTER TABLE "article_web" ALTER COLUMN "cover_id" SET NOT NULL;`)
}
