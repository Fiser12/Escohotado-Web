import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "search_results_rels" ADD COLUMN "book_id" uuid;
  DO $$ BEGIN
   ALTER TABLE "search_results_rels" ADD CONSTRAINT "search_results_rels_book_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "search_results_rels_book_id_idx" ON "search_results_rels" USING btree ("book_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "search_results_rels" DROP CONSTRAINT "search_results_rels_book_fk";
  
  DROP INDEX IF EXISTS "search_results_rels_book_id_idx";
  ALTER TABLE "search_results_rels" DROP COLUMN IF EXISTS "book_id";`)
}
