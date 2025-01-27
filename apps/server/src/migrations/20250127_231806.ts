import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "ui_block" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar NOT NULL,
  	"block" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "ui_block_id" uuid;
  CREATE INDEX IF NOT EXISTS "ui_block_updated_at_idx" ON "ui_block" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "ui_block_created_at_idx" ON "ui_block" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ui_block_fk" FOREIGN KEY ("ui_block_id") REFERENCES "public"."ui_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_ui_block_id_idx" ON "payload_locked_documents_rels" USING btree ("ui_block_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "ui_block" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "ui_block" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_ui_block_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_ui_block_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "ui_block_id";`)
}
