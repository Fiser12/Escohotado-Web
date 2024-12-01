import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "book_rels" DROP CONSTRAINT "book_rels_permission_fk";
  
  DROP INDEX IF EXISTS "book_rels_permission_id_idx";
  ALTER TABLE "book" ADD COLUMN "slug" varchar NOT NULL;
  CREATE UNIQUE INDEX IF NOT EXISTS "book_slug_idx" ON "book" USING btree ("slug");
  ALTER TABLE "book" DROP COLUMN IF EXISTS "permissions_seeds";
  ALTER TABLE "book_rels" DROP COLUMN IF EXISTS "permission_id";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP INDEX IF EXISTS "book_slug_idx";
  ALTER TABLE "book" ADD COLUMN "permissions_seeds" varchar DEFAULT '';
  ALTER TABLE "book_rels" ADD COLUMN "permission_id" varchar;
  DO $$ BEGIN
   ALTER TABLE "book_rels" ADD CONSTRAINT "book_rels_permission_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permission"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "book_rels_permission_id_idx" ON "book_rels" USING btree ("permission_id");
  ALTER TABLE "book" DROP COLUMN IF EXISTS "slug";`)
}
