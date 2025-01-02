import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "article_pdf" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "article_pdf" ALTER COLUMN "published_at" DROP NOT NULL;
  ALTER TABLE "article_web" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "article_web" ALTER COLUMN "published_at" DROP NOT NULL;
  ALTER TABLE "book" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "book" ALTER COLUMN "published_at" DROP NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "article_pdf" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "article_pdf" ALTER COLUMN "published_at" SET NOT NULL;
  ALTER TABLE "article_web" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "article_web" ALTER COLUMN "published_at" SET NOT NULL;
  ALTER TABLE "book" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "book" ALTER COLUMN "published_at" SET NOT NULL;`)
}
