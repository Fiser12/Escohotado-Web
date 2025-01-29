import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "search_results_rels" ADD COLUMN "quote_id" uuid;
  DO $$ BEGIN
   ALTER TABLE "search_results_rels" ADD CONSTRAINT "search_results_rels_quote_fk" FOREIGN KEY ("quote_id") REFERENCES "public"."quote"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "search_results_rels_quote_id_idx" ON "search_results_rels" USING btree ("quote_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "search_results_rels" DROP CONSTRAINT "search_results_rels_quote_fk";
  
  DROP INDEX IF EXISTS "search_results_rels_quote_id_idx";
  ALTER TABLE "search_results_rels" DROP COLUMN IF EXISTS "quote_id";`)
}
