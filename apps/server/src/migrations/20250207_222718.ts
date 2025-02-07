import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users_verification_tokens" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "users_verification_tokens" CASCADE;
  ALTER TABLE "users" ADD COLUMN "is_subscribed_to_newsletter" boolean DEFAULT true NOT NULL;
  CREATE INDEX IF NOT EXISTS "users_accounts_provider_account_id_idx" ON "users_accounts" USING btree ("provider_account_id");
  CREATE INDEX IF NOT EXISTS "users_sessions_session_token_idx" ON "users_sessions" USING btree ("session_token");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "users_verification_tokens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"token" varchar NOT NULL,
  	"expires" timestamp(3) with time zone NOT NULL
  );
  
  DROP INDEX IF EXISTS "users_accounts_provider_account_id_idx";
  DROP INDEX IF EXISTS "users_sessions_session_token_idx";
  DROP INDEX IF EXISTS "users_email_idx";
  DO $$ BEGIN
   ALTER TABLE "users_verification_tokens" ADD CONSTRAINT "users_verification_tokens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_verification_tokens_order_idx" ON "users_verification_tokens" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "users_verification_tokens_parent_id_idx" ON "users_verification_tokens" USING btree ("_parent_id");
  ALTER TABLE "users" DROP COLUMN IF EXISTS "is_subscribed_to_newsletter";`)
}
