import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_prices_type" AS ENUM('one_time', 'recurring');
  CREATE TYPE "public"."enum_prices_interval" AS ENUM('day', 'week', 'month', 'year');
  CREATE TYPE "public"."enum_products_type" AS ENUM('good', 'service');
  CREATE TYPE "public"."enum_subscriptions_status" AS ENUM('trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid', 'paused');
  CREATE TYPE "public"."enum_book_ediciones_variant" AS ENUM('audiobook', 'ebook', 'book');
  CREATE TYPE "public"."enum_book_ediciones_language" AS ENUM('es', 'en');
  CREATE TABLE IF NOT EXISTS "users_accounts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"provider" varchar NOT NULL,
  	"provider_account_id" varchar NOT NULL,
  	"type" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"session_token" varchar NOT NULL,
  	"expires" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"email_verified" timestamp(3) with time zone,
  	"name" varchar,
  	"image" varchar,
  	"roles" jsonb,
  	"is_subscribed_to_newsletter" boolean DEFAULT true NOT NULL,
  	"stripe_customer_id" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "prices" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"stripe_i_d" varchar NOT NULL,
  	"stripe_product_id" varchar NOT NULL,
  	"active" boolean DEFAULT false NOT NULL,
  	"description" varchar,
  	"unit_amount" numeric NOT NULL,
  	"currency" varchar NOT NULL,
  	"type" "enum_prices_type" NOT NULL,
  	"interval" "enum_prices_interval",
  	"interval_count" numeric,
  	"trial_period_days" numeric,
  	"metadata" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "products_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"stripe_i_d" varchar NOT NULL,
  	"type" "enum_products_type",
  	"active" boolean DEFAULT false NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"metadata" jsonb,
  	"permissions_seeds" varchar DEFAULT '',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"prices_id" integer,
  	"permission_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "subscriptions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" varchar NOT NULL,
  	"product_id" integer NOT NULL,
  	"status" "enum_subscriptions_status" NOT NULL,
  	"created" timestamp(3) with time zone,
  	"current_period_start" timestamp(3) with time zone,
  	"current_period_end" timestamp(3) with time zone,
  	"ended_at" timestamp(3) with time zone,
  	"cancel_at" timestamp(3) with time zone,
  	"canceled_at" timestamp(3) with time zone,
  	"cancel_at_period_end" boolean,
  	"trial_start" timestamp(3) with time zone,
  	"trial_end" timestamp(3) with time zone,
  	"stripe_i_d" varchar NOT NULL,
  	"stripe_price_i_d" varchar NOT NULL,
  	"stripe_customer_id" varchar NOT NULL,
  	"metadata" jsonb,
  	"permissions_seeds" varchar DEFAULT '',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"raw_content" varchar,
  	"prefix" varchar DEFAULT 'media',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "taxonomy_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "taxonomy" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"selectable" boolean DEFAULT true,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "taxonomy_locales" (
  	"singular_name" varchar NOT NULL,
  	"plural_name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "article_pdf" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"permissions_seeds" varchar DEFAULT '',
  	"cover_id" integer,
  	"title" varchar NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"forum_post_id" varchar,
  	"last_forum_sync" timestamp(3) with time zone,
  	"last_forum_posts" jsonb,
  	"prefix" varchar DEFAULT 'article_pdf',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "article_pdf_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "article_pdf_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"permission_id" integer,
  	"taxonomy_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "article_web" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"permissions_seeds" varchar DEFAULT '',
  	"cover_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"forum_post_id" varchar,
  	"last_forum_sync" timestamp(3) with time zone,
  	"last_forum_posts" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "article_web_locales" (
  	"title" varchar NOT NULL,
  	"content" jsonb,
  	"source" varchar,
  	"preview_content" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "article_web_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"permission_id" integer,
  	"taxonomy_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "book_ediciones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"variant" "enum_book_ediciones_variant",
  	"language" "enum_book_ediciones_language"
  );
  
  CREATE TABLE IF NOT EXISTS "book" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"cover_id" integer NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"forum_post_id" varchar,
  	"last_forum_sync" timestamp(3) with time zone,
  	"last_forum_posts" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "book_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "book_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"taxonomy_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "video" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"permissions_seeds" varchar DEFAULT '',
  	"tags" jsonb,
  	"thumbnail_url" varchar,
  	"view_count" numeric,
  	"duration" numeric,
  	"published_at" timestamp(3) with time zone,
  	"forum_post_id" varchar,
  	"last_forum_sync" timestamp(3) with time zone,
  	"last_forum_posts" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "video_locales" (
  	"content" jsonb,
  	"url" varchar NOT NULL,
  	"url_free" varchar,
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "video_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"permission_id" integer,
  	"taxonomy_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "quote" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "quote_locales" (
  	"quote" varchar NOT NULL,
  	"context" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "quote_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"book_id" integer,
  	"video_id" integer,
  	"article_pdf_id" integer,
  	"article_web_id" integer,
  	"taxonomy_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "ui_grid_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tailwind_class_names" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "ui_grid_cards" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"tailwind_grid_class_names" varchar DEFAULT 'grid-cols-1 md:grid-cols-4',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "ui_block" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "ui_block_locales" (
  	"block" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "permission" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "search_results" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"priority" numeric,
  	"tags" varchar,
  	"permissions_seeds" varchar,
  	"href" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "search_results_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "search_results_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"video_id" integer,
  	"quote_id" integer,
  	"article_web_id" integer,
  	"article_pdf_id" integer,
  	"book_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" varchar,
  	"prices_id" integer,
  	"products_id" integer,
  	"subscriptions_id" integer,
  	"media_id" integer,
  	"taxonomy_id" integer,
  	"article_pdf_id" integer,
  	"article_web_id" integer,
  	"book_id" integer,
  	"video_id" integer,
  	"quote_id" integer,
  	"ui_grid_cards_id" integer,
  	"ui_block_id" integer,
  	"permission_id" integer,
  	"search_results_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "articulos_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "articulos_page_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "home_page_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "videos_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "videos_page_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "users_accounts" ADD CONSTRAINT "users_accounts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_images" ADD CONSTRAINT "products_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_features" ADD CONSTRAINT "products_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_prices_fk" FOREIGN KEY ("prices_id") REFERENCES "public"."prices"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_permission_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permission"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "taxonomy_breadcrumbs" ADD CONSTRAINT "taxonomy_breadcrumbs_doc_id_taxonomy_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."taxonomy"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "taxonomy_breadcrumbs" ADD CONSTRAINT "taxonomy_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."taxonomy"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "taxonomy" ADD CONSTRAINT "taxonomy_parent_id_taxonomy_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."taxonomy"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "taxonomy_locales" ADD CONSTRAINT "taxonomy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."taxonomy"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "article_pdf" ADD CONSTRAINT "article_pdf_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "article_pdf_locales" ADD CONSTRAINT "article_pdf_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."article_pdf"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "article_pdf_rels" ADD CONSTRAINT "article_pdf_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."article_pdf"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "article_pdf_rels" ADD CONSTRAINT "article_pdf_rels_permission_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permission"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "article_pdf_rels" ADD CONSTRAINT "article_pdf_rels_taxonomy_fk" FOREIGN KEY ("taxonomy_id") REFERENCES "public"."taxonomy"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "article_web" ADD CONSTRAINT "article_web_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "article_web_locales" ADD CONSTRAINT "article_web_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."article_web"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "article_web_rels" ADD CONSTRAINT "article_web_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."article_web"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "article_web_rels" ADD CONSTRAINT "article_web_rels_permission_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permission"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "article_web_rels" ADD CONSTRAINT "article_web_rels_taxonomy_fk" FOREIGN KEY ("taxonomy_id") REFERENCES "public"."taxonomy"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "book_ediciones" ADD CONSTRAINT "book_ediciones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."book"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "book" ADD CONSTRAINT "book_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "book_locales" ADD CONSTRAINT "book_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."book"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "book_rels" ADD CONSTRAINT "book_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."book"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "book_rels" ADD CONSTRAINT "book_rels_taxonomy_fk" FOREIGN KEY ("taxonomy_id") REFERENCES "public"."taxonomy"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "video_locales" ADD CONSTRAINT "video_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."video"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "video_rels" ADD CONSTRAINT "video_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."video"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "video_rels" ADD CONSTRAINT "video_rels_permission_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permission"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "video_rels" ADD CONSTRAINT "video_rels_taxonomy_fk" FOREIGN KEY ("taxonomy_id") REFERENCES "public"."taxonomy"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quote_locales" ADD CONSTRAINT "quote_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quote"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quote_rels" ADD CONSTRAINT "quote_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."quote"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quote_rels" ADD CONSTRAINT "quote_rels_book_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quote_rels" ADD CONSTRAINT "quote_rels_video_fk" FOREIGN KEY ("video_id") REFERENCES "public"."video"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quote_rels" ADD CONSTRAINT "quote_rels_article_pdf_fk" FOREIGN KEY ("article_pdf_id") REFERENCES "public"."article_pdf"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quote_rels" ADD CONSTRAINT "quote_rels_article_web_fk" FOREIGN KEY ("article_web_id") REFERENCES "public"."article_web"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quote_rels" ADD CONSTRAINT "quote_rels_taxonomy_fk" FOREIGN KEY ("taxonomy_id") REFERENCES "public"."taxonomy"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "ui_grid_cards_cards" ADD CONSTRAINT "ui_grid_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ui_grid_cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "ui_block_locales" ADD CONSTRAINT "ui_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ui_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_results_locales" ADD CONSTRAINT "search_results_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search_results"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_results_rels" ADD CONSTRAINT "search_results_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search_results"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_results_rels" ADD CONSTRAINT "search_results_rels_video_fk" FOREIGN KEY ("video_id") REFERENCES "public"."video"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_results_rels" ADD CONSTRAINT "search_results_rels_quote_fk" FOREIGN KEY ("quote_id") REFERENCES "public"."quote"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_results_rels" ADD CONSTRAINT "search_results_rels_article_web_fk" FOREIGN KEY ("article_web_id") REFERENCES "public"."article_web"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_results_rels" ADD CONSTRAINT "search_results_rels_article_pdf_fk" FOREIGN KEY ("article_pdf_id") REFERENCES "public"."article_pdf"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_results_rels" ADD CONSTRAINT "search_results_rels_book_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_prices_fk" FOREIGN KEY ("prices_id") REFERENCES "public"."prices"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_subscriptions_fk" FOREIGN KEY ("subscriptions_id") REFERENCES "public"."subscriptions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_taxonomy_fk" FOREIGN KEY ("taxonomy_id") REFERENCES "public"."taxonomy"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_article_pdf_fk" FOREIGN KEY ("article_pdf_id") REFERENCES "public"."article_pdf"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_article_web_fk" FOREIGN KEY ("article_web_id") REFERENCES "public"."article_web"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_book_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_video_fk" FOREIGN KEY ("video_id") REFERENCES "public"."video"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_quote_fk" FOREIGN KEY ("quote_id") REFERENCES "public"."quote"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ui_grid_cards_fk" FOREIGN KEY ("ui_grid_cards_id") REFERENCES "public"."ui_grid_cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ui_block_fk" FOREIGN KEY ("ui_block_id") REFERENCES "public"."ui_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_permission_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permission"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_results_fk" FOREIGN KEY ("search_results_id") REFERENCES "public"."search_results"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "articulos_page_locales" ADD CONSTRAINT "articulos_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articulos_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "videos_page_locales" ADD CONSTRAINT "videos_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_accounts_order_idx" ON "users_accounts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "users_accounts_parent_id_idx" ON "users_accounts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "users_accounts_provider_account_id_idx" ON "users_accounts" USING btree ("provider_account_id");
  CREATE INDEX IF NOT EXISTS "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "users_sessions_session_token_idx" ON "users_sessions" USING btree ("session_token");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "prices_updated_at_idx" ON "prices" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "prices_created_at_idx" ON "prices" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "products_images_order_idx" ON "products_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_images_parent_id_idx" ON "products_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_features_order_idx" ON "products_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_features_parent_id_idx" ON "products_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "products_rels_prices_id_idx" ON "products_rels" USING btree ("prices_id");
  CREATE INDEX IF NOT EXISTS "products_rels_permission_id_idx" ON "products_rels" USING btree ("permission_id");
  CREATE INDEX IF NOT EXISTS "subscriptions_user_idx" ON "subscriptions" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "subscriptions_product_idx" ON "subscriptions" USING btree ("product_id");
  CREATE INDEX IF NOT EXISTS "subscriptions_updated_at_idx" ON "subscriptions" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "subscriptions_created_at_idx" ON "subscriptions" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "taxonomy_breadcrumbs_order_idx" ON "taxonomy_breadcrumbs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "taxonomy_breadcrumbs_parent_id_idx" ON "taxonomy_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "taxonomy_breadcrumbs_locale_idx" ON "taxonomy_breadcrumbs" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "taxonomy_breadcrumbs_doc_idx" ON "taxonomy_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX IF NOT EXISTS "taxonomy_slug_idx" ON "taxonomy" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "taxonomy_parent_idx" ON "taxonomy" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "taxonomy_updated_at_idx" ON "taxonomy" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "taxonomy_created_at_idx" ON "taxonomy" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "taxonomy_locales_locale_parent_id_unique" ON "taxonomy_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "article_pdf_cover_idx" ON "article_pdf" USING btree ("cover_id");
  CREATE INDEX IF NOT EXISTS "article_pdf_updated_at_idx" ON "article_pdf" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "article_pdf_created_at_idx" ON "article_pdf" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "article_pdf_filename_idx" ON "article_pdf" USING btree ("filename");
  CREATE UNIQUE INDEX IF NOT EXISTS "article_pdf_locales_locale_parent_id_unique" ON "article_pdf_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "article_pdf_rels_order_idx" ON "article_pdf_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "article_pdf_rels_parent_idx" ON "article_pdf_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "article_pdf_rels_path_idx" ON "article_pdf_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "article_pdf_rels_permission_id_idx" ON "article_pdf_rels" USING btree ("permission_id");
  CREATE INDEX IF NOT EXISTS "article_pdf_rels_taxonomy_id_idx" ON "article_pdf_rels" USING btree ("taxonomy_id");
  CREATE INDEX IF NOT EXISTS "article_web_cover_idx" ON "article_web" USING btree ("cover_id");
  CREATE INDEX IF NOT EXISTS "article_web_slug_idx" ON "article_web" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "article_web_updated_at_idx" ON "article_web" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "article_web_created_at_idx" ON "article_web" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "article_web_locales_locale_parent_id_unique" ON "article_web_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "article_web_rels_order_idx" ON "article_web_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "article_web_rels_parent_idx" ON "article_web_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "article_web_rels_path_idx" ON "article_web_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "article_web_rels_permission_id_idx" ON "article_web_rels" USING btree ("permission_id");
  CREATE INDEX IF NOT EXISTS "article_web_rels_taxonomy_id_idx" ON "article_web_rels" USING btree ("taxonomy_id");
  CREATE INDEX IF NOT EXISTS "book_ediciones_order_idx" ON "book_ediciones" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "book_ediciones_parent_id_idx" ON "book_ediciones" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "book_cover_idx" ON "book" USING btree ("cover_id");
  CREATE INDEX IF NOT EXISTS "book_slug_idx" ON "book" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "book_updated_at_idx" ON "book" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "book_created_at_idx" ON "book" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "book_locales_locale_parent_id_unique" ON "book_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "book_rels_order_idx" ON "book_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "book_rels_parent_idx" ON "book_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "book_rels_path_idx" ON "book_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "book_rels_taxonomy_id_idx" ON "book_rels" USING btree ("taxonomy_id");
  CREATE INDEX IF NOT EXISTS "video_updated_at_idx" ON "video" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "video_created_at_idx" ON "video" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "video_url_idx" ON "video_locales" USING btree ("url","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "video_locales_locale_parent_id_unique" ON "video_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "video_rels_order_idx" ON "video_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "video_rels_parent_idx" ON "video_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "video_rels_path_idx" ON "video_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "video_rels_permission_id_idx" ON "video_rels" USING btree ("permission_id");
  CREATE INDEX IF NOT EXISTS "video_rels_taxonomy_id_idx" ON "video_rels" USING btree ("taxonomy_id");
  CREATE INDEX IF NOT EXISTS "quote_updated_at_idx" ON "quote" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "quote_created_at_idx" ON "quote" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "quote_locales_locale_parent_id_unique" ON "quote_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "quote_rels_order_idx" ON "quote_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "quote_rels_parent_idx" ON "quote_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "quote_rels_path_idx" ON "quote_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "quote_rels_book_id_idx" ON "quote_rels" USING btree ("book_id");
  CREATE INDEX IF NOT EXISTS "quote_rels_video_id_idx" ON "quote_rels" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "quote_rels_article_pdf_id_idx" ON "quote_rels" USING btree ("article_pdf_id");
  CREATE INDEX IF NOT EXISTS "quote_rels_article_web_id_idx" ON "quote_rels" USING btree ("article_web_id");
  CREATE INDEX IF NOT EXISTS "quote_rels_taxonomy_id_idx" ON "quote_rels" USING btree ("taxonomy_id");
  CREATE INDEX IF NOT EXISTS "ui_grid_cards_cards_order_idx" ON "ui_grid_cards_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "ui_grid_cards_cards_parent_id_idx" ON "ui_grid_cards_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "ui_grid_cards_updated_at_idx" ON "ui_grid_cards" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "ui_grid_cards_created_at_idx" ON "ui_grid_cards" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "ui_block_updated_at_idx" ON "ui_block" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "ui_block_created_at_idx" ON "ui_block" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "ui_block_locales_locale_parent_id_unique" ON "ui_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "permission_slug_idx" ON "permission" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "permission_updated_at_idx" ON "permission" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "permission_created_at_idx" ON "permission" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "search_results_updated_at_idx" ON "search_results" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "search_results_created_at_idx" ON "search_results" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "search_results_locales_locale_parent_id_unique" ON "search_results_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "search_results_rels_order_idx" ON "search_results_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "search_results_rels_parent_idx" ON "search_results_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "search_results_rels_path_idx" ON "search_results_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "search_results_rels_video_id_idx" ON "search_results_rels" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "search_results_rels_quote_id_idx" ON "search_results_rels" USING btree ("quote_id");
  CREATE INDEX IF NOT EXISTS "search_results_rels_article_web_id_idx" ON "search_results_rels" USING btree ("article_web_id");
  CREATE INDEX IF NOT EXISTS "search_results_rels_article_pdf_id_idx" ON "search_results_rels" USING btree ("article_pdf_id");
  CREATE INDEX IF NOT EXISTS "search_results_rels_book_id_idx" ON "search_results_rels" USING btree ("book_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_prices_id_idx" ON "payload_locked_documents_rels" USING btree ("prices_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_subscriptions_id_idx" ON "payload_locked_documents_rels" USING btree ("subscriptions_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_taxonomy_id_idx" ON "payload_locked_documents_rels" USING btree ("taxonomy_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_article_pdf_id_idx" ON "payload_locked_documents_rels" USING btree ("article_pdf_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_article_web_id_idx" ON "payload_locked_documents_rels" USING btree ("article_web_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_book_id_idx" ON "payload_locked_documents_rels" USING btree ("book_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_video_id_idx" ON "payload_locked_documents_rels" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_quote_id_idx" ON "payload_locked_documents_rels" USING btree ("quote_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_ui_grid_cards_id_idx" ON "payload_locked_documents_rels" USING btree ("ui_grid_cards_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_ui_block_id_idx" ON "payload_locked_documents_rels" USING btree ("ui_block_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_permission_id_idx" ON "payload_locked_documents_rels" USING btree ("permission_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_search_results_id_idx" ON "payload_locked_documents_rels" USING btree ("search_results_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "articulos_page_locales_locale_parent_id_unique" ON "articulos_page_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "home_page_locales_locale_parent_id_unique" ON "home_page_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "videos_page_locales_locale_parent_id_unique" ON "videos_page_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_accounts" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "prices" CASCADE;
  DROP TABLE "products_images" CASCADE;
  DROP TABLE "products_features" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "subscriptions" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "taxonomy_breadcrumbs" CASCADE;
  DROP TABLE "taxonomy" CASCADE;
  DROP TABLE "taxonomy_locales" CASCADE;
  DROP TABLE "article_pdf" CASCADE;
  DROP TABLE "article_pdf_locales" CASCADE;
  DROP TABLE "article_pdf_rels" CASCADE;
  DROP TABLE "article_web" CASCADE;
  DROP TABLE "article_web_locales" CASCADE;
  DROP TABLE "article_web_rels" CASCADE;
  DROP TABLE "book_ediciones" CASCADE;
  DROP TABLE "book" CASCADE;
  DROP TABLE "book_locales" CASCADE;
  DROP TABLE "book_rels" CASCADE;
  DROP TABLE "video" CASCADE;
  DROP TABLE "video_locales" CASCADE;
  DROP TABLE "video_rels" CASCADE;
  DROP TABLE "quote" CASCADE;
  DROP TABLE "quote_locales" CASCADE;
  DROP TABLE "quote_rels" CASCADE;
  DROP TABLE "ui_grid_cards_cards" CASCADE;
  DROP TABLE "ui_grid_cards" CASCADE;
  DROP TABLE "ui_block" CASCADE;
  DROP TABLE "ui_block_locales" CASCADE;
  DROP TABLE "permission" CASCADE;
  DROP TABLE "search_results" CASCADE;
  DROP TABLE "search_results_locales" CASCADE;
  DROP TABLE "search_results_rels" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "articulos_page" CASCADE;
  DROP TABLE "articulos_page_locales" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_locales" CASCADE;
  DROP TABLE "videos_page" CASCADE;
  DROP TABLE "videos_page_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_prices_type";
  DROP TYPE "public"."enum_prices_interval";
  DROP TYPE "public"."enum_products_type";
  DROP TYPE "public"."enum_subscriptions_status";
  DROP TYPE "public"."enum_book_ediciones_variant";
  DROP TYPE "public"."enum_book_ediciones_language";`)
}
