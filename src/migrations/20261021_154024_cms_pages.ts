import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_posts_related_service" AS ENUM('seo', 'localseo', 'ads', 'social', 'creative', 'website', 'ai');
  CREATE TYPE "public"."enum_posts_mid_cta_position" AS ENUM('middle', 'p2', 'p3', 'p4', 'p5', 'end');
  CREATE TYPE "public"."enum_sp_usp_logo" AS ENUM('google', 'meta', 'tiktok', 'shopee');
  CREATE TYPE "public"."enum_sp_work_card" AS ENUM('SerpToMaps', 'IgGrid', 'ReviewCard', 'SiteFrame', 'Funnel', 'AiAnswer', 'PromptTable', 'SovBars', 'CrawlerLog', 'QueryFanout', 'JsonLdFragment', 'ReportFrame', 'AdToChat', 'ContentCalendar');
  CREATE TYPE "public"."enum_sp_fed_k" AS ENUM('seo', 'localseo', 'ads', 'social', 'creative', 'website', 'ai', 'wa', 'strategy', 'report');
  CREATE TYPE "public"."enum_sp_fed_gate" AS ENUM('K1', 'K5', 'K6', 'K11');
  CREATE TYPE "public"."enum_sp_feeds_k" AS ENUM('seo', 'localseo', 'ads', 'social', 'creative', 'website', 'ai', 'wa', 'strategy', 'report');
  CREATE TYPE "public"."enum_sp_feeds_gate" AS ENUM('K1', 'K5', 'K6', 'K11');
  CREATE TYPE "public"."enum_service_pages_key" AS ENUM('seo', 'localseo', 'ads', 'social', 'creative', 'website', 'ai');
  CREATE TYPE "public"."enum_service_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_service_pages_content_pricing_kind" AS ENUM('tiers', 'quote', 'modules', 'projects');
  CREATE TYPE "public"."enum_service_pages_content_pricing_builder" AS ENUM('social', 'creative');
  CREATE TYPE "public"."enum__sp_usp_v_logo" AS ENUM('google', 'meta', 'tiktok', 'shopee');
  CREATE TYPE "public"."enum__sp_work_v_card" AS ENUM('SerpToMaps', 'IgGrid', 'ReviewCard', 'SiteFrame', 'Funnel', 'AiAnswer', 'PromptTable', 'SovBars', 'CrawlerLog', 'QueryFanout', 'JsonLdFragment', 'ReportFrame', 'AdToChat', 'ContentCalendar');
  CREATE TYPE "public"."enum__sp_fed_v_k" AS ENUM('seo', 'localseo', 'ads', 'social', 'creative', 'website', 'ai', 'wa', 'strategy', 'report');
  CREATE TYPE "public"."enum__sp_fed_v_gate" AS ENUM('K1', 'K5', 'K6', 'K11');
  CREATE TYPE "public"."enum__sp_feeds_v_k" AS ENUM('seo', 'localseo', 'ads', 'social', 'creative', 'website', 'ai', 'wa', 'strategy', 'report');
  CREATE TYPE "public"."enum__sp_feeds_v_gate" AS ENUM('K1', 'K5', 'K6', 'K11');
  CREATE TYPE "public"."enum__service_pages_v_version_key" AS ENUM('seo', 'localseo', 'ads', 'social', 'creative', 'website', 'ai');
  CREATE TYPE "public"."enum__service_pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__service_pages_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum__service_pages_v_version_content_pricing_kind" AS ENUM('tiers', 'quote', 'modules', 'projects');
  CREATE TYPE "public"."enum__service_pages_v_version_content_pricing_builder" AS ENUM('social', 'creative');
  CREATE TYPE "public"."enum_legal_pages_key" AS ENUM('privacy', 'terms', 'disclaimer');
  CREATE TYPE "public"."enum_legal_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__legal_pages_v_version_key" AS ENUM('privacy', 'terms', 'disclaimer');
  CREATE TYPE "public"."enum__legal_pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__legal_pages_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_q0_type" AS ENUM('single', 'multi');
  CREATE TYPE "public"."enum_q1_type" AS ENUM('single', 'multi');
  CREATE TYPE "public"."enum_q2_type" AS ENUM('single', 'multi');
  CREATE TYPE "public"."enum_q3_type" AS ENUM('single', 'multi');
  CREATE TYPE "public"."enum_q4_type" AS ENUM('single', 'multi');
  CREATE TYPE "public"."enum_q5_type" AS ENUM('single', 'multi');
  CREATE TYPE "public"."enum_q6_type" AS ENUM('single', 'multi');
  CREATE TYPE "public"."enum_q7_type" AS ENUM('single', 'multi');
  CREATE TYPE "public"."enum_home_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__q0_v_type" AS ENUM('single', 'multi');
  CREATE TYPE "public"."enum__q1_v_type" AS ENUM('single', 'multi');
  CREATE TYPE "public"."enum__q2_v_type" AS ENUM('single', 'multi');
  CREATE TYPE "public"."enum__q3_v_type" AS ENUM('single', 'multi');
  CREATE TYPE "public"."enum__q4_v_type" AS ENUM('single', 'multi');
  CREATE TYPE "public"."enum__q5_v_type" AS ENUM('single', 'multi');
  CREATE TYPE "public"."enum__q6_v_type" AS ENUM('single', 'multi');
  CREATE TYPE "public"."enum__q7_v_type" AS ENUM('single', 'multi');
  CREATE TYPE "public"."enum__home_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_page_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_hub_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__hub_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__hub_page_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_about_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_page_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_contact_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contact_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contact_page_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_blog_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_page_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_portfolio_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__portfolio_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__portfolio_page_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_not_found_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__not_found_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__not_found_page_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_campaign_content_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__campaign_content_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__campaign_content_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_instruments_content_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__instruments_content_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__instruments_content_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_site_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_settings_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_ui_labels_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__ui_labels_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__ui_labels_v_published_locale" AS ENUM('id', 'en');
  CREATE TABLE "posts_faq_id" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "posts_faq_en" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "sp_trust" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "sp_hl" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "sp_usp_pts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "sp_usp" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"sub" varchar,
  	"logo" "enum_sp_usp_logo",
  	"tag" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "sp_inc_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"badge" varchar
  );
  
  CREATE TABLE "sp_inc_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "sp_ai_head" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "sp_ai_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "sp_ai_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "sp_work" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"card" "enum_sp_work_card"
  );
  
  CREATE TABLE "sp_tier_feat" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "sp_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"price_value" numeric,
  	"period" varchar,
  	"best_for" varchar,
  	"is_popular" boolean,
  	"color" varchar,
  	"billing" varchar,
  	"note" varchar,
  	"platform_coverage" varchar,
  	"add_on_note" varchar,
  	"recommended_ad_spend" varchar,
  	"row_key" varchar
  );
  
  CREATE TABLE "sp_addons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"text" varchar,
  	"href" varchar,
  	"link_text" varchar,
  	"price" varchar
  );
  
  CREATE TABLE "sp_mod_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "sp_mods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"price" varchar,
  	"row_key" varchar
  );
  
  CREATE TABLE "sp_grp_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"on" boolean,
  	"row_key" varchar
  );
  
  CREATE TABLE "sp_sel_opt" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"v" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "sp_sel" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"v" varchar,
  	"row_key" varchar
  );
  
  CREATE TABLE "sp_grp" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"toggle" varchar,
  	"multi" boolean,
  	"row_key" varchar
  );
  
  CREATE TABLE "sp_proj" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"text" varchar,
  	"best_for" varchar,
  	"timeline" varchar,
  	"row_key" varchar
  );
  
  CREATE TABLE "sp_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"src" varchar,
  	"year" numeric,
  	"url" varchar
  );
  
  CREATE TABLE "sp_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar
  );
  
  CREATE TABLE "sp_src" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "sp_fed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"k" "enum_sp_fed_k",
  	"text" varchar,
  	"gate" "enum_sp_fed_gate"
  );
  
  CREATE TABLE "sp_feeds" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"k" "enum_sp_feeds_k",
  	"text" varchar,
  	"gate" "enum_sp_feeds_gate",
  	"fallback" varchar
  );
  
  CREATE TABLE "service_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"key" "enum_service_pages_key",
  	"meta_no_index" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_service_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "service_pages_locales" (
  	"basics_name" varchar,
  	"basics_line" varchar,
  	"basics_h1" varchar,
  	"basics_price" varchar,
  	"basics_quote" varchar,
  	"basics_wa" varchar,
  	"content_answer" varchar,
  	"content_highlights_note" varchar,
  	"content_usp_heading" varchar,
  	"content_usp_lead" varchar,
  	"content_usp_accent" numeric,
  	"content_usp_pop" numeric,
  	"content_included_heading" varchar,
  	"content_included_lead" varchar,
  	"content_showcase" varchar,
  	"content_ai_page_behind_heading" varchar,
  	"content_ai_page_behind_lead" varchar,
  	"content_ai_page_engines_caption" varchar,
  	"content_ai_page_note" varchar,
  	"content_pricing_kind" "enum_service_pages_content_pricing_kind",
  	"content_pricing_note" varchar,
  	"content_pricing_builder" "enum_service_pages_content_pricing_builder",
  	"content_pricing_copy_heading" varchar,
  	"content_pricing_copy_intro" varchar,
  	"content_pricing_copy_empty" varchar,
  	"content_pricing_copy_summary" varchar,
  	"content_pricing_copy_price" varchar,
  	"content_pricing_price_value" numeric,
  	"content_pricing_discovery_label" varchar,
  	"content_pricing_discovery_wa" varchar,
  	"content_process" boolean,
  	"content_ai" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sp_trust_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_hl_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_usp_pts_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_usp_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"sub" varchar,
  	"logo" "enum__sp_usp_v_logo",
  	"tag" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_inc_items_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"badge" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_inc_tabs_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_ai_head_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_ai_rows_v_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_ai_rows_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_work_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"card" "enum__sp_work_v_card",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_tier_feat_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_tiers_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"price_value" numeric,
  	"period" varchar,
  	"best_for" varchar,
  	"is_popular" boolean,
  	"color" varchar,
  	"billing" varchar,
  	"note" varchar,
  	"platform_coverage" varchar,
  	"add_on_note" varchar,
  	"recommended_ad_spend" varchar,
  	"row_key" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_addons_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"text" varchar,
  	"href" varchar,
  	"link_text" varchar,
  	"price" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_mod_items_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_mods_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"price" varchar,
  	"row_key" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_grp_items_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"on" boolean,
  	"row_key" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_sel_opt_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"v" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_sel_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"v" varchar,
  	"row_key" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_grp_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"toggle" varchar,
  	"multi" boolean,
  	"row_key" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_proj_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"text" varchar,
  	"best_for" varchar,
  	"timeline" varchar,
  	"row_key" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_stats_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"src" varchar,
  	"year" numeric,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_faq_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_src_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_fed_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"k" "enum__sp_fed_v_k",
  	"text" varchar,
  	"gate" "enum__sp_fed_v_gate",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sp_feeds_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"k" "enum__sp_feeds_v_k",
  	"text" varchar,
  	"gate" "enum__sp_feeds_v_gate",
  	"fallback" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_service_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_key" "enum__service_pages_v_version_key",
  	"version_meta_no_index" boolean,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__service_pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__service_pages_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_service_pages_v_locales" (
  	"version_basics_name" varchar,
  	"version_basics_line" varchar,
  	"version_basics_h1" varchar,
  	"version_basics_price" varchar,
  	"version_basics_quote" varchar,
  	"version_basics_wa" varchar,
  	"version_content_answer" varchar,
  	"version_content_highlights_note" varchar,
  	"version_content_usp_heading" varchar,
  	"version_content_usp_lead" varchar,
  	"version_content_usp_accent" numeric,
  	"version_content_usp_pop" numeric,
  	"version_content_included_heading" varchar,
  	"version_content_included_lead" varchar,
  	"version_content_showcase" varchar,
  	"version_content_ai_page_behind_heading" varchar,
  	"version_content_ai_page_behind_lead" varchar,
  	"version_content_ai_page_engines_caption" varchar,
  	"version_content_ai_page_note" varchar,
  	"version_content_pricing_kind" "enum__service_pages_v_version_content_pricing_kind",
  	"version_content_pricing_note" varchar,
  	"version_content_pricing_builder" "enum__service_pages_v_version_content_pricing_builder",
  	"version_content_pricing_copy_heading" varchar,
  	"version_content_pricing_copy_intro" varchar,
  	"version_content_pricing_copy_empty" varchar,
  	"version_content_pricing_copy_summary" varchar,
  	"version_content_pricing_copy_price" varchar,
  	"version_content_pricing_price_value" numeric,
  	"version_content_pricing_discovery_label" varchar,
  	"version_content_pricing_discovery_wa" varchar,
  	"version_content_process" boolean,
  	"version_content_ai" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "legal_pages_content_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "lp_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "lp_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"row_key" varchar,
  	"title" varchar
  );
  
  CREATE TABLE "legal_pages_content_ask" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "legal_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"key" "enum_legal_pages_key",
  	"meta_no_index" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_legal_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "legal_pages_locales" (
  	"basics_h1" varchar,
  	"basics_wa" varchar,
  	"content_updated" varchar,
  	"content_lede" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_legal_pages_v_version_content_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_lp_items_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_lp_sections_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"row_key" varchar,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_legal_pages_v_version_content_ask" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_legal_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_key" "enum__legal_pages_v_version_key",
  	"version_meta_no_index" boolean,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__legal_pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__legal_pages_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_legal_pages_v_locales" (
  	"version_basics_h1" varchar,
  	"version_basics_wa" varchar,
  	"version_content_updated" varchar,
  	"version_content_lede" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_page_hero_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_hero_lines_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_c360_pillar_line" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_c360_pillar_line_locales" (
  	"line" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_process_groups_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_process_groups_steps_locales" (
  	"t" varchar,
  	"d" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_process_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_process_groups_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_faq_locales" (
  	"q" varchar,
  	"a" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "o0" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "q0" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum_q0_type",
  	"text" varchar
  );
  
  CREATE TABLE "o1" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "q1" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum_q1_type",
  	"text" varchar
  );
  
  CREATE TABLE "o2" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "q2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum_q2_type",
  	"text" varchar
  );
  
  CREATE TABLE "o3" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "q3" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum_q3_type",
  	"text" varchar
  );
  
  CREATE TABLE "o4" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "q4" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum_q4_type",
  	"text" varchar
  );
  
  CREATE TABLE "o5" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "q5" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum_q5_type",
  	"text" varchar
  );
  
  CREATE TABLE "o6" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "q6" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum_q6_type",
  	"text" varchar
  );
  
  CREATE TABLE "o7" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "q7" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum_q7_type",
  	"text" varchar
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_no_index" boolean,
  	"_status" "enum_home_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_locales" (
  	"basics_h1" varchar,
  	"basics_wa" varchar,
  	"hero_kicker" varchar,
  	"hero_sentence" varchar,
  	"hero_film_labels_pause" varchar,
  	"hero_film_labels_play" varchar,
  	"services_h_label" varchar,
  	"services_h_h2" varchar,
  	"outcome_seo" varchar,
  	"outcome_localseo" varchar,
  	"outcome_ads" varchar,
  	"outcome_social" varchar,
  	"outcome_creative" varchar,
  	"outcome_website" varchar,
  	"outcome_ai" varchar,
  	"c360_h2" varchar,
  	"c360_lead1" varchar,
  	"c360_lead4" varchar,
  	"c360_pillars_label" varchar,
  	"c360_one" varchar,
  	"c360_video_pause" varchar,
  	"c360_video_play" varchar,
  	"process_label" varchar,
  	"process_h2" varchar,
  	"process_lead" varchar,
  	"proof_label" varchar,
  	"proof_h2" varchar,
  	"proof_lede" varchar,
  	"proof_all" varchar,
  	"faq_h" varchar,
  	"more" varchar,
  	"profiler_h2" varchar,
  	"profiler_first" varchar,
  	"profiler_chip360" varchar,
  	"profiler_or_one" varchar,
  	"profiler_bot" varchar,
  	"chips_seo" varchar,
  	"chips_localseo" varchar,
  	"chips_ads" varchar,
  	"chips_social" varchar,
  	"chips_creative" varchar,
  	"chips_website" varchar,
  	"chips_ai" varchar,
  	"chat_ui_confirm" varchar,
  	"chat_ui_contact1" varchar,
  	"chat_ui_contact2" varchar,
  	"chat_ui_done1" varchar,
  	"chat_ui_done2" varchar,
  	"chat_ui_seo_redirect" varchar,
  	"chat_ui_last_q" varchar,
  	"chat_ui_multi" varchar,
  	"chat_ui_sent" varchar,
  	"chat_ui_restart" varchar,
  	"chat_ui_typing" varchar,
  	"chat_ui_step" varchar,
  	"chat_ui_form_nama" varchar,
  	"chat_ui_form_bisnis" varchar,
  	"chat_ui_form_email" varchar,
  	"chat_ui_form_wa" varchar,
  	"chat_ui_form_submit" varchar,
  	"chat_ui_form_req" varchar,
  	"chat_campaign_name" varchar,
  	"chat_campaign_confirm" varchar,
  	"chat_seo_name" varchar,
  	"chat_localseo_name" varchar,
  	"chat_ads_name" varchar,
  	"chat_social_name" varchar,
  	"chat_creative_name" varchar,
  	"chat_website_name" varchar,
  	"chat_ai_name" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_version_hero_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_hero_lines_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_version_c360_pillar_line" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_c360_pillar_line_locales" (
  	"line" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_version_process_groups_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_process_groups_steps_locales" (
  	"t" varchar,
  	"d" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_version_process_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_process_groups_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_version_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_faq_locales" (
  	"q" varchar,
  	"a" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_o0_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_q0_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum__q0_v_type",
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_o1_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_q1_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum__q1_v_type",
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_o2_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_q2_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum__q2_v_type",
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_o3_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_q3_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum__q3_v_type",
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_o4_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_q4_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum__q4_v_type",
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_o5_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_q5_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum__q5_v_type",
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_o6_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_q6_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum__q6_v_type",
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_o7_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_q7_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum__q7_v_type",
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_no_index" boolean,
  	"version__status" "enum__home_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__home_page_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_home_page_v_locales" (
  	"version_basics_h1" varchar,
  	"version_basics_wa" varchar,
  	"version_hero_kicker" varchar,
  	"version_hero_sentence" varchar,
  	"version_hero_film_labels_pause" varchar,
  	"version_hero_film_labels_play" varchar,
  	"version_services_h_label" varchar,
  	"version_services_h_h2" varchar,
  	"version_outcome_seo" varchar,
  	"version_outcome_localseo" varchar,
  	"version_outcome_ads" varchar,
  	"version_outcome_social" varchar,
  	"version_outcome_creative" varchar,
  	"version_outcome_website" varchar,
  	"version_outcome_ai" varchar,
  	"version_c360_h2" varchar,
  	"version_c360_lead1" varchar,
  	"version_c360_lead4" varchar,
  	"version_c360_pillars_label" varchar,
  	"version_c360_one" varchar,
  	"version_c360_video_pause" varchar,
  	"version_c360_video_play" varchar,
  	"version_process_label" varchar,
  	"version_process_h2" varchar,
  	"version_process_lead" varchar,
  	"version_proof_label" varchar,
  	"version_proof_h2" varchar,
  	"version_proof_lede" varchar,
  	"version_proof_all" varchar,
  	"version_faq_h" varchar,
  	"version_more" varchar,
  	"version_profiler_h2" varchar,
  	"version_profiler_first" varchar,
  	"version_profiler_chip360" varchar,
  	"version_profiler_or_one" varchar,
  	"version_profiler_bot" varchar,
  	"version_chips_seo" varchar,
  	"version_chips_localseo" varchar,
  	"version_chips_ads" varchar,
  	"version_chips_social" varchar,
  	"version_chips_creative" varchar,
  	"version_chips_website" varchar,
  	"version_chips_ai" varchar,
  	"version_chat_ui_confirm" varchar,
  	"version_chat_ui_contact1" varchar,
  	"version_chat_ui_contact2" varchar,
  	"version_chat_ui_done1" varchar,
  	"version_chat_ui_done2" varchar,
  	"version_chat_ui_seo_redirect" varchar,
  	"version_chat_ui_last_q" varchar,
  	"version_chat_ui_multi" varchar,
  	"version_chat_ui_sent" varchar,
  	"version_chat_ui_restart" varchar,
  	"version_chat_ui_typing" varchar,
  	"version_chat_ui_step" varchar,
  	"version_chat_ui_form_nama" varchar,
  	"version_chat_ui_form_bisnis" varchar,
  	"version_chat_ui_form_email" varchar,
  	"version_chat_ui_form_wa" varchar,
  	"version_chat_ui_form_submit" varchar,
  	"version_chat_ui_form_req" varchar,
  	"version_chat_campaign_name" varchar,
  	"version_chat_campaign_confirm" varchar,
  	"version_chat_seo_name" varchar,
  	"version_chat_localseo_name" varchar,
  	"version_chat_ads_name" varchar,
  	"version_chat_social_name" varchar,
  	"version_chat_creative_name" varchar,
  	"version_chat_website_name" varchar,
  	"version_chat_ai_name" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "hub_page_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "hub_page_faq_locales" (
  	"q" varchar,
  	"a" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "hub_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_no_index" boolean,
  	"_status" "enum_hub_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "hub_page_locales" (
  	"basics_h1" varchar,
  	"basics_wa" varchar,
  	"hub_crumb" varchar,
  	"hub_word" varchar,
  	"hub_lede" varchar,
  	"hub_table_h" varchar,
  	"hub_table_note" varchar,
  	"offer_h2" varchar,
  	"offer_lead1" varchar,
  	"offer_lead2" varchar,
  	"offer_lead3" varchar,
  	"offer_pillars_h" varchar,
  	"offer_proposal" varchar,
  	"faq_h" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_hub_page_v_version_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_hub_page_v_version_faq_locales" (
  	"q" varchar,
  	"a" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_hub_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_no_index" boolean,
  	"version__status" "enum__hub_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__hub_page_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_hub_page_v_locales" (
  	"version_basics_h1" varchar,
  	"version_basics_wa" varchar,
  	"version_hub_crumb" varchar,
  	"version_hub_word" varchar,
  	"version_hub_lede" varchar,
  	"version_hub_table_h" varchar,
  	"version_hub_table_note" varchar,
  	"version_offer_h2" varchar,
  	"version_offer_lead1" varchar,
  	"version_offer_lead2" varchar,
  	"version_offer_lead3" varchar,
  	"version_offer_pillars_h" varchar,
  	"version_offer_proposal" varchar,
  	"version_faq_h" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "about_page_story_who" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "about_page_story_ways" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "about_page_story_ways_locales" (
  	"t" varchar,
  	"d" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_why_why" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "about_page_why_why_locales" (
  	"t" varchar,
  	"d" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_why_not" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "about_page_aside_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "about_page_aside_facts_locales" (
  	"k" varchar,
  	"v" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_no_index" boolean,
  	"_status" "enum_about_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_locales" (
  	"basics_h1" varchar,
  	"basics_wa" varchar,
  	"top_crumb" varchar,
  	"top_eyebrow" varchar,
  	"top_intro" varchar,
  	"headings_sections_who" varchar,
  	"headings_sections_ways" varchar,
  	"headings_sections_how" varchar,
  	"headings_sections_why" varchar,
  	"headings_sections_not" varchar,
  	"headings_sections_services" varchar,
  	"story_ways_more" varchar,
  	"story_how_lead" varchar,
  	"aside_glance" varchar,
  	"aside_ask" varchar,
  	"aside_ask_sub" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_page_v_version_story_who" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_story_ways" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_story_ways_locales" (
  	"t" varchar,
  	"d" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_page_v_version_why_why" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_why_why_locales" (
  	"t" varchar,
  	"d" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_page_v_version_why_not" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_aside_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_aside_facts_locales" (
  	"k" varchar,
  	"v" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_no_index" boolean,
  	"version__status" "enum__about_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__about_page_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_about_page_v_locales" (
  	"version_basics_h1" varchar,
  	"version_basics_wa" varchar,
  	"version_top_crumb" varchar,
  	"version_top_eyebrow" varchar,
  	"version_top_intro" varchar,
  	"version_headings_sections_who" varchar,
  	"version_headings_sections_ways" varchar,
  	"version_headings_sections_how" varchar,
  	"version_headings_sections_why" varchar,
  	"version_headings_sections_not" varchar,
  	"version_headings_sections_services" varchar,
  	"version_story_ways_more" varchar,
  	"version_story_how_lead" varchar,
  	"version_aside_glance" varchar,
  	"version_aside_ask" varchar,
  	"version_aside_ask_sub" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_page_budget_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "contact_page_budget_options_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page_timeline_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "contact_page_timeline_options_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page_next_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_no_index" boolean,
  	"_status" "enum_contact_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_locales" (
  	"basics_h1" varchar,
  	"basics_wa" varchar,
  	"contact_lede" varchar,
  	"contact_official" varchar,
  	"contact_channels_h" varchar,
  	"contact_wa_name" varchar,
  	"contact_wa_note" varchar,
  	"contact_wa_ask" varchar,
  	"contact_one_eyebrow" varchar,
  	"contact_one_text" varchar,
  	"contact_one_cta" varchar,
  	"contact_c360_eyebrow" varchar,
  	"contact_c360_text" varchar,
  	"contact_c360_cta" varchar,
  	"contact_form_name" varchar,
  	"contact_form_note" varchar,
  	"contact_form_cta" varchar,
  	"contact_email_name" varchar,
  	"contact_email_note" varchar,
  	"form_intro_form_h" varchar,
  	"form_intro_form_lede" varchar,
  	"form_name" varchar,
  	"form_phone" varchar,
  	"form_email" varchar,
  	"form_message" varchar,
  	"form_req" varchar,
  	"form_phone_hint" varchar,
  	"form_message_ph" varchar,
  	"form_services" varchar,
  	"form_more" varchar,
  	"form_company" varchar,
  	"form_budget" varchar,
  	"form_timeline" varchar,
  	"form_choose" varchar,
  	"form_submit" varchar,
  	"form_sending" varchar,
  	"form_e_name" varchar,
  	"form_e_phone" varchar,
  	"form_e_email" varchar,
  	"form_e_message" varchar,
  	"form_fail" varchar,
  	"form_too_many" varchar,
  	"form_ok_h" varchar,
  	"form_ok_p" varchar,
  	"form_ok_wa" varchar,
  	"form_noscript" varchar,
  	"next_steps_h" varchar,
  	"next_steps_lede" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_contact_page_v_version_budget_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contact_page_v_version_budget_options_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_contact_page_v_version_timeline_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contact_page_v_version_timeline_options_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_contact_page_v_version_next_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contact_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_no_index" boolean,
  	"version__status" "enum__contact_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__contact_page_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_contact_page_v_locales" (
  	"version_basics_h1" varchar,
  	"version_basics_wa" varchar,
  	"version_contact_lede" varchar,
  	"version_contact_official" varchar,
  	"version_contact_channels_h" varchar,
  	"version_contact_wa_name" varchar,
  	"version_contact_wa_note" varchar,
  	"version_contact_wa_ask" varchar,
  	"version_contact_one_eyebrow" varchar,
  	"version_contact_one_text" varchar,
  	"version_contact_one_cta" varchar,
  	"version_contact_c360_eyebrow" varchar,
  	"version_contact_c360_text" varchar,
  	"version_contact_c360_cta" varchar,
  	"version_contact_form_name" varchar,
  	"version_contact_form_note" varchar,
  	"version_contact_form_cta" varchar,
  	"version_contact_email_name" varchar,
  	"version_contact_email_note" varchar,
  	"version_form_intro_form_h" varchar,
  	"version_form_intro_form_lede" varchar,
  	"version_form_name" varchar,
  	"version_form_phone" varchar,
  	"version_form_email" varchar,
  	"version_form_message" varchar,
  	"version_form_req" varchar,
  	"version_form_phone_hint" varchar,
  	"version_form_message_ph" varchar,
  	"version_form_services" varchar,
  	"version_form_more" varchar,
  	"version_form_company" varchar,
  	"version_form_budget" varchar,
  	"version_form_timeline" varchar,
  	"version_form_choose" varchar,
  	"version_form_submit" varchar,
  	"version_form_sending" varchar,
  	"version_form_e_name" varchar,
  	"version_form_e_phone" varchar,
  	"version_form_e_email" varchar,
  	"version_form_e_message" varchar,
  	"version_form_fail" varchar,
  	"version_form_too_many" varchar,
  	"version_form_ok_h" varchar,
  	"version_form_ok_p" varchar,
  	"version_form_ok_wa" varchar,
  	"version_form_noscript" varchar,
  	"version_next_steps_h" varchar,
  	"version_next_steps_lede" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "blog_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_no_index" boolean,
  	"_status" "enum_blog_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "blog_page_locales" (
  	"basics_h1" varchar,
  	"basics_wa" varchar,
  	"home_lede" varchar,
  	"home_latest" varchar,
  	"home_more" varchar,
  	"home_categories" varchar,
  	"home_all_cats" varchar,
  	"home_empty" varchar,
  	"categories_back_to_blog" varchar,
  	"categories_cat_nav" varchar,
  	"categories_cat_service" varchar,
  	"categories_count_one" varchar,
  	"categories_count_many" varchar,
  	"categories_h1_tpl" varchar,
  	"categories_title_tpl" varchar,
  	"categories_desc_tpl" varchar,
  	"labels_by" varchar,
  	"labels_published" varchar,
  	"labels_read_time" varchar,
  	"labels_min_read_tpl" varchar,
  	"labels_summary" varchar,
  	"labels_sources" varchar,
  	"labels_sources_note" varchar,
  	"labels_author" varchar,
  	"labels_author_line" varchar,
  	"labels_author_more" varchar,
  	"labels_related" varchar,
  	"labels_share" varchar,
  	"labels_copy" varchar,
  	"labels_copied" varchar,
  	"labels_rail_eyebrow" varchar,
  	"labels_rail_open" varchar,
  	"labels_rail360" varchar,
  	"labels_cross_heading" varchar,
  	"labels_feature_eyebrow" varchar,
  	"labels_inline_h_tpl" varchar,
  	"labels_inline_p" varchar,
  	"article_faq_heading" varchar,
  	"article_takeaways" varchar,
  	"article_tip_label" varchar,
  	"article_info_label" varchar,
  	"article_warning_label" varchar,
  	"article_service_eyebrow" varchar,
  	"article_service_open" varchar,
  	"article_wa_label" varchar,
  	"article_video_consent" varchar,
  	"article_video_watch" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_blog_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_no_index" boolean,
  	"version__status" "enum__blog_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__blog_page_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_blog_page_v_locales" (
  	"version_basics_h1" varchar,
  	"version_basics_wa" varchar,
  	"version_home_lede" varchar,
  	"version_home_latest" varchar,
  	"version_home_more" varchar,
  	"version_home_categories" varchar,
  	"version_home_all_cats" varchar,
  	"version_home_empty" varchar,
  	"version_categories_back_to_blog" varchar,
  	"version_categories_cat_nav" varchar,
  	"version_categories_cat_service" varchar,
  	"version_categories_count_one" varchar,
  	"version_categories_count_many" varchar,
  	"version_categories_h1_tpl" varchar,
  	"version_categories_title_tpl" varchar,
  	"version_categories_desc_tpl" varchar,
  	"version_labels_by" varchar,
  	"version_labels_published" varchar,
  	"version_labels_read_time" varchar,
  	"version_labels_min_read_tpl" varchar,
  	"version_labels_summary" varchar,
  	"version_labels_sources" varchar,
  	"version_labels_sources_note" varchar,
  	"version_labels_author" varchar,
  	"version_labels_author_line" varchar,
  	"version_labels_author_more" varchar,
  	"version_labels_related" varchar,
  	"version_labels_share" varchar,
  	"version_labels_copy" varchar,
  	"version_labels_copied" varchar,
  	"version_labels_rail_eyebrow" varchar,
  	"version_labels_rail_open" varchar,
  	"version_labels_rail360" varchar,
  	"version_labels_cross_heading" varchar,
  	"version_labels_feature_eyebrow" varchar,
  	"version_labels_inline_h_tpl" varchar,
  	"version_labels_inline_p" varchar,
  	"version_article_faq_heading" varchar,
  	"version_article_takeaways" varchar,
  	"version_article_tip_label" varchar,
  	"version_article_info_label" varchar,
  	"version_article_warning_label" varchar,
  	"version_article_service_eyebrow" varchar,
  	"version_article_service_open" varchar,
  	"version_article_wa_label" varchar,
  	"version_article_video_consent" varchar,
  	"version_article_video_watch" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "portfolio_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_no_index" boolean,
  	"_status" "enum_portfolio_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "portfolio_page_locales" (
  	"basics_h1" varchar,
  	"basics_wa" varchar,
  	"list_crumb" varchar,
  	"list_word" varchar,
  	"list_lede_tpl" varchar,
  	"list_cases_h" varchar,
  	"list_empty_h" varchar,
  	"list_empty" varchar,
  	"case_sections_ringkasan" varchar,
  	"case_sections_tantangan" varchar,
  	"case_sections_strategi" varchar,
  	"case_sections_hasil" varchar,
  	"case_subnav" varchar,
  	"case_start" varchar,
  	"case_services_used" varchar,
  	"case_client" varchar,
  	"case_timeline" varchar,
  	"case_period" varchar,
  	"case_source" varchar,
  	"case_month_one" varchar,
  	"case_month_many" varchar,
  	"case_within" varchar,
  	"case_related" varchar,
  	"case_pairs" varchar,
  	"case_empty_h" varchar,
  	"case_empty" varchar,
  	"case_cta_h" varchar,
  	"case_cta" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_portfolio_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_no_index" boolean,
  	"version__status" "enum__portfolio_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__portfolio_page_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_portfolio_page_v_locales" (
  	"version_basics_h1" varchar,
  	"version_basics_wa" varchar,
  	"version_list_crumb" varchar,
  	"version_list_word" varchar,
  	"version_list_lede_tpl" varchar,
  	"version_list_cases_h" varchar,
  	"version_list_empty_h" varchar,
  	"version_list_empty" varchar,
  	"version_case_sections_ringkasan" varchar,
  	"version_case_sections_tantangan" varchar,
  	"version_case_sections_strategi" varchar,
  	"version_case_sections_hasil" varchar,
  	"version_case_subnav" varchar,
  	"version_case_start" varchar,
  	"version_case_services_used" varchar,
  	"version_case_client" varchar,
  	"version_case_timeline" varchar,
  	"version_case_period" varchar,
  	"version_case_source" varchar,
  	"version_case_month_one" varchar,
  	"version_case_month_many" varchar,
  	"version_case_within" varchar,
  	"version_case_related" varchar,
  	"version_case_pairs" varchar,
  	"version_case_empty_h" varchar,
  	"version_case_empty" varchar,
  	"version_case_cta_h" varchar,
  	"version_case_cta" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "not_found_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_not_found_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "not_found_page_locales" (
  	"content_title" varchar,
  	"content_h1" varchar,
  	"content_text" varchar,
  	"content_pages_h" varchar,
  	"content_services_h" varchar,
  	"content_hub" varchar,
  	"content_wa_lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_not_found_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__not_found_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__not_found_page_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_not_found_page_v_locales" (
  	"version_content_title" varchar,
  	"version_content_h1" varchar,
  	"version_content_text" varchar,
  	"version_content_pages_h" varchar,
  	"version_content_services_h" varchar,
  	"version_content_hub" varchar,
  	"version_content_wa_lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "campaign_content_nodes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "campaign_content_nodes_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "campaign_content_edges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "campaign_content_edges_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "campaign_content_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "campaign_content_pillars_locales" (
  	"dt" varchar,
  	"dd" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "campaign_content_table_head" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "campaign_content_extras" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "campaign_content_extras_locales" (
  	"item_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "campaign_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_campaign_content_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "campaign_content_locales" (
  	"center" varchar,
  	"strategy" varchar,
  	"report" varchar,
  	"table_caption" varchar,
  	"table_row_note_social" varchar,
  	"table_row_note_ads" varchar,
  	"table_summary" varchar,
  	"table_foot" varchar,
  	"note_link" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_campaign_content_v_version_nodes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_campaign_content_v_version_nodes_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_campaign_content_v_version_edges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_campaign_content_v_version_edges_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_campaign_content_v_version_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_campaign_content_v_version_pillars_locales" (
  	"dt" varchar,
  	"dd" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_campaign_content_v_version_table_head" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_campaign_content_v_version_extras" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_campaign_content_v_version_extras_locales" (
  	"item_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_campaign_content_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__campaign_content_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__campaign_content_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_campaign_content_v_locales" (
  	"version_center" varchar,
  	"version_strategy" varchar,
  	"version_report" varchar,
  	"version_table_caption" varchar,
  	"version_table_row_note_social" varchar,
  	"version_table_row_note_ads" varchar,
  	"version_table_summary" varchar,
  	"version_table_foot" varchar,
  	"version_note_link" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "instruments_content_common_annot" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "instruments_content_serp_places" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "instruments_content_serp_places_locales" (
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "instruments_content_instagram_tiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "instruments_content_site_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "instruments_content_site_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "instruments_content_site_gauges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"v" numeric
  );
  
  CREATE TABLE "instruments_content_site_gauges_locales" (
  	"k" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "instruments_content_funnel_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "instruments_content_funnel_steps_locales" (
  	"k" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "instruments_content_ai_answer_cites" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "instruments_content_ai_answer_cites_locales" (
  	"t" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "instruments_content_prompts_head" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "instruments_content_prompts_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"url" varchar,
  	"pos" varchar
  );
  
  CREATE TABLE "instruments_content_fanout_subs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar
  );
  
  CREATE TABLE "instruments_content_fanout_subs_locales" (
  	"src" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "instruments_content_report_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"src" varchar
  );
  
  CREATE TABLE "instruments_content_report_panels_locales" (
  	"k" varchar,
  	"v" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "instruments_content_calendar_days" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "instruments_content_calendar_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "instruments_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"serp_url" varchar,
  	"serp_title" varchar,
  	"review_who" varchar,
  	"review_text" varchar,
  	"report_goal_v" varchar,
  	"chat_out" varchar,
  	"chat_reply" varchar,
  	"chat_out2" varchar,
  	"_status" "enum_instruments_content_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "instruments_content_locales" (
  	"common_mock_label" varchar,
  	"common_mock_label_photo" varchar,
  	"common_sample" varchar,
  	"common_annot_toggle" varchar,
  	"serp_text" varchar,
  	"serp_rank" varchar,
  	"serp_map" varchar,
  	"serp_open" varchar,
  	"instagram_bio" varchar,
  	"instagram_follow" varchar,
  	"review_kind" varchar,
  	"site_sub" varchar,
  	"site_cta" varchar,
  	"site_gauge_tag" varchar,
  	"funnel_title" varchar,
  	"funnel_pill" varchar,
  	"ai_answer_answer" varchar,
  	"ai_answer_sources" varchar,
  	"prompts_caption" varchar,
  	"prompts_yes" varchar,
  	"prompts_no" varchar,
  	"share_of_voice_title" varchar,
  	"share_of_voice_note" varchar,
  	"crawler_title" varchar,
  	"crawler_pause" varchar,
  	"crawler_region" varchar,
  	"fanout_title" varchar,
  	"structured_data_title" varchar,
  	"report_title" varchar,
  	"report_goal_k" varchar,
  	"report_foot" varchar,
  	"measure_heading" varchar,
  	"measure_text" varchar,
  	"ad_chat_sponsored" varchar,
  	"ad_chat_headline" varchar,
  	"ad_chat_cta" varchar,
  	"calendar_title" varchar,
  	"calendar_draft" varchar,
  	"calendar_caption" varchar,
  	"campaign_map_legend" varchar,
  	"campaign_map_all" varchar,
  	"campaign_map_caption" varchar,
  	"campaign_map_centre_sub" varchar,
  	"campaign_map_night_yes" varchar,
  	"campaign_map_night_no" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_instruments_content_v_version_common_annot" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_instruments_content_v_version_serp_places" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_instruments_content_v_version_serp_places_locales" (
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_instruments_content_v_version_instagram_tiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_instruments_content_v_version_site_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_instruments_content_v_version_site_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_instruments_content_v_version_site_gauges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"v" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_instruments_content_v_version_site_gauges_locales" (
  	"k" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_instruments_content_v_version_funnel_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_instruments_content_v_version_funnel_steps_locales" (
  	"k" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_instruments_content_v_version_ai_answer_cites" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_instruments_content_v_version_ai_answer_cites_locales" (
  	"t" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_instruments_content_v_version_prompts_head" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_instruments_content_v_version_prompts_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"url" varchar,
  	"pos" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_instruments_content_v_version_fanout_subs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_instruments_content_v_version_fanout_subs_locales" (
  	"src" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_instruments_content_v_version_report_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"src" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_instruments_content_v_version_report_panels_locales" (
  	"k" varchar,
  	"v" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_instruments_content_v_version_calendar_days" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_instruments_content_v_version_calendar_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_instruments_content_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_serp_url" varchar,
  	"version_serp_title" varchar,
  	"version_review_who" varchar,
  	"version_review_text" varchar,
  	"version_report_goal_v" varchar,
  	"version_chat_out" varchar,
  	"version_chat_reply" varchar,
  	"version_chat_out2" varchar,
  	"version__status" "enum__instruments_content_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__instruments_content_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_instruments_content_v_locales" (
  	"version_common_mock_label" varchar,
  	"version_common_mock_label_photo" varchar,
  	"version_common_sample" varchar,
  	"version_common_annot_toggle" varchar,
  	"version_serp_text" varchar,
  	"version_serp_rank" varchar,
  	"version_serp_map" varchar,
  	"version_serp_open" varchar,
  	"version_instagram_bio" varchar,
  	"version_instagram_follow" varchar,
  	"version_review_kind" varchar,
  	"version_site_sub" varchar,
  	"version_site_cta" varchar,
  	"version_site_gauge_tag" varchar,
  	"version_funnel_title" varchar,
  	"version_funnel_pill" varchar,
  	"version_ai_answer_answer" varchar,
  	"version_ai_answer_sources" varchar,
  	"version_prompts_caption" varchar,
  	"version_prompts_yes" varchar,
  	"version_prompts_no" varchar,
  	"version_share_of_voice_title" varchar,
  	"version_share_of_voice_note" varchar,
  	"version_crawler_title" varchar,
  	"version_crawler_pause" varchar,
  	"version_crawler_region" varchar,
  	"version_fanout_title" varchar,
  	"version_structured_data_title" varchar,
  	"version_report_title" varchar,
  	"version_report_goal_k" varchar,
  	"version_report_foot" varchar,
  	"version_measure_heading" varchar,
  	"version_measure_text" varchar,
  	"version_ad_chat_sponsored" varchar,
  	"version_ad_chat_headline" varchar,
  	"version_ad_chat_cta" varchar,
  	"version_calendar_title" varchar,
  	"version_calendar_draft" varchar,
  	"version_calendar_caption" varchar,
  	"version_campaign_map_legend" varchar,
  	"version_campaign_map_all" varchar,
  	"version_campaign_map_caption" varchar,
  	"version_campaign_map_centre_sub" varchar,
  	"version_campaign_map_night_yes" varchar,
  	"version_campaign_map_night_no" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings_locales" (
  	"entity" varchar,
  	"anti_scam" varchar,
  	"ai_disclosure" varchar,
  	"ai_baseline" varchar,
  	"wa_templates_case_study" varchar,
  	"wa_templates_category" varchar,
  	"wa_templates_post" varchar,
  	"wa_templates_tier" varchar,
  	"wa_templates_generic" varchar,
  	"wa_templates_campaign360" varchar,
  	"wa_templates_upgrade" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_site_name" varchar DEFAULT 'Logink',
  	"version_tagline" varchar,
  	"version_contact_email" varchar,
  	"version_whatsapp_number" varchar,
  	"version_instagram" varchar,
  	"version_address" varchar,
  	"version_default_og_image_id" integer,
  	"version__status" "enum__site_settings_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__site_settings_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_site_settings_v_locales" (
  	"version_entity" varchar,
  	"version_anti_scam" varchar,
  	"version_ai_disclosure" varchar,
  	"version_ai_baseline" varchar,
  	"version_wa_templates_case_study" varchar,
  	"version_wa_templates_category" varchar,
  	"version_wa_templates_post" varchar,
  	"version_wa_templates_tier" varchar,
  	"version_wa_templates_generic" varchar,
  	"version_wa_templates_campaign360" varchar,
  	"version_wa_templates_upgrade" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "ui_labels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_ui_labels_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "ui_labels_locales" (
  	"nav_services" varchar,
  	"nav_portfolio" varchar,
  	"nav_blog" varchar,
  	"nav_about" varchar,
  	"nav_contact" varchar,
  	"nav_home" varchar,
  	"nav_menu" varchar,
  	"nav_close" varchar,
  	"nav_skip" varchar,
  	"nav_main_nav" varchar,
  	"nav_quick" varchar,
  	"nav_crumbs" varchar,
  	"nav_lang_name" varchar,
  	"buttons_quote" varchar,
  	"buttons_quote_short" varchar,
  	"buttons_wa" varchar,
  	"buttons_open_service" varchar,
  	"buttons_view_case" varchar,
  	"buttons_drag" varchar,
  	"buttons_all_services" varchar,
  	"page_labels_updated" varchar,
  	"page_labels_reviewed_by" varchar,
  	"page_labels_from" varchar,
  	"page_labels_toc" varchar,
  	"page_labels_faq" varchar,
  	"page_labels_populer" varchar,
  	"page_labels_contoh" varchar,
  	"page_labels_loop" varchar,
  	"closing_closing_h" varchar,
  	"closing_closing_lede" varchar,
  	"closing_ask360" varchar,
  	"campaign_one_service" varchar,
  	"campaign_every" varchar,
  	"campaign_c360" varchar,
  	"campaign_c360_item" varchar,
  	"campaign_c360_line" varchar,
  	"campaign_c360_how" varchar,
  	"campaign_c360_chat" varchar,
  	"footer_pages" varchar,
  	"footer_reach" varchar,
  	"footer_city" varchar,
  	"stage_names_seo" varchar,
  	"stage_names_localseo" varchar,
  	"stage_names_ads" varchar,
  	"stage_names_social" varchar,
  	"stage_names_creative" varchar,
  	"stage_names_website" varchar,
  	"stage_names_ai" varchar,
  	"service_template_answer" varchar,
  	"service_template_facts" varchar,
  	"service_template_price_row" varchar,
  	"service_template_campaign" varchar,
  	"service_template_fed_by" varchar,
  	"service_template_feeds" varchar,
  	"service_template_wa" varchar,
  	"service_template_strategy" varchar,
  	"service_template_work" varchar,
  	"service_template_pricing" varchar,
  	"service_template_choose" varchar,
  	"service_template_addons" varchar,
  	"service_template_proof" varchar,
  	"service_template_no_case" varchar,
  	"service_template_process" varchar,
  	"service_template_ai" varchar,
  	"service_template_ai_more" varchar,
  	"service_template_faq" varchar,
  	"service_template_sources" varchar,
  	"service_template_pairs" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ui_labels_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__ui_labels_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__ui_labels_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_ui_labels_v_locales" (
  	"version_nav_services" varchar,
  	"version_nav_portfolio" varchar,
  	"version_nav_blog" varchar,
  	"version_nav_about" varchar,
  	"version_nav_contact" varchar,
  	"version_nav_home" varchar,
  	"version_nav_menu" varchar,
  	"version_nav_close" varchar,
  	"version_nav_skip" varchar,
  	"version_nav_main_nav" varchar,
  	"version_nav_quick" varchar,
  	"version_nav_crumbs" varchar,
  	"version_nav_lang_name" varchar,
  	"version_buttons_quote" varchar,
  	"version_buttons_quote_short" varchar,
  	"version_buttons_wa" varchar,
  	"version_buttons_open_service" varchar,
  	"version_buttons_view_case" varchar,
  	"version_buttons_drag" varchar,
  	"version_buttons_all_services" varchar,
  	"version_page_labels_updated" varchar,
  	"version_page_labels_reviewed_by" varchar,
  	"version_page_labels_from" varchar,
  	"version_page_labels_toc" varchar,
  	"version_page_labels_faq" varchar,
  	"version_page_labels_populer" varchar,
  	"version_page_labels_contoh" varchar,
  	"version_page_labels_loop" varchar,
  	"version_closing_closing_h" varchar,
  	"version_closing_closing_lede" varchar,
  	"version_closing_ask360" varchar,
  	"version_campaign_one_service" varchar,
  	"version_campaign_every" varchar,
  	"version_campaign_c360" varchar,
  	"version_campaign_c360_item" varchar,
  	"version_campaign_c360_line" varchar,
  	"version_campaign_c360_how" varchar,
  	"version_campaign_c360_chat" varchar,
  	"version_footer_pages" varchar,
  	"version_footer_reach" varchar,
  	"version_footer_city" varchar,
  	"version_stage_names_seo" varchar,
  	"version_stage_names_localseo" varchar,
  	"version_stage_names_ads" varchar,
  	"version_stage_names_social" varchar,
  	"version_stage_names_creative" varchar,
  	"version_stage_names_website" varchar,
  	"version_stage_names_ai" varchar,
  	"version_service_template_answer" varchar,
  	"version_service_template_facts" varchar,
  	"version_service_template_price_row" varchar,
  	"version_service_template_campaign" varchar,
  	"version_service_template_fed_by" varchar,
  	"version_service_template_feeds" varchar,
  	"version_service_template_wa" varchar,
  	"version_service_template_strategy" varchar,
  	"version_service_template_work" varchar,
  	"version_service_template_pricing" varchar,
  	"version_service_template_choose" varchar,
  	"version_service_template_addons" varchar,
  	"version_service_template_proof" varchar,
  	"version_service_template_no_case" varchar,
  	"version_service_template_process" varchar,
  	"version_service_template_ai" varchar,
  	"version_service_template_ai_more" varchar,
  	"version_service_template_faq" varchar,
  	"version_service_template_sources" varchar,
  	"version_service_template_pairs" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "posts" ADD COLUMN "related_service" "enum_posts_related_service";
  ALTER TABLE "posts" ADD COLUMN "show_feature_card" boolean DEFAULT true;
  ALTER TABLE "posts" ADD COLUMN "mid_cta_show" boolean DEFAULT true;
  ALTER TABLE "posts" ADD COLUMN "mid_cta_position" "enum_posts_mid_cta_position" DEFAULT 'middle';
  ALTER TABLE "posts" ADD COLUMN "no_index" boolean;
  ALTER TABLE "users" ADD COLUMN "job_title_id" varchar;
  ALTER TABLE "users" ADD COLUMN "job_title_en" varchar;
  ALTER TABLE "users" ADD COLUMN "bio_id" varchar;
  ALTER TABLE "users" ADD COLUMN "bio_en" varchar;
  ALTER TABLE "users" ADD COLUMN "profile_url" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "service_pages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "legal_pages_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "_status" "enum_site_settings_status" DEFAULT 'draft';
  ALTER TABLE "posts_faq_id" ADD CONSTRAINT "posts_faq_id_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_faq_en" ADD CONSTRAINT "posts_faq_en_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_trust" ADD CONSTRAINT "sp_trust_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_hl" ADD CONSTRAINT "sp_hl_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_usp_pts" ADD CONSTRAINT "sp_usp_pts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_usp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_usp" ADD CONSTRAINT "sp_usp_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_inc_items" ADD CONSTRAINT "sp_inc_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_inc_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_inc_tabs" ADD CONSTRAINT "sp_inc_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_ai_head" ADD CONSTRAINT "sp_ai_head_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_ai_rows_cells" ADD CONSTRAINT "sp_ai_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_ai_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_ai_rows" ADD CONSTRAINT "sp_ai_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_work" ADD CONSTRAINT "sp_work_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_tier_feat" ADD CONSTRAINT "sp_tier_feat_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_tiers" ADD CONSTRAINT "sp_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_addons" ADD CONSTRAINT "sp_addons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_mod_items" ADD CONSTRAINT "sp_mod_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_mods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_mods" ADD CONSTRAINT "sp_mods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_grp_items" ADD CONSTRAINT "sp_grp_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_grp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_sel_opt" ADD CONSTRAINT "sp_sel_opt_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_sel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_sel" ADD CONSTRAINT "sp_sel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_grp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_grp" ADD CONSTRAINT "sp_grp_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_proj" ADD CONSTRAINT "sp_proj_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_stats" ADD CONSTRAINT "sp_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_faq" ADD CONSTRAINT "sp_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_src" ADD CONSTRAINT "sp_src_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_fed" ADD CONSTRAINT "sp_fed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_feeds" ADD CONSTRAINT "sp_feeds_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_locales" ADD CONSTRAINT "service_pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "service_pages_locales" ADD CONSTRAINT "service_pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_trust_v" ADD CONSTRAINT "_sp_trust_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_hl_v" ADD CONSTRAINT "_sp_hl_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_usp_pts_v" ADD CONSTRAINT "_sp_usp_pts_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sp_usp_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_usp_v" ADD CONSTRAINT "_sp_usp_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_inc_items_v" ADD CONSTRAINT "_sp_inc_items_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sp_inc_tabs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_inc_tabs_v" ADD CONSTRAINT "_sp_inc_tabs_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_ai_head_v" ADD CONSTRAINT "_sp_ai_head_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_ai_rows_v_cells" ADD CONSTRAINT "_sp_ai_rows_v_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sp_ai_rows_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_ai_rows_v" ADD CONSTRAINT "_sp_ai_rows_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_work_v" ADD CONSTRAINT "_sp_work_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_tier_feat_v" ADD CONSTRAINT "_sp_tier_feat_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sp_tiers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_tiers_v" ADD CONSTRAINT "_sp_tiers_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_addons_v" ADD CONSTRAINT "_sp_addons_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_mod_items_v" ADD CONSTRAINT "_sp_mod_items_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sp_mods_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_mods_v" ADD CONSTRAINT "_sp_mods_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_grp_items_v" ADD CONSTRAINT "_sp_grp_items_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sp_grp_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_sel_opt_v" ADD CONSTRAINT "_sp_sel_opt_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sp_sel_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_sel_v" ADD CONSTRAINT "_sp_sel_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sp_grp_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_grp_v" ADD CONSTRAINT "_sp_grp_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_proj_v" ADD CONSTRAINT "_sp_proj_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_stats_v" ADD CONSTRAINT "_sp_stats_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_faq_v" ADD CONSTRAINT "_sp_faq_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_src_v" ADD CONSTRAINT "_sp_src_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_fed_v" ADD CONSTRAINT "_sp_fed_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sp_feeds_v" ADD CONSTRAINT "_sp_feeds_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_service_pages_v" ADD CONSTRAINT "_service_pages_v_parent_id_service_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."service_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_service_pages_v_locales" ADD CONSTRAINT "_service_pages_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_service_pages_v_locales" ADD CONSTRAINT "_service_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_pages_content_intro" ADD CONSTRAINT "legal_pages_content_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lp_items" ADD CONSTRAINT "lp_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lp_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lp_sections" ADD CONSTRAINT "lp_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_pages_content_ask" ADD CONSTRAINT "legal_pages_content_ask_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_pages_locales" ADD CONSTRAINT "legal_pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "legal_pages_locales" ADD CONSTRAINT "legal_pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_legal_pages_v_version_content_intro" ADD CONSTRAINT "_legal_pages_v_version_content_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_legal_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lp_items_v" ADD CONSTRAINT "_lp_items_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lp_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lp_sections_v" ADD CONSTRAINT "_lp_sections_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_legal_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_legal_pages_v_version_content_ask" ADD CONSTRAINT "_legal_pages_v_version_content_ask_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_legal_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_legal_pages_v" ADD CONSTRAINT "_legal_pages_v_parent_id_legal_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."legal_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_legal_pages_v_locales" ADD CONSTRAINT "_legal_pages_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_legal_pages_v_locales" ADD CONSTRAINT "_legal_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_legal_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_lines" ADD CONSTRAINT "home_page_hero_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_lines_locales" ADD CONSTRAINT "home_page_hero_lines_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_hero_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_c360_pillar_line" ADD CONSTRAINT "home_page_c360_pillar_line_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_c360_pillar_line_locales" ADD CONSTRAINT "home_page_c360_pillar_line_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_c360_pillar_line"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_process_groups_steps" ADD CONSTRAINT "home_page_process_groups_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_process_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_process_groups_steps_locales" ADD CONSTRAINT "home_page_process_groups_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_process_groups_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_process_groups" ADD CONSTRAINT "home_page_process_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_process_groups_locales" ADD CONSTRAINT "home_page_process_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_process_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_faq" ADD CONSTRAINT "home_page_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_faq_locales" ADD CONSTRAINT "home_page_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "o0" ADD CONSTRAINT "o0_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."q0"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "q0" ADD CONSTRAINT "q0_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "o1" ADD CONSTRAINT "o1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."q1"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "q1" ADD CONSTRAINT "q1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "o2" ADD CONSTRAINT "o2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."q2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "q2" ADD CONSTRAINT "q2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "o3" ADD CONSTRAINT "o3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."q3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "q3" ADD CONSTRAINT "q3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "o4" ADD CONSTRAINT "o4_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."q4"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "q4" ADD CONSTRAINT "q4_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "o5" ADD CONSTRAINT "o5_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."q5"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "q5" ADD CONSTRAINT "q5_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "o6" ADD CONSTRAINT "o6_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."q6"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "q6" ADD CONSTRAINT "q6_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "o7" ADD CONSTRAINT "o7_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."q7"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "q7" ADD CONSTRAINT "q7_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_hero_lines" ADD CONSTRAINT "_home_page_v_version_hero_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_hero_lines_locales" ADD CONSTRAINT "_home_page_v_version_hero_lines_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_hero_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_c360_pillar_line" ADD CONSTRAINT "_home_page_v_version_c360_pillar_line_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_c360_pillar_line_locales" ADD CONSTRAINT "_home_page_v_version_c360_pillar_line_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_c360_pillar_line"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_process_groups_steps" ADD CONSTRAINT "_home_page_v_version_process_groups_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_process_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_process_groups_steps_locales" ADD CONSTRAINT "_home_page_v_version_process_groups_steps_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_process_groups_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_process_groups" ADD CONSTRAINT "_home_page_v_version_process_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_process_groups_locales" ADD CONSTRAINT "_home_page_v_version_process_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_process_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_faq" ADD CONSTRAINT "_home_page_v_version_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_faq_locales" ADD CONSTRAINT "_home_page_v_version_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_o0_v" ADD CONSTRAINT "_o0_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_q0_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_q0_v" ADD CONSTRAINT "_q0_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_o1_v" ADD CONSTRAINT "_o1_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_q1_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_q1_v" ADD CONSTRAINT "_q1_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_o2_v" ADD CONSTRAINT "_o2_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_q2_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_q2_v" ADD CONSTRAINT "_q2_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_o3_v" ADD CONSTRAINT "_o3_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_q3_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_q3_v" ADD CONSTRAINT "_q3_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_o4_v" ADD CONSTRAINT "_o4_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_q4_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_q4_v" ADD CONSTRAINT "_q4_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_o5_v" ADD CONSTRAINT "_o5_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_q5_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_q5_v" ADD CONSTRAINT "_q5_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_o6_v" ADD CONSTRAINT "_o6_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_q6_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_q6_v" ADD CONSTRAINT "_q6_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_o7_v" ADD CONSTRAINT "_o7_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_q7_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_q7_v" ADD CONSTRAINT "_q7_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_locales" ADD CONSTRAINT "_home_page_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_locales" ADD CONSTRAINT "_home_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hub_page_faq" ADD CONSTRAINT "hub_page_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hub_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hub_page_faq_locales" ADD CONSTRAINT "hub_page_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hub_page_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hub_page_locales" ADD CONSTRAINT "hub_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hub_page_locales" ADD CONSTRAINT "hub_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hub_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hub_page_v_version_faq" ADD CONSTRAINT "_hub_page_v_version_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hub_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hub_page_v_version_faq_locales" ADD CONSTRAINT "_hub_page_v_version_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hub_page_v_version_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hub_page_v_locales" ADD CONSTRAINT "_hub_page_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hub_page_v_locales" ADD CONSTRAINT "_hub_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hub_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_story_who" ADD CONSTRAINT "about_page_story_who_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_story_ways" ADD CONSTRAINT "about_page_story_ways_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_story_ways_locales" ADD CONSTRAINT "about_page_story_ways_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_story_ways"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_why_why" ADD CONSTRAINT "about_page_why_why_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_why_why_locales" ADD CONSTRAINT "about_page_why_why_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_why_why"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_why_not" ADD CONSTRAINT "about_page_why_not_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_aside_facts" ADD CONSTRAINT "about_page_aside_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_aside_facts_locales" ADD CONSTRAINT "about_page_aside_facts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_aside_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_locales" ADD CONSTRAINT "about_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_locales" ADD CONSTRAINT "about_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_story_who" ADD CONSTRAINT "_about_page_v_version_story_who_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_story_ways" ADD CONSTRAINT "_about_page_v_version_story_ways_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_story_ways_locales" ADD CONSTRAINT "_about_page_v_version_story_ways_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v_version_story_ways"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_why_why" ADD CONSTRAINT "_about_page_v_version_why_why_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_why_why_locales" ADD CONSTRAINT "_about_page_v_version_why_why_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v_version_why_why"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_why_not" ADD CONSTRAINT "_about_page_v_version_why_not_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_aside_facts" ADD CONSTRAINT "_about_page_v_version_aside_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_aside_facts_locales" ADD CONSTRAINT "_about_page_v_version_aside_facts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v_version_aside_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_locales" ADD CONSTRAINT "_about_page_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_locales" ADD CONSTRAINT "_about_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_budget_options" ADD CONSTRAINT "contact_page_budget_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_budget_options_locales" ADD CONSTRAINT "contact_page_budget_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_budget_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_timeline_options" ADD CONSTRAINT "contact_page_timeline_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_timeline_options_locales" ADD CONSTRAINT "contact_page_timeline_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_timeline_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_next_steps" ADD CONSTRAINT "contact_page_next_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_locales" ADD CONSTRAINT "contact_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_locales" ADD CONSTRAINT "contact_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_page_v_version_budget_options" ADD CONSTRAINT "_contact_page_v_version_budget_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contact_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_page_v_version_budget_options_locales" ADD CONSTRAINT "_contact_page_v_version_budget_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contact_page_v_version_budget_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_page_v_version_timeline_options" ADD CONSTRAINT "_contact_page_v_version_timeline_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contact_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_page_v_version_timeline_options_locales" ADD CONSTRAINT "_contact_page_v_version_timeline_options_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contact_page_v_version_timeline_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_page_v_version_next_steps" ADD CONSTRAINT "_contact_page_v_version_next_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contact_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_page_v_locales" ADD CONSTRAINT "_contact_page_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contact_page_v_locales" ADD CONSTRAINT "_contact_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contact_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page_locales" ADD CONSTRAINT "blog_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_page_locales" ADD CONSTRAINT "blog_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_page_v_locales" ADD CONSTRAINT "_blog_page_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_page_v_locales" ADD CONSTRAINT "_blog_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_page_locales" ADD CONSTRAINT "portfolio_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio_page_locales" ADD CONSTRAINT "portfolio_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_page_v_locales" ADD CONSTRAINT "_portfolio_page_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolio_page_v_locales" ADD CONSTRAINT "_portfolio_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_page_locales" ADD CONSTRAINT "not_found_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."not_found_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_not_found_page_v_locales" ADD CONSTRAINT "_not_found_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_not_found_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campaign_content_nodes" ADD CONSTRAINT "campaign_content_nodes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campaign_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campaign_content_nodes_locales" ADD CONSTRAINT "campaign_content_nodes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campaign_content_nodes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campaign_content_edges" ADD CONSTRAINT "campaign_content_edges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campaign_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campaign_content_edges_locales" ADD CONSTRAINT "campaign_content_edges_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campaign_content_edges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campaign_content_pillars" ADD CONSTRAINT "campaign_content_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campaign_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campaign_content_pillars_locales" ADD CONSTRAINT "campaign_content_pillars_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campaign_content_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campaign_content_table_head" ADD CONSTRAINT "campaign_content_table_head_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campaign_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campaign_content_extras" ADD CONSTRAINT "campaign_content_extras_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campaign_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campaign_content_extras_locales" ADD CONSTRAINT "campaign_content_extras_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campaign_content_extras"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campaign_content_locales" ADD CONSTRAINT "campaign_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campaign_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_campaign_content_v_version_nodes" ADD CONSTRAINT "_campaign_content_v_version_nodes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_campaign_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_campaign_content_v_version_nodes_locales" ADD CONSTRAINT "_campaign_content_v_version_nodes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_campaign_content_v_version_nodes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_campaign_content_v_version_edges" ADD CONSTRAINT "_campaign_content_v_version_edges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_campaign_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_campaign_content_v_version_edges_locales" ADD CONSTRAINT "_campaign_content_v_version_edges_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_campaign_content_v_version_edges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_campaign_content_v_version_pillars" ADD CONSTRAINT "_campaign_content_v_version_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_campaign_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_campaign_content_v_version_pillars_locales" ADD CONSTRAINT "_campaign_content_v_version_pillars_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_campaign_content_v_version_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_campaign_content_v_version_table_head" ADD CONSTRAINT "_campaign_content_v_version_table_head_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_campaign_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_campaign_content_v_version_extras" ADD CONSTRAINT "_campaign_content_v_version_extras_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_campaign_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_campaign_content_v_version_extras_locales" ADD CONSTRAINT "_campaign_content_v_version_extras_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_campaign_content_v_version_extras"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_campaign_content_v_locales" ADD CONSTRAINT "_campaign_content_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_campaign_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instruments_content_common_annot" ADD CONSTRAINT "instruments_content_common_annot_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instruments_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instruments_content_serp_places" ADD CONSTRAINT "instruments_content_serp_places_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instruments_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instruments_content_serp_places_locales" ADD CONSTRAINT "instruments_content_serp_places_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instruments_content_serp_places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instruments_content_instagram_tiles" ADD CONSTRAINT "instruments_content_instagram_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instruments_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instruments_content_site_nav" ADD CONSTRAINT "instruments_content_site_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instruments_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instruments_content_site_menu" ADD CONSTRAINT "instruments_content_site_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instruments_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instruments_content_site_gauges" ADD CONSTRAINT "instruments_content_site_gauges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instruments_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instruments_content_site_gauges_locales" ADD CONSTRAINT "instruments_content_site_gauges_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instruments_content_site_gauges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instruments_content_funnel_steps" ADD CONSTRAINT "instruments_content_funnel_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instruments_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instruments_content_funnel_steps_locales" ADD CONSTRAINT "instruments_content_funnel_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instruments_content_funnel_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instruments_content_ai_answer_cites" ADD CONSTRAINT "instruments_content_ai_answer_cites_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instruments_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instruments_content_ai_answer_cites_locales" ADD CONSTRAINT "instruments_content_ai_answer_cites_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instruments_content_ai_answer_cites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instruments_content_prompts_head" ADD CONSTRAINT "instruments_content_prompts_head_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instruments_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instruments_content_prompts_rows" ADD CONSTRAINT "instruments_content_prompts_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instruments_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instruments_content_fanout_subs" ADD CONSTRAINT "instruments_content_fanout_subs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instruments_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instruments_content_fanout_subs_locales" ADD CONSTRAINT "instruments_content_fanout_subs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instruments_content_fanout_subs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instruments_content_report_panels" ADD CONSTRAINT "instruments_content_report_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instruments_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instruments_content_report_panels_locales" ADD CONSTRAINT "instruments_content_report_panels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instruments_content_report_panels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instruments_content_calendar_days" ADD CONSTRAINT "instruments_content_calendar_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instruments_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instruments_content_calendar_items" ADD CONSTRAINT "instruments_content_calendar_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instruments_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instruments_content_locales" ADD CONSTRAINT "instruments_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instruments_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_instruments_content_v_version_common_annot" ADD CONSTRAINT "_instruments_content_v_version_common_annot_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_instruments_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_instruments_content_v_version_serp_places" ADD CONSTRAINT "_instruments_content_v_version_serp_places_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_instruments_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_instruments_content_v_version_serp_places_locales" ADD CONSTRAINT "_instruments_content_v_version_serp_places_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_instruments_content_v_version_serp_places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_instruments_content_v_version_instagram_tiles" ADD CONSTRAINT "_instruments_content_v_version_instagram_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_instruments_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_instruments_content_v_version_site_nav" ADD CONSTRAINT "_instruments_content_v_version_site_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_instruments_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_instruments_content_v_version_site_menu" ADD CONSTRAINT "_instruments_content_v_version_site_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_instruments_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_instruments_content_v_version_site_gauges" ADD CONSTRAINT "_instruments_content_v_version_site_gauges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_instruments_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_instruments_content_v_version_site_gauges_locales" ADD CONSTRAINT "_instruments_content_v_version_site_gauges_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_instruments_content_v_version_site_gauges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_instruments_content_v_version_funnel_steps" ADD CONSTRAINT "_instruments_content_v_version_funnel_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_instruments_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_instruments_content_v_version_funnel_steps_locales" ADD CONSTRAINT "_instruments_content_v_version_funnel_steps_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_instruments_content_v_version_funnel_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_instruments_content_v_version_ai_answer_cites" ADD CONSTRAINT "_instruments_content_v_version_ai_answer_cites_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_instruments_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_instruments_content_v_version_ai_answer_cites_locales" ADD CONSTRAINT "_instruments_content_v_version_ai_answer_cites_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_instruments_content_v_version_ai_answer_cites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_instruments_content_v_version_prompts_head" ADD CONSTRAINT "_instruments_content_v_version_prompts_head_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_instruments_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_instruments_content_v_version_prompts_rows" ADD CONSTRAINT "_instruments_content_v_version_prompts_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_instruments_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_instruments_content_v_version_fanout_subs" ADD CONSTRAINT "_instruments_content_v_version_fanout_subs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_instruments_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_instruments_content_v_version_fanout_subs_locales" ADD CONSTRAINT "_instruments_content_v_version_fanout_subs_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_instruments_content_v_version_fanout_subs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_instruments_content_v_version_report_panels" ADD CONSTRAINT "_instruments_content_v_version_report_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_instruments_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_instruments_content_v_version_report_panels_locales" ADD CONSTRAINT "_instruments_content_v_version_report_panels_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_instruments_content_v_version_report_panels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_instruments_content_v_version_calendar_days" ADD CONSTRAINT "_instruments_content_v_version_calendar_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_instruments_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_instruments_content_v_version_calendar_items" ADD CONSTRAINT "_instruments_content_v_version_calendar_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_instruments_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_instruments_content_v_locales" ADD CONSTRAINT "_instruments_content_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_instruments_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_default_og_image_id_media_id_fk" FOREIGN KEY ("version_default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v_locales" ADD CONSTRAINT "_site_settings_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ui_labels_locales" ADD CONSTRAINT "ui_labels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ui_labels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ui_labels_v_locales" ADD CONSTRAINT "_ui_labels_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ui_labels_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_faq_id_order_idx" ON "posts_faq_id" USING btree ("_order");
  CREATE INDEX "posts_faq_id_parent_id_idx" ON "posts_faq_id" USING btree ("_parent_id");
  CREATE INDEX "posts_faq_en_order_idx" ON "posts_faq_en" USING btree ("_order");
  CREATE INDEX "posts_faq_en_parent_id_idx" ON "posts_faq_en" USING btree ("_parent_id");
  CREATE INDEX "sp_trust_order_idx" ON "sp_trust" USING btree ("_order");
  CREATE INDEX "sp_trust_parent_id_idx" ON "sp_trust" USING btree ("_parent_id");
  CREATE INDEX "sp_trust_locale_idx" ON "sp_trust" USING btree ("_locale");
  CREATE INDEX "sp_hl_order_idx" ON "sp_hl" USING btree ("_order");
  CREATE INDEX "sp_hl_parent_id_idx" ON "sp_hl" USING btree ("_parent_id");
  CREATE INDEX "sp_hl_locale_idx" ON "sp_hl" USING btree ("_locale");
  CREATE INDEX "sp_usp_pts_order_idx" ON "sp_usp_pts" USING btree ("_order");
  CREATE INDEX "sp_usp_pts_parent_id_idx" ON "sp_usp_pts" USING btree ("_parent_id");
  CREATE INDEX "sp_usp_pts_locale_idx" ON "sp_usp_pts" USING btree ("_locale");
  CREATE INDEX "sp_usp_order_idx" ON "sp_usp" USING btree ("_order");
  CREATE INDEX "sp_usp_parent_id_idx" ON "sp_usp" USING btree ("_parent_id");
  CREATE INDEX "sp_usp_locale_idx" ON "sp_usp" USING btree ("_locale");
  CREATE INDEX "sp_inc_items_order_idx" ON "sp_inc_items" USING btree ("_order");
  CREATE INDEX "sp_inc_items_parent_id_idx" ON "sp_inc_items" USING btree ("_parent_id");
  CREATE INDEX "sp_inc_items_locale_idx" ON "sp_inc_items" USING btree ("_locale");
  CREATE INDEX "sp_inc_tabs_order_idx" ON "sp_inc_tabs" USING btree ("_order");
  CREATE INDEX "sp_inc_tabs_parent_id_idx" ON "sp_inc_tabs" USING btree ("_parent_id");
  CREATE INDEX "sp_inc_tabs_locale_idx" ON "sp_inc_tabs" USING btree ("_locale");
  CREATE INDEX "sp_ai_head_order_idx" ON "sp_ai_head" USING btree ("_order");
  CREATE INDEX "sp_ai_head_parent_id_idx" ON "sp_ai_head" USING btree ("_parent_id");
  CREATE INDEX "sp_ai_head_locale_idx" ON "sp_ai_head" USING btree ("_locale");
  CREATE INDEX "sp_ai_rows_cells_order_idx" ON "sp_ai_rows_cells" USING btree ("_order");
  CREATE INDEX "sp_ai_rows_cells_parent_id_idx" ON "sp_ai_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "sp_ai_rows_cells_locale_idx" ON "sp_ai_rows_cells" USING btree ("_locale");
  CREATE INDEX "sp_ai_rows_order_idx" ON "sp_ai_rows" USING btree ("_order");
  CREATE INDEX "sp_ai_rows_parent_id_idx" ON "sp_ai_rows" USING btree ("_parent_id");
  CREATE INDEX "sp_ai_rows_locale_idx" ON "sp_ai_rows" USING btree ("_locale");
  CREATE INDEX "sp_work_order_idx" ON "sp_work" USING btree ("_order");
  CREATE INDEX "sp_work_parent_id_idx" ON "sp_work" USING btree ("_parent_id");
  CREATE INDEX "sp_work_locale_idx" ON "sp_work" USING btree ("_locale");
  CREATE INDEX "sp_tier_feat_order_idx" ON "sp_tier_feat" USING btree ("_order");
  CREATE INDEX "sp_tier_feat_parent_id_idx" ON "sp_tier_feat" USING btree ("_parent_id");
  CREATE INDEX "sp_tier_feat_locale_idx" ON "sp_tier_feat" USING btree ("_locale");
  CREATE INDEX "sp_tiers_order_idx" ON "sp_tiers" USING btree ("_order");
  CREATE INDEX "sp_tiers_parent_id_idx" ON "sp_tiers" USING btree ("_parent_id");
  CREATE INDEX "sp_tiers_locale_idx" ON "sp_tiers" USING btree ("_locale");
  CREATE INDEX "sp_addons_order_idx" ON "sp_addons" USING btree ("_order");
  CREATE INDEX "sp_addons_parent_id_idx" ON "sp_addons" USING btree ("_parent_id");
  CREATE INDEX "sp_addons_locale_idx" ON "sp_addons" USING btree ("_locale");
  CREATE INDEX "sp_mod_items_order_idx" ON "sp_mod_items" USING btree ("_order");
  CREATE INDEX "sp_mod_items_parent_id_idx" ON "sp_mod_items" USING btree ("_parent_id");
  CREATE INDEX "sp_mod_items_locale_idx" ON "sp_mod_items" USING btree ("_locale");
  CREATE INDEX "sp_mods_order_idx" ON "sp_mods" USING btree ("_order");
  CREATE INDEX "sp_mods_parent_id_idx" ON "sp_mods" USING btree ("_parent_id");
  CREATE INDEX "sp_mods_locale_idx" ON "sp_mods" USING btree ("_locale");
  CREATE INDEX "sp_grp_items_order_idx" ON "sp_grp_items" USING btree ("_order");
  CREATE INDEX "sp_grp_items_parent_id_idx" ON "sp_grp_items" USING btree ("_parent_id");
  CREATE INDEX "sp_grp_items_locale_idx" ON "sp_grp_items" USING btree ("_locale");
  CREATE INDEX "sp_sel_opt_order_idx" ON "sp_sel_opt" USING btree ("_order");
  CREATE INDEX "sp_sel_opt_parent_id_idx" ON "sp_sel_opt" USING btree ("_parent_id");
  CREATE INDEX "sp_sel_opt_locale_idx" ON "sp_sel_opt" USING btree ("_locale");
  CREATE INDEX "sp_sel_order_idx" ON "sp_sel" USING btree ("_order");
  CREATE INDEX "sp_sel_parent_id_idx" ON "sp_sel" USING btree ("_parent_id");
  CREATE INDEX "sp_sel_locale_idx" ON "sp_sel" USING btree ("_locale");
  CREATE INDEX "sp_grp_order_idx" ON "sp_grp" USING btree ("_order");
  CREATE INDEX "sp_grp_parent_id_idx" ON "sp_grp" USING btree ("_parent_id");
  CREATE INDEX "sp_grp_locale_idx" ON "sp_grp" USING btree ("_locale");
  CREATE INDEX "sp_proj_order_idx" ON "sp_proj" USING btree ("_order");
  CREATE INDEX "sp_proj_parent_id_idx" ON "sp_proj" USING btree ("_parent_id");
  CREATE INDEX "sp_proj_locale_idx" ON "sp_proj" USING btree ("_locale");
  CREATE INDEX "sp_stats_order_idx" ON "sp_stats" USING btree ("_order");
  CREATE INDEX "sp_stats_parent_id_idx" ON "sp_stats" USING btree ("_parent_id");
  CREATE INDEX "sp_stats_locale_idx" ON "sp_stats" USING btree ("_locale");
  CREATE INDEX "sp_faq_order_idx" ON "sp_faq" USING btree ("_order");
  CREATE INDEX "sp_faq_parent_id_idx" ON "sp_faq" USING btree ("_parent_id");
  CREATE INDEX "sp_faq_locale_idx" ON "sp_faq" USING btree ("_locale");
  CREATE INDEX "sp_src_order_idx" ON "sp_src" USING btree ("_order");
  CREATE INDEX "sp_src_parent_id_idx" ON "sp_src" USING btree ("_parent_id");
  CREATE INDEX "sp_src_locale_idx" ON "sp_src" USING btree ("_locale");
  CREATE INDEX "sp_fed_order_idx" ON "sp_fed" USING btree ("_order");
  CREATE INDEX "sp_fed_parent_id_idx" ON "sp_fed" USING btree ("_parent_id");
  CREATE INDEX "sp_fed_locale_idx" ON "sp_fed" USING btree ("_locale");
  CREATE INDEX "sp_feeds_order_idx" ON "sp_feeds" USING btree ("_order");
  CREATE INDEX "sp_feeds_parent_id_idx" ON "sp_feeds" USING btree ("_parent_id");
  CREATE INDEX "sp_feeds_locale_idx" ON "sp_feeds" USING btree ("_locale");
  CREATE UNIQUE INDEX "service_pages_key_idx" ON "service_pages" USING btree ("key");
  CREATE INDEX "service_pages_updated_at_idx" ON "service_pages" USING btree ("updated_at");
  CREATE INDEX "service_pages_created_at_idx" ON "service_pages" USING btree ("created_at");
  CREATE INDEX "service_pages__status_idx" ON "service_pages" USING btree ("_status");
  CREATE INDEX "service_pages_meta_meta_image_idx" ON "service_pages_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "service_pages_locales_locale_parent_id_unique" ON "service_pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sp_trust_v_order_idx" ON "_sp_trust_v" USING btree ("_order");
  CREATE INDEX "_sp_trust_v_parent_id_idx" ON "_sp_trust_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_trust_v_locale_idx" ON "_sp_trust_v" USING btree ("_locale");
  CREATE INDEX "_sp_hl_v_order_idx" ON "_sp_hl_v" USING btree ("_order");
  CREATE INDEX "_sp_hl_v_parent_id_idx" ON "_sp_hl_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_hl_v_locale_idx" ON "_sp_hl_v" USING btree ("_locale");
  CREATE INDEX "_sp_usp_pts_v_order_idx" ON "_sp_usp_pts_v" USING btree ("_order");
  CREATE INDEX "_sp_usp_pts_v_parent_id_idx" ON "_sp_usp_pts_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_usp_pts_v_locale_idx" ON "_sp_usp_pts_v" USING btree ("_locale");
  CREATE INDEX "_sp_usp_v_order_idx" ON "_sp_usp_v" USING btree ("_order");
  CREATE INDEX "_sp_usp_v_parent_id_idx" ON "_sp_usp_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_usp_v_locale_idx" ON "_sp_usp_v" USING btree ("_locale");
  CREATE INDEX "_sp_inc_items_v_order_idx" ON "_sp_inc_items_v" USING btree ("_order");
  CREATE INDEX "_sp_inc_items_v_parent_id_idx" ON "_sp_inc_items_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_inc_items_v_locale_idx" ON "_sp_inc_items_v" USING btree ("_locale");
  CREATE INDEX "_sp_inc_tabs_v_order_idx" ON "_sp_inc_tabs_v" USING btree ("_order");
  CREATE INDEX "_sp_inc_tabs_v_parent_id_idx" ON "_sp_inc_tabs_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_inc_tabs_v_locale_idx" ON "_sp_inc_tabs_v" USING btree ("_locale");
  CREATE INDEX "_sp_ai_head_v_order_idx" ON "_sp_ai_head_v" USING btree ("_order");
  CREATE INDEX "_sp_ai_head_v_parent_id_idx" ON "_sp_ai_head_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_ai_head_v_locale_idx" ON "_sp_ai_head_v" USING btree ("_locale");
  CREATE INDEX "_sp_ai_rows_v_cells_order_idx" ON "_sp_ai_rows_v_cells" USING btree ("_order");
  CREATE INDEX "_sp_ai_rows_v_cells_parent_id_idx" ON "_sp_ai_rows_v_cells" USING btree ("_parent_id");
  CREATE INDEX "_sp_ai_rows_v_cells_locale_idx" ON "_sp_ai_rows_v_cells" USING btree ("_locale");
  CREATE INDEX "_sp_ai_rows_v_order_idx" ON "_sp_ai_rows_v" USING btree ("_order");
  CREATE INDEX "_sp_ai_rows_v_parent_id_idx" ON "_sp_ai_rows_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_ai_rows_v_locale_idx" ON "_sp_ai_rows_v" USING btree ("_locale");
  CREATE INDEX "_sp_work_v_order_idx" ON "_sp_work_v" USING btree ("_order");
  CREATE INDEX "_sp_work_v_parent_id_idx" ON "_sp_work_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_work_v_locale_idx" ON "_sp_work_v" USING btree ("_locale");
  CREATE INDEX "_sp_tier_feat_v_order_idx" ON "_sp_tier_feat_v" USING btree ("_order");
  CREATE INDEX "_sp_tier_feat_v_parent_id_idx" ON "_sp_tier_feat_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_tier_feat_v_locale_idx" ON "_sp_tier_feat_v" USING btree ("_locale");
  CREATE INDEX "_sp_tiers_v_order_idx" ON "_sp_tiers_v" USING btree ("_order");
  CREATE INDEX "_sp_tiers_v_parent_id_idx" ON "_sp_tiers_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_tiers_v_locale_idx" ON "_sp_tiers_v" USING btree ("_locale");
  CREATE INDEX "_sp_addons_v_order_idx" ON "_sp_addons_v" USING btree ("_order");
  CREATE INDEX "_sp_addons_v_parent_id_idx" ON "_sp_addons_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_addons_v_locale_idx" ON "_sp_addons_v" USING btree ("_locale");
  CREATE INDEX "_sp_mod_items_v_order_idx" ON "_sp_mod_items_v" USING btree ("_order");
  CREATE INDEX "_sp_mod_items_v_parent_id_idx" ON "_sp_mod_items_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_mod_items_v_locale_idx" ON "_sp_mod_items_v" USING btree ("_locale");
  CREATE INDEX "_sp_mods_v_order_idx" ON "_sp_mods_v" USING btree ("_order");
  CREATE INDEX "_sp_mods_v_parent_id_idx" ON "_sp_mods_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_mods_v_locale_idx" ON "_sp_mods_v" USING btree ("_locale");
  CREATE INDEX "_sp_grp_items_v_order_idx" ON "_sp_grp_items_v" USING btree ("_order");
  CREATE INDEX "_sp_grp_items_v_parent_id_idx" ON "_sp_grp_items_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_grp_items_v_locale_idx" ON "_sp_grp_items_v" USING btree ("_locale");
  CREATE INDEX "_sp_sel_opt_v_order_idx" ON "_sp_sel_opt_v" USING btree ("_order");
  CREATE INDEX "_sp_sel_opt_v_parent_id_idx" ON "_sp_sel_opt_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_sel_opt_v_locale_idx" ON "_sp_sel_opt_v" USING btree ("_locale");
  CREATE INDEX "_sp_sel_v_order_idx" ON "_sp_sel_v" USING btree ("_order");
  CREATE INDEX "_sp_sel_v_parent_id_idx" ON "_sp_sel_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_sel_v_locale_idx" ON "_sp_sel_v" USING btree ("_locale");
  CREATE INDEX "_sp_grp_v_order_idx" ON "_sp_grp_v" USING btree ("_order");
  CREATE INDEX "_sp_grp_v_parent_id_idx" ON "_sp_grp_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_grp_v_locale_idx" ON "_sp_grp_v" USING btree ("_locale");
  CREATE INDEX "_sp_proj_v_order_idx" ON "_sp_proj_v" USING btree ("_order");
  CREATE INDEX "_sp_proj_v_parent_id_idx" ON "_sp_proj_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_proj_v_locale_idx" ON "_sp_proj_v" USING btree ("_locale");
  CREATE INDEX "_sp_stats_v_order_idx" ON "_sp_stats_v" USING btree ("_order");
  CREATE INDEX "_sp_stats_v_parent_id_idx" ON "_sp_stats_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_stats_v_locale_idx" ON "_sp_stats_v" USING btree ("_locale");
  CREATE INDEX "_sp_faq_v_order_idx" ON "_sp_faq_v" USING btree ("_order");
  CREATE INDEX "_sp_faq_v_parent_id_idx" ON "_sp_faq_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_faq_v_locale_idx" ON "_sp_faq_v" USING btree ("_locale");
  CREATE INDEX "_sp_src_v_order_idx" ON "_sp_src_v" USING btree ("_order");
  CREATE INDEX "_sp_src_v_parent_id_idx" ON "_sp_src_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_src_v_locale_idx" ON "_sp_src_v" USING btree ("_locale");
  CREATE INDEX "_sp_fed_v_order_idx" ON "_sp_fed_v" USING btree ("_order");
  CREATE INDEX "_sp_fed_v_parent_id_idx" ON "_sp_fed_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_fed_v_locale_idx" ON "_sp_fed_v" USING btree ("_locale");
  CREATE INDEX "_sp_feeds_v_order_idx" ON "_sp_feeds_v" USING btree ("_order");
  CREATE INDEX "_sp_feeds_v_parent_id_idx" ON "_sp_feeds_v" USING btree ("_parent_id");
  CREATE INDEX "_sp_feeds_v_locale_idx" ON "_sp_feeds_v" USING btree ("_locale");
  CREATE INDEX "_service_pages_v_parent_idx" ON "_service_pages_v" USING btree ("parent_id");
  CREATE INDEX "_service_pages_v_version_version_key_idx" ON "_service_pages_v" USING btree ("version_key");
  CREATE INDEX "_service_pages_v_version_version_updated_at_idx" ON "_service_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_service_pages_v_version_version_created_at_idx" ON "_service_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_service_pages_v_version_version__status_idx" ON "_service_pages_v" USING btree ("version__status");
  CREATE INDEX "_service_pages_v_created_at_idx" ON "_service_pages_v" USING btree ("created_at");
  CREATE INDEX "_service_pages_v_updated_at_idx" ON "_service_pages_v" USING btree ("updated_at");
  CREATE INDEX "_service_pages_v_snapshot_idx" ON "_service_pages_v" USING btree ("snapshot");
  CREATE INDEX "_service_pages_v_published_locale_idx" ON "_service_pages_v" USING btree ("published_locale");
  CREATE INDEX "_service_pages_v_latest_idx" ON "_service_pages_v" USING btree ("latest");
  CREATE INDEX "_service_pages_v_version_meta_version_meta_image_idx" ON "_service_pages_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_service_pages_v_locales_locale_parent_id_unique" ON "_service_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "legal_pages_content_intro_order_idx" ON "legal_pages_content_intro" USING btree ("_order");
  CREATE INDEX "legal_pages_content_intro_parent_id_idx" ON "legal_pages_content_intro" USING btree ("_parent_id");
  CREATE INDEX "legal_pages_content_intro_locale_idx" ON "legal_pages_content_intro" USING btree ("_locale");
  CREATE INDEX "lp_items_order_idx" ON "lp_items" USING btree ("_order");
  CREATE INDEX "lp_items_parent_id_idx" ON "lp_items" USING btree ("_parent_id");
  CREATE INDEX "lp_items_locale_idx" ON "lp_items" USING btree ("_locale");
  CREATE INDEX "lp_sections_order_idx" ON "lp_sections" USING btree ("_order");
  CREATE INDEX "lp_sections_parent_id_idx" ON "lp_sections" USING btree ("_parent_id");
  CREATE INDEX "lp_sections_locale_idx" ON "lp_sections" USING btree ("_locale");
  CREATE INDEX "legal_pages_content_ask_order_idx" ON "legal_pages_content_ask" USING btree ("_order");
  CREATE INDEX "legal_pages_content_ask_parent_id_idx" ON "legal_pages_content_ask" USING btree ("_parent_id");
  CREATE INDEX "legal_pages_content_ask_locale_idx" ON "legal_pages_content_ask" USING btree ("_locale");
  CREATE UNIQUE INDEX "legal_pages_key_idx" ON "legal_pages" USING btree ("key");
  CREATE INDEX "legal_pages_updated_at_idx" ON "legal_pages" USING btree ("updated_at");
  CREATE INDEX "legal_pages_created_at_idx" ON "legal_pages" USING btree ("created_at");
  CREATE INDEX "legal_pages__status_idx" ON "legal_pages" USING btree ("_status");
  CREATE INDEX "legal_pages_meta_meta_image_idx" ON "legal_pages_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "legal_pages_locales_locale_parent_id_unique" ON "legal_pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_legal_pages_v_version_content_intro_order_idx" ON "_legal_pages_v_version_content_intro" USING btree ("_order");
  CREATE INDEX "_legal_pages_v_version_content_intro_parent_id_idx" ON "_legal_pages_v_version_content_intro" USING btree ("_parent_id");
  CREATE INDEX "_legal_pages_v_version_content_intro_locale_idx" ON "_legal_pages_v_version_content_intro" USING btree ("_locale");
  CREATE INDEX "_lp_items_v_order_idx" ON "_lp_items_v" USING btree ("_order");
  CREATE INDEX "_lp_items_v_parent_id_idx" ON "_lp_items_v" USING btree ("_parent_id");
  CREATE INDEX "_lp_items_v_locale_idx" ON "_lp_items_v" USING btree ("_locale");
  CREATE INDEX "_lp_sections_v_order_idx" ON "_lp_sections_v" USING btree ("_order");
  CREATE INDEX "_lp_sections_v_parent_id_idx" ON "_lp_sections_v" USING btree ("_parent_id");
  CREATE INDEX "_lp_sections_v_locale_idx" ON "_lp_sections_v" USING btree ("_locale");
  CREATE INDEX "_legal_pages_v_version_content_ask_order_idx" ON "_legal_pages_v_version_content_ask" USING btree ("_order");
  CREATE INDEX "_legal_pages_v_version_content_ask_parent_id_idx" ON "_legal_pages_v_version_content_ask" USING btree ("_parent_id");
  CREATE INDEX "_legal_pages_v_version_content_ask_locale_idx" ON "_legal_pages_v_version_content_ask" USING btree ("_locale");
  CREATE INDEX "_legal_pages_v_parent_idx" ON "_legal_pages_v" USING btree ("parent_id");
  CREATE INDEX "_legal_pages_v_version_version_key_idx" ON "_legal_pages_v" USING btree ("version_key");
  CREATE INDEX "_legal_pages_v_version_version_updated_at_idx" ON "_legal_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_legal_pages_v_version_version_created_at_idx" ON "_legal_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_legal_pages_v_version_version__status_idx" ON "_legal_pages_v" USING btree ("version__status");
  CREATE INDEX "_legal_pages_v_created_at_idx" ON "_legal_pages_v" USING btree ("created_at");
  CREATE INDEX "_legal_pages_v_updated_at_idx" ON "_legal_pages_v" USING btree ("updated_at");
  CREATE INDEX "_legal_pages_v_snapshot_idx" ON "_legal_pages_v" USING btree ("snapshot");
  CREATE INDEX "_legal_pages_v_published_locale_idx" ON "_legal_pages_v" USING btree ("published_locale");
  CREATE INDEX "_legal_pages_v_latest_idx" ON "_legal_pages_v" USING btree ("latest");
  CREATE INDEX "_legal_pages_v_version_meta_version_meta_image_idx" ON "_legal_pages_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_legal_pages_v_locales_locale_parent_id_unique" ON "_legal_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_hero_lines_order_idx" ON "home_page_hero_lines" USING btree ("_order");
  CREATE INDEX "home_page_hero_lines_parent_id_idx" ON "home_page_hero_lines" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_hero_lines_locales_locale_parent_id_unique" ON "home_page_hero_lines_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_c360_pillar_line_order_idx" ON "home_page_c360_pillar_line" USING btree ("_order");
  CREATE INDEX "home_page_c360_pillar_line_parent_id_idx" ON "home_page_c360_pillar_line" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_c360_pillar_line_locales_locale_parent_id_unique" ON "home_page_c360_pillar_line_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_process_groups_steps_order_idx" ON "home_page_process_groups_steps" USING btree ("_order");
  CREATE INDEX "home_page_process_groups_steps_parent_id_idx" ON "home_page_process_groups_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_process_groups_steps_locales_locale_parent_id_uniq" ON "home_page_process_groups_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_process_groups_order_idx" ON "home_page_process_groups" USING btree ("_order");
  CREATE INDEX "home_page_process_groups_parent_id_idx" ON "home_page_process_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_process_groups_locales_locale_parent_id_unique" ON "home_page_process_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_faq_order_idx" ON "home_page_faq" USING btree ("_order");
  CREATE INDEX "home_page_faq_parent_id_idx" ON "home_page_faq" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_faq_locales_locale_parent_id_unique" ON "home_page_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "o0_order_idx" ON "o0" USING btree ("_order");
  CREATE INDEX "o0_parent_id_idx" ON "o0" USING btree ("_parent_id");
  CREATE INDEX "o0_locale_idx" ON "o0" USING btree ("_locale");
  CREATE INDEX "q0_order_idx" ON "q0" USING btree ("_order");
  CREATE INDEX "q0_parent_id_idx" ON "q0" USING btree ("_parent_id");
  CREATE INDEX "q0_locale_idx" ON "q0" USING btree ("_locale");
  CREATE INDEX "o1_order_idx" ON "o1" USING btree ("_order");
  CREATE INDEX "o1_parent_id_idx" ON "o1" USING btree ("_parent_id");
  CREATE INDEX "o1_locale_idx" ON "o1" USING btree ("_locale");
  CREATE INDEX "q1_order_idx" ON "q1" USING btree ("_order");
  CREATE INDEX "q1_parent_id_idx" ON "q1" USING btree ("_parent_id");
  CREATE INDEX "q1_locale_idx" ON "q1" USING btree ("_locale");
  CREATE INDEX "o2_order_idx" ON "o2" USING btree ("_order");
  CREATE INDEX "o2_parent_id_idx" ON "o2" USING btree ("_parent_id");
  CREATE INDEX "o2_locale_idx" ON "o2" USING btree ("_locale");
  CREATE INDEX "q2_order_idx" ON "q2" USING btree ("_order");
  CREATE INDEX "q2_parent_id_idx" ON "q2" USING btree ("_parent_id");
  CREATE INDEX "q2_locale_idx" ON "q2" USING btree ("_locale");
  CREATE INDEX "o3_order_idx" ON "o3" USING btree ("_order");
  CREATE INDEX "o3_parent_id_idx" ON "o3" USING btree ("_parent_id");
  CREATE INDEX "o3_locale_idx" ON "o3" USING btree ("_locale");
  CREATE INDEX "q3_order_idx" ON "q3" USING btree ("_order");
  CREATE INDEX "q3_parent_id_idx" ON "q3" USING btree ("_parent_id");
  CREATE INDEX "q3_locale_idx" ON "q3" USING btree ("_locale");
  CREATE INDEX "o4_order_idx" ON "o4" USING btree ("_order");
  CREATE INDEX "o4_parent_id_idx" ON "o4" USING btree ("_parent_id");
  CREATE INDEX "o4_locale_idx" ON "o4" USING btree ("_locale");
  CREATE INDEX "q4_order_idx" ON "q4" USING btree ("_order");
  CREATE INDEX "q4_parent_id_idx" ON "q4" USING btree ("_parent_id");
  CREATE INDEX "q4_locale_idx" ON "q4" USING btree ("_locale");
  CREATE INDEX "o5_order_idx" ON "o5" USING btree ("_order");
  CREATE INDEX "o5_parent_id_idx" ON "o5" USING btree ("_parent_id");
  CREATE INDEX "o5_locale_idx" ON "o5" USING btree ("_locale");
  CREATE INDEX "q5_order_idx" ON "q5" USING btree ("_order");
  CREATE INDEX "q5_parent_id_idx" ON "q5" USING btree ("_parent_id");
  CREATE INDEX "q5_locale_idx" ON "q5" USING btree ("_locale");
  CREATE INDEX "o6_order_idx" ON "o6" USING btree ("_order");
  CREATE INDEX "o6_parent_id_idx" ON "o6" USING btree ("_parent_id");
  CREATE INDEX "o6_locale_idx" ON "o6" USING btree ("_locale");
  CREATE INDEX "q6_order_idx" ON "q6" USING btree ("_order");
  CREATE INDEX "q6_parent_id_idx" ON "q6" USING btree ("_parent_id");
  CREATE INDEX "q6_locale_idx" ON "q6" USING btree ("_locale");
  CREATE INDEX "o7_order_idx" ON "o7" USING btree ("_order");
  CREATE INDEX "o7_parent_id_idx" ON "o7" USING btree ("_parent_id");
  CREATE INDEX "o7_locale_idx" ON "o7" USING btree ("_locale");
  CREATE INDEX "q7_order_idx" ON "q7" USING btree ("_order");
  CREATE INDEX "q7_parent_id_idx" ON "q7" USING btree ("_parent_id");
  CREATE INDEX "q7_locale_idx" ON "q7" USING btree ("_locale");
  CREATE INDEX "home_page__status_idx" ON "home_page" USING btree ("_status");
  CREATE INDEX "home_page_meta_meta_image_idx" ON "home_page_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "home_page_locales_locale_parent_id_unique" ON "home_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_version_hero_lines_order_idx" ON "_home_page_v_version_hero_lines" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_hero_lines_parent_id_idx" ON "_home_page_v_version_hero_lines" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_page_v_version_hero_lines_locales_locale_parent_id_uni" ON "_home_page_v_version_hero_lines_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_version_c360_pillar_line_order_idx" ON "_home_page_v_version_c360_pillar_line" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_c360_pillar_line_parent_id_idx" ON "_home_page_v_version_c360_pillar_line" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_page_v_version_c360_pillar_line_locales_locale_parent_" ON "_home_page_v_version_c360_pillar_line_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_version_process_groups_steps_order_idx" ON "_home_page_v_version_process_groups_steps" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_process_groups_steps_parent_id_idx" ON "_home_page_v_version_process_groups_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_page_v_version_process_groups_steps_locales_locale_par" ON "_home_page_v_version_process_groups_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_version_process_groups_order_idx" ON "_home_page_v_version_process_groups" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_process_groups_parent_id_idx" ON "_home_page_v_version_process_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_page_v_version_process_groups_locales_locale_parent_id" ON "_home_page_v_version_process_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_version_faq_order_idx" ON "_home_page_v_version_faq" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_faq_parent_id_idx" ON "_home_page_v_version_faq" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_page_v_version_faq_locales_locale_parent_id_unique" ON "_home_page_v_version_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_o0_v_order_idx" ON "_o0_v" USING btree ("_order");
  CREATE INDEX "_o0_v_parent_id_idx" ON "_o0_v" USING btree ("_parent_id");
  CREATE INDEX "_o0_v_locale_idx" ON "_o0_v" USING btree ("_locale");
  CREATE INDEX "_q0_v_order_idx" ON "_q0_v" USING btree ("_order");
  CREATE INDEX "_q0_v_parent_id_idx" ON "_q0_v" USING btree ("_parent_id");
  CREATE INDEX "_q0_v_locale_idx" ON "_q0_v" USING btree ("_locale");
  CREATE INDEX "_o1_v_order_idx" ON "_o1_v" USING btree ("_order");
  CREATE INDEX "_o1_v_parent_id_idx" ON "_o1_v" USING btree ("_parent_id");
  CREATE INDEX "_o1_v_locale_idx" ON "_o1_v" USING btree ("_locale");
  CREATE INDEX "_q1_v_order_idx" ON "_q1_v" USING btree ("_order");
  CREATE INDEX "_q1_v_parent_id_idx" ON "_q1_v" USING btree ("_parent_id");
  CREATE INDEX "_q1_v_locale_idx" ON "_q1_v" USING btree ("_locale");
  CREATE INDEX "_o2_v_order_idx" ON "_o2_v" USING btree ("_order");
  CREATE INDEX "_o2_v_parent_id_idx" ON "_o2_v" USING btree ("_parent_id");
  CREATE INDEX "_o2_v_locale_idx" ON "_o2_v" USING btree ("_locale");
  CREATE INDEX "_q2_v_order_idx" ON "_q2_v" USING btree ("_order");
  CREATE INDEX "_q2_v_parent_id_idx" ON "_q2_v" USING btree ("_parent_id");
  CREATE INDEX "_q2_v_locale_idx" ON "_q2_v" USING btree ("_locale");
  CREATE INDEX "_o3_v_order_idx" ON "_o3_v" USING btree ("_order");
  CREATE INDEX "_o3_v_parent_id_idx" ON "_o3_v" USING btree ("_parent_id");
  CREATE INDEX "_o3_v_locale_idx" ON "_o3_v" USING btree ("_locale");
  CREATE INDEX "_q3_v_order_idx" ON "_q3_v" USING btree ("_order");
  CREATE INDEX "_q3_v_parent_id_idx" ON "_q3_v" USING btree ("_parent_id");
  CREATE INDEX "_q3_v_locale_idx" ON "_q3_v" USING btree ("_locale");
  CREATE INDEX "_o4_v_order_idx" ON "_o4_v" USING btree ("_order");
  CREATE INDEX "_o4_v_parent_id_idx" ON "_o4_v" USING btree ("_parent_id");
  CREATE INDEX "_o4_v_locale_idx" ON "_o4_v" USING btree ("_locale");
  CREATE INDEX "_q4_v_order_idx" ON "_q4_v" USING btree ("_order");
  CREATE INDEX "_q4_v_parent_id_idx" ON "_q4_v" USING btree ("_parent_id");
  CREATE INDEX "_q4_v_locale_idx" ON "_q4_v" USING btree ("_locale");
  CREATE INDEX "_o5_v_order_idx" ON "_o5_v" USING btree ("_order");
  CREATE INDEX "_o5_v_parent_id_idx" ON "_o5_v" USING btree ("_parent_id");
  CREATE INDEX "_o5_v_locale_idx" ON "_o5_v" USING btree ("_locale");
  CREATE INDEX "_q5_v_order_idx" ON "_q5_v" USING btree ("_order");
  CREATE INDEX "_q5_v_parent_id_idx" ON "_q5_v" USING btree ("_parent_id");
  CREATE INDEX "_q5_v_locale_idx" ON "_q5_v" USING btree ("_locale");
  CREATE INDEX "_o6_v_order_idx" ON "_o6_v" USING btree ("_order");
  CREATE INDEX "_o6_v_parent_id_idx" ON "_o6_v" USING btree ("_parent_id");
  CREATE INDEX "_o6_v_locale_idx" ON "_o6_v" USING btree ("_locale");
  CREATE INDEX "_q6_v_order_idx" ON "_q6_v" USING btree ("_order");
  CREATE INDEX "_q6_v_parent_id_idx" ON "_q6_v" USING btree ("_parent_id");
  CREATE INDEX "_q6_v_locale_idx" ON "_q6_v" USING btree ("_locale");
  CREATE INDEX "_o7_v_order_idx" ON "_o7_v" USING btree ("_order");
  CREATE INDEX "_o7_v_parent_id_idx" ON "_o7_v" USING btree ("_parent_id");
  CREATE INDEX "_o7_v_locale_idx" ON "_o7_v" USING btree ("_locale");
  CREATE INDEX "_q7_v_order_idx" ON "_q7_v" USING btree ("_order");
  CREATE INDEX "_q7_v_parent_id_idx" ON "_q7_v" USING btree ("_parent_id");
  CREATE INDEX "_q7_v_locale_idx" ON "_q7_v" USING btree ("_locale");
  CREATE INDEX "_home_page_v_version_version__status_idx" ON "_home_page_v" USING btree ("version__status");
  CREATE INDEX "_home_page_v_created_at_idx" ON "_home_page_v" USING btree ("created_at");
  CREATE INDEX "_home_page_v_updated_at_idx" ON "_home_page_v" USING btree ("updated_at");
  CREATE INDEX "_home_page_v_snapshot_idx" ON "_home_page_v" USING btree ("snapshot");
  CREATE INDEX "_home_page_v_published_locale_idx" ON "_home_page_v" USING btree ("published_locale");
  CREATE INDEX "_home_page_v_latest_idx" ON "_home_page_v" USING btree ("latest");
  CREATE INDEX "_home_page_v_version_meta_version_meta_image_idx" ON "_home_page_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_home_page_v_locales_locale_parent_id_unique" ON "_home_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "hub_page_faq_order_idx" ON "hub_page_faq" USING btree ("_order");
  CREATE INDEX "hub_page_faq_parent_id_idx" ON "hub_page_faq" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "hub_page_faq_locales_locale_parent_id_unique" ON "hub_page_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "hub_page__status_idx" ON "hub_page" USING btree ("_status");
  CREATE INDEX "hub_page_meta_meta_image_idx" ON "hub_page_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "hub_page_locales_locale_parent_id_unique" ON "hub_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_hub_page_v_version_faq_order_idx" ON "_hub_page_v_version_faq" USING btree ("_order");
  CREATE INDEX "_hub_page_v_version_faq_parent_id_idx" ON "_hub_page_v_version_faq" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_hub_page_v_version_faq_locales_locale_parent_id_unique" ON "_hub_page_v_version_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_hub_page_v_version_version__status_idx" ON "_hub_page_v" USING btree ("version__status");
  CREATE INDEX "_hub_page_v_created_at_idx" ON "_hub_page_v" USING btree ("created_at");
  CREATE INDEX "_hub_page_v_updated_at_idx" ON "_hub_page_v" USING btree ("updated_at");
  CREATE INDEX "_hub_page_v_snapshot_idx" ON "_hub_page_v" USING btree ("snapshot");
  CREATE INDEX "_hub_page_v_published_locale_idx" ON "_hub_page_v" USING btree ("published_locale");
  CREATE INDEX "_hub_page_v_latest_idx" ON "_hub_page_v" USING btree ("latest");
  CREATE INDEX "_hub_page_v_version_meta_version_meta_image_idx" ON "_hub_page_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_hub_page_v_locales_locale_parent_id_unique" ON "_hub_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_story_who_order_idx" ON "about_page_story_who" USING btree ("_order");
  CREATE INDEX "about_page_story_who_parent_id_idx" ON "about_page_story_who" USING btree ("_parent_id");
  CREATE INDEX "about_page_story_who_locale_idx" ON "about_page_story_who" USING btree ("_locale");
  CREATE INDEX "about_page_story_ways_order_idx" ON "about_page_story_ways" USING btree ("_order");
  CREATE INDEX "about_page_story_ways_parent_id_idx" ON "about_page_story_ways" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_page_story_ways_locales_locale_parent_id_unique" ON "about_page_story_ways_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_why_why_order_idx" ON "about_page_why_why" USING btree ("_order");
  CREATE INDEX "about_page_why_why_parent_id_idx" ON "about_page_why_why" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_page_why_why_locales_locale_parent_id_unique" ON "about_page_why_why_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_why_not_order_idx" ON "about_page_why_not" USING btree ("_order");
  CREATE INDEX "about_page_why_not_parent_id_idx" ON "about_page_why_not" USING btree ("_parent_id");
  CREATE INDEX "about_page_why_not_locale_idx" ON "about_page_why_not" USING btree ("_locale");
  CREATE INDEX "about_page_aside_facts_order_idx" ON "about_page_aside_facts" USING btree ("_order");
  CREATE INDEX "about_page_aside_facts_parent_id_idx" ON "about_page_aside_facts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_page_aside_facts_locales_locale_parent_id_unique" ON "about_page_aside_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page__status_idx" ON "about_page" USING btree ("_status");
  CREATE INDEX "about_page_meta_meta_image_idx" ON "about_page_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "about_page_locales_locale_parent_id_unique" ON "about_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_version_story_who_order_idx" ON "_about_page_v_version_story_who" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_story_who_parent_id_idx" ON "_about_page_v_version_story_who" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_story_who_locale_idx" ON "_about_page_v_version_story_who" USING btree ("_locale");
  CREATE INDEX "_about_page_v_version_story_ways_order_idx" ON "_about_page_v_version_story_ways" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_story_ways_parent_id_idx" ON "_about_page_v_version_story_ways" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_about_page_v_version_story_ways_locales_locale_parent_id_un" ON "_about_page_v_version_story_ways_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_version_why_why_order_idx" ON "_about_page_v_version_why_why" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_why_why_parent_id_idx" ON "_about_page_v_version_why_why" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_about_page_v_version_why_why_locales_locale_parent_id_uniqu" ON "_about_page_v_version_why_why_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_version_why_not_order_idx" ON "_about_page_v_version_why_not" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_why_not_parent_id_idx" ON "_about_page_v_version_why_not" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_why_not_locale_idx" ON "_about_page_v_version_why_not" USING btree ("_locale");
  CREATE INDEX "_about_page_v_version_aside_facts_order_idx" ON "_about_page_v_version_aside_facts" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_aside_facts_parent_id_idx" ON "_about_page_v_version_aside_facts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_about_page_v_version_aside_facts_locales_locale_parent_id_u" ON "_about_page_v_version_aside_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_version_version__status_idx" ON "_about_page_v" USING btree ("version__status");
  CREATE INDEX "_about_page_v_created_at_idx" ON "_about_page_v" USING btree ("created_at");
  CREATE INDEX "_about_page_v_updated_at_idx" ON "_about_page_v" USING btree ("updated_at");
  CREATE INDEX "_about_page_v_snapshot_idx" ON "_about_page_v" USING btree ("snapshot");
  CREATE INDEX "_about_page_v_published_locale_idx" ON "_about_page_v" USING btree ("published_locale");
  CREATE INDEX "_about_page_v_latest_idx" ON "_about_page_v" USING btree ("latest");
  CREATE INDEX "_about_page_v_version_meta_version_meta_image_idx" ON "_about_page_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_about_page_v_locales_locale_parent_id_unique" ON "_about_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_page_budget_options_order_idx" ON "contact_page_budget_options" USING btree ("_order");
  CREATE INDEX "contact_page_budget_options_parent_id_idx" ON "contact_page_budget_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_page_budget_options_locales_locale_parent_id_unique" ON "contact_page_budget_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_page_timeline_options_order_idx" ON "contact_page_timeline_options" USING btree ("_order");
  CREATE INDEX "contact_page_timeline_options_parent_id_idx" ON "contact_page_timeline_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_page_timeline_options_locales_locale_parent_id_uniqu" ON "contact_page_timeline_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_page_next_steps_order_idx" ON "contact_page_next_steps" USING btree ("_order");
  CREATE INDEX "contact_page_next_steps_parent_id_idx" ON "contact_page_next_steps" USING btree ("_parent_id");
  CREATE INDEX "contact_page_next_steps_locale_idx" ON "contact_page_next_steps" USING btree ("_locale");
  CREATE INDEX "contact_page__status_idx" ON "contact_page" USING btree ("_status");
  CREATE INDEX "contact_page_meta_meta_image_idx" ON "contact_page_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "contact_page_locales_locale_parent_id_unique" ON "contact_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contact_page_v_version_budget_options_order_idx" ON "_contact_page_v_version_budget_options" USING btree ("_order");
  CREATE INDEX "_contact_page_v_version_budget_options_parent_id_idx" ON "_contact_page_v_version_budget_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_contact_page_v_version_budget_options_locales_locale_parent" ON "_contact_page_v_version_budget_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contact_page_v_version_timeline_options_order_idx" ON "_contact_page_v_version_timeline_options" USING btree ("_order");
  CREATE INDEX "_contact_page_v_version_timeline_options_parent_id_idx" ON "_contact_page_v_version_timeline_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_contact_page_v_version_timeline_options_locales_locale_pare" ON "_contact_page_v_version_timeline_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contact_page_v_version_next_steps_order_idx" ON "_contact_page_v_version_next_steps" USING btree ("_order");
  CREATE INDEX "_contact_page_v_version_next_steps_parent_id_idx" ON "_contact_page_v_version_next_steps" USING btree ("_parent_id");
  CREATE INDEX "_contact_page_v_version_next_steps_locale_idx" ON "_contact_page_v_version_next_steps" USING btree ("_locale");
  CREATE INDEX "_contact_page_v_version_version__status_idx" ON "_contact_page_v" USING btree ("version__status");
  CREATE INDEX "_contact_page_v_created_at_idx" ON "_contact_page_v" USING btree ("created_at");
  CREATE INDEX "_contact_page_v_updated_at_idx" ON "_contact_page_v" USING btree ("updated_at");
  CREATE INDEX "_contact_page_v_snapshot_idx" ON "_contact_page_v" USING btree ("snapshot");
  CREATE INDEX "_contact_page_v_published_locale_idx" ON "_contact_page_v" USING btree ("published_locale");
  CREATE INDEX "_contact_page_v_latest_idx" ON "_contact_page_v" USING btree ("latest");
  CREATE INDEX "_contact_page_v_version_meta_version_meta_image_idx" ON "_contact_page_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_contact_page_v_locales_locale_parent_id_unique" ON "_contact_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_page__status_idx" ON "blog_page" USING btree ("_status");
  CREATE INDEX "blog_page_meta_meta_image_idx" ON "blog_page_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "blog_page_locales_locale_parent_id_unique" ON "blog_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_page_v_version_version__status_idx" ON "_blog_page_v" USING btree ("version__status");
  CREATE INDEX "_blog_page_v_created_at_idx" ON "_blog_page_v" USING btree ("created_at");
  CREATE INDEX "_blog_page_v_updated_at_idx" ON "_blog_page_v" USING btree ("updated_at");
  CREATE INDEX "_blog_page_v_snapshot_idx" ON "_blog_page_v" USING btree ("snapshot");
  CREATE INDEX "_blog_page_v_published_locale_idx" ON "_blog_page_v" USING btree ("published_locale");
  CREATE INDEX "_blog_page_v_latest_idx" ON "_blog_page_v" USING btree ("latest");
  CREATE INDEX "_blog_page_v_version_meta_version_meta_image_idx" ON "_blog_page_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_blog_page_v_locales_locale_parent_id_unique" ON "_blog_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "portfolio_page__status_idx" ON "portfolio_page" USING btree ("_status");
  CREATE INDEX "portfolio_page_meta_meta_image_idx" ON "portfolio_page_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "portfolio_page_locales_locale_parent_id_unique" ON "portfolio_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_portfolio_page_v_version_version__status_idx" ON "_portfolio_page_v" USING btree ("version__status");
  CREATE INDEX "_portfolio_page_v_created_at_idx" ON "_portfolio_page_v" USING btree ("created_at");
  CREATE INDEX "_portfolio_page_v_updated_at_idx" ON "_portfolio_page_v" USING btree ("updated_at");
  CREATE INDEX "_portfolio_page_v_snapshot_idx" ON "_portfolio_page_v" USING btree ("snapshot");
  CREATE INDEX "_portfolio_page_v_published_locale_idx" ON "_portfolio_page_v" USING btree ("published_locale");
  CREATE INDEX "_portfolio_page_v_latest_idx" ON "_portfolio_page_v" USING btree ("latest");
  CREATE INDEX "_portfolio_page_v_version_meta_version_meta_image_idx" ON "_portfolio_page_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_portfolio_page_v_locales_locale_parent_id_unique" ON "_portfolio_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "not_found_page__status_idx" ON "not_found_page" USING btree ("_status");
  CREATE UNIQUE INDEX "not_found_page_locales_locale_parent_id_unique" ON "not_found_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_not_found_page_v_version_version__status_idx" ON "_not_found_page_v" USING btree ("version__status");
  CREATE INDEX "_not_found_page_v_created_at_idx" ON "_not_found_page_v" USING btree ("created_at");
  CREATE INDEX "_not_found_page_v_updated_at_idx" ON "_not_found_page_v" USING btree ("updated_at");
  CREATE INDEX "_not_found_page_v_snapshot_idx" ON "_not_found_page_v" USING btree ("snapshot");
  CREATE INDEX "_not_found_page_v_published_locale_idx" ON "_not_found_page_v" USING btree ("published_locale");
  CREATE INDEX "_not_found_page_v_latest_idx" ON "_not_found_page_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_not_found_page_v_locales_locale_parent_id_unique" ON "_not_found_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "campaign_content_nodes_order_idx" ON "campaign_content_nodes" USING btree ("_order");
  CREATE INDEX "campaign_content_nodes_parent_id_idx" ON "campaign_content_nodes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "campaign_content_nodes_locales_locale_parent_id_unique" ON "campaign_content_nodes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "campaign_content_edges_order_idx" ON "campaign_content_edges" USING btree ("_order");
  CREATE INDEX "campaign_content_edges_parent_id_idx" ON "campaign_content_edges" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "campaign_content_edges_locales_locale_parent_id_unique" ON "campaign_content_edges_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "campaign_content_pillars_order_idx" ON "campaign_content_pillars" USING btree ("_order");
  CREATE INDEX "campaign_content_pillars_parent_id_idx" ON "campaign_content_pillars" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "campaign_content_pillars_locales_locale_parent_id_unique" ON "campaign_content_pillars_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "campaign_content_table_head_order_idx" ON "campaign_content_table_head" USING btree ("_order");
  CREATE INDEX "campaign_content_table_head_parent_id_idx" ON "campaign_content_table_head" USING btree ("_parent_id");
  CREATE INDEX "campaign_content_table_head_locale_idx" ON "campaign_content_table_head" USING btree ("_locale");
  CREATE INDEX "campaign_content_extras_order_idx" ON "campaign_content_extras" USING btree ("_order");
  CREATE INDEX "campaign_content_extras_parent_id_idx" ON "campaign_content_extras" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "campaign_content_extras_locales_locale_parent_id_unique" ON "campaign_content_extras_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "campaign_content__status_idx" ON "campaign_content" USING btree ("_status");
  CREATE UNIQUE INDEX "campaign_content_locales_locale_parent_id_unique" ON "campaign_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_campaign_content_v_version_nodes_order_idx" ON "_campaign_content_v_version_nodes" USING btree ("_order");
  CREATE INDEX "_campaign_content_v_version_nodes_parent_id_idx" ON "_campaign_content_v_version_nodes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_campaign_content_v_version_nodes_locales_locale_parent_id_u" ON "_campaign_content_v_version_nodes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_campaign_content_v_version_edges_order_idx" ON "_campaign_content_v_version_edges" USING btree ("_order");
  CREATE INDEX "_campaign_content_v_version_edges_parent_id_idx" ON "_campaign_content_v_version_edges" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_campaign_content_v_version_edges_locales_locale_parent_id_u" ON "_campaign_content_v_version_edges_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_campaign_content_v_version_pillars_order_idx" ON "_campaign_content_v_version_pillars" USING btree ("_order");
  CREATE INDEX "_campaign_content_v_version_pillars_parent_id_idx" ON "_campaign_content_v_version_pillars" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_campaign_content_v_version_pillars_locales_locale_parent_id" ON "_campaign_content_v_version_pillars_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_campaign_content_v_version_table_head_order_idx" ON "_campaign_content_v_version_table_head" USING btree ("_order");
  CREATE INDEX "_campaign_content_v_version_table_head_parent_id_idx" ON "_campaign_content_v_version_table_head" USING btree ("_parent_id");
  CREATE INDEX "_campaign_content_v_version_table_head_locale_idx" ON "_campaign_content_v_version_table_head" USING btree ("_locale");
  CREATE INDEX "_campaign_content_v_version_extras_order_idx" ON "_campaign_content_v_version_extras" USING btree ("_order");
  CREATE INDEX "_campaign_content_v_version_extras_parent_id_idx" ON "_campaign_content_v_version_extras" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_campaign_content_v_version_extras_locales_locale_parent_id_" ON "_campaign_content_v_version_extras_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_campaign_content_v_version_version__status_idx" ON "_campaign_content_v" USING btree ("version__status");
  CREATE INDEX "_campaign_content_v_created_at_idx" ON "_campaign_content_v" USING btree ("created_at");
  CREATE INDEX "_campaign_content_v_updated_at_idx" ON "_campaign_content_v" USING btree ("updated_at");
  CREATE INDEX "_campaign_content_v_snapshot_idx" ON "_campaign_content_v" USING btree ("snapshot");
  CREATE INDEX "_campaign_content_v_published_locale_idx" ON "_campaign_content_v" USING btree ("published_locale");
  CREATE INDEX "_campaign_content_v_latest_idx" ON "_campaign_content_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_campaign_content_v_locales_locale_parent_id_unique" ON "_campaign_content_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "instruments_content_common_annot_order_idx" ON "instruments_content_common_annot" USING btree ("_order");
  CREATE INDEX "instruments_content_common_annot_parent_id_idx" ON "instruments_content_common_annot" USING btree ("_parent_id");
  CREATE INDEX "instruments_content_common_annot_locale_idx" ON "instruments_content_common_annot" USING btree ("_locale");
  CREATE INDEX "instruments_content_serp_places_order_idx" ON "instruments_content_serp_places" USING btree ("_order");
  CREATE INDEX "instruments_content_serp_places_parent_id_idx" ON "instruments_content_serp_places" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "instruments_content_serp_places_locales_locale_parent_id_uni" ON "instruments_content_serp_places_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "instruments_content_instagram_tiles_order_idx" ON "instruments_content_instagram_tiles" USING btree ("_order");
  CREATE INDEX "instruments_content_instagram_tiles_parent_id_idx" ON "instruments_content_instagram_tiles" USING btree ("_parent_id");
  CREATE INDEX "instruments_content_instagram_tiles_locale_idx" ON "instruments_content_instagram_tiles" USING btree ("_locale");
  CREATE INDEX "instruments_content_site_nav_order_idx" ON "instruments_content_site_nav" USING btree ("_order");
  CREATE INDEX "instruments_content_site_nav_parent_id_idx" ON "instruments_content_site_nav" USING btree ("_parent_id");
  CREATE INDEX "instruments_content_site_nav_locale_idx" ON "instruments_content_site_nav" USING btree ("_locale");
  CREATE INDEX "instruments_content_site_menu_order_idx" ON "instruments_content_site_menu" USING btree ("_order");
  CREATE INDEX "instruments_content_site_menu_parent_id_idx" ON "instruments_content_site_menu" USING btree ("_parent_id");
  CREATE INDEX "instruments_content_site_menu_locale_idx" ON "instruments_content_site_menu" USING btree ("_locale");
  CREATE INDEX "instruments_content_site_gauges_order_idx" ON "instruments_content_site_gauges" USING btree ("_order");
  CREATE INDEX "instruments_content_site_gauges_parent_id_idx" ON "instruments_content_site_gauges" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "instruments_content_site_gauges_locales_locale_parent_id_uni" ON "instruments_content_site_gauges_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "instruments_content_funnel_steps_order_idx" ON "instruments_content_funnel_steps" USING btree ("_order");
  CREATE INDEX "instruments_content_funnel_steps_parent_id_idx" ON "instruments_content_funnel_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "instruments_content_funnel_steps_locales_locale_parent_id_un" ON "instruments_content_funnel_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "instruments_content_ai_answer_cites_order_idx" ON "instruments_content_ai_answer_cites" USING btree ("_order");
  CREATE INDEX "instruments_content_ai_answer_cites_parent_id_idx" ON "instruments_content_ai_answer_cites" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "instruments_content_ai_answer_cites_locales_locale_parent_id" ON "instruments_content_ai_answer_cites_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "instruments_content_prompts_head_order_idx" ON "instruments_content_prompts_head" USING btree ("_order");
  CREATE INDEX "instruments_content_prompts_head_parent_id_idx" ON "instruments_content_prompts_head" USING btree ("_parent_id");
  CREATE INDEX "instruments_content_prompts_head_locale_idx" ON "instruments_content_prompts_head" USING btree ("_locale");
  CREATE INDEX "instruments_content_prompts_rows_order_idx" ON "instruments_content_prompts_rows" USING btree ("_order");
  CREATE INDEX "instruments_content_prompts_rows_parent_id_idx" ON "instruments_content_prompts_rows" USING btree ("_parent_id");
  CREATE INDEX "instruments_content_fanout_subs_order_idx" ON "instruments_content_fanout_subs" USING btree ("_order");
  CREATE INDEX "instruments_content_fanout_subs_parent_id_idx" ON "instruments_content_fanout_subs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "instruments_content_fanout_subs_locales_locale_parent_id_uni" ON "instruments_content_fanout_subs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "instruments_content_report_panels_order_idx" ON "instruments_content_report_panels" USING btree ("_order");
  CREATE INDEX "instruments_content_report_panels_parent_id_idx" ON "instruments_content_report_panels" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "instruments_content_report_panels_locales_locale_parent_id_u" ON "instruments_content_report_panels_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "instruments_content_calendar_days_order_idx" ON "instruments_content_calendar_days" USING btree ("_order");
  CREATE INDEX "instruments_content_calendar_days_parent_id_idx" ON "instruments_content_calendar_days" USING btree ("_parent_id");
  CREATE INDEX "instruments_content_calendar_days_locale_idx" ON "instruments_content_calendar_days" USING btree ("_locale");
  CREATE INDEX "instruments_content_calendar_items_order_idx" ON "instruments_content_calendar_items" USING btree ("_order");
  CREATE INDEX "instruments_content_calendar_items_parent_id_idx" ON "instruments_content_calendar_items" USING btree ("_parent_id");
  CREATE INDEX "instruments_content_calendar_items_locale_idx" ON "instruments_content_calendar_items" USING btree ("_locale");
  CREATE INDEX "instruments_content__status_idx" ON "instruments_content" USING btree ("_status");
  CREATE UNIQUE INDEX "instruments_content_locales_locale_parent_id_unique" ON "instruments_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_instruments_content_v_version_common_annot_order_idx" ON "_instruments_content_v_version_common_annot" USING btree ("_order");
  CREATE INDEX "_instruments_content_v_version_common_annot_parent_id_idx" ON "_instruments_content_v_version_common_annot" USING btree ("_parent_id");
  CREATE INDEX "_instruments_content_v_version_common_annot_locale_idx" ON "_instruments_content_v_version_common_annot" USING btree ("_locale");
  CREATE INDEX "_instruments_content_v_version_serp_places_order_idx" ON "_instruments_content_v_version_serp_places" USING btree ("_order");
  CREATE INDEX "_instruments_content_v_version_serp_places_parent_id_idx" ON "_instruments_content_v_version_serp_places" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_instruments_content_v_version_serp_places_locales_locale_pa" ON "_instruments_content_v_version_serp_places_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_instruments_content_v_version_instagram_tiles_order_idx" ON "_instruments_content_v_version_instagram_tiles" USING btree ("_order");
  CREATE INDEX "_instruments_content_v_version_instagram_tiles_parent_id_idx" ON "_instruments_content_v_version_instagram_tiles" USING btree ("_parent_id");
  CREATE INDEX "_instruments_content_v_version_instagram_tiles_locale_idx" ON "_instruments_content_v_version_instagram_tiles" USING btree ("_locale");
  CREATE INDEX "_instruments_content_v_version_site_nav_order_idx" ON "_instruments_content_v_version_site_nav" USING btree ("_order");
  CREATE INDEX "_instruments_content_v_version_site_nav_parent_id_idx" ON "_instruments_content_v_version_site_nav" USING btree ("_parent_id");
  CREATE INDEX "_instruments_content_v_version_site_nav_locale_idx" ON "_instruments_content_v_version_site_nav" USING btree ("_locale");
  CREATE INDEX "_instruments_content_v_version_site_menu_order_idx" ON "_instruments_content_v_version_site_menu" USING btree ("_order");
  CREATE INDEX "_instruments_content_v_version_site_menu_parent_id_idx" ON "_instruments_content_v_version_site_menu" USING btree ("_parent_id");
  CREATE INDEX "_instruments_content_v_version_site_menu_locale_idx" ON "_instruments_content_v_version_site_menu" USING btree ("_locale");
  CREATE INDEX "_instruments_content_v_version_site_gauges_order_idx" ON "_instruments_content_v_version_site_gauges" USING btree ("_order");
  CREATE INDEX "_instruments_content_v_version_site_gauges_parent_id_idx" ON "_instruments_content_v_version_site_gauges" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_instruments_content_v_version_site_gauges_locales_locale_pa" ON "_instruments_content_v_version_site_gauges_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_instruments_content_v_version_funnel_steps_order_idx" ON "_instruments_content_v_version_funnel_steps" USING btree ("_order");
  CREATE INDEX "_instruments_content_v_version_funnel_steps_parent_id_idx" ON "_instruments_content_v_version_funnel_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_instruments_content_v_version_funnel_steps_locales_locale_p" ON "_instruments_content_v_version_funnel_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_instruments_content_v_version_ai_answer_cites_order_idx" ON "_instruments_content_v_version_ai_answer_cites" USING btree ("_order");
  CREATE INDEX "_instruments_content_v_version_ai_answer_cites_parent_id_idx" ON "_instruments_content_v_version_ai_answer_cites" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_instruments_content_v_version_ai_answer_cites_locales_local" ON "_instruments_content_v_version_ai_answer_cites_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_instruments_content_v_version_prompts_head_order_idx" ON "_instruments_content_v_version_prompts_head" USING btree ("_order");
  CREATE INDEX "_instruments_content_v_version_prompts_head_parent_id_idx" ON "_instruments_content_v_version_prompts_head" USING btree ("_parent_id");
  CREATE INDEX "_instruments_content_v_version_prompts_head_locale_idx" ON "_instruments_content_v_version_prompts_head" USING btree ("_locale");
  CREATE INDEX "_instruments_content_v_version_prompts_rows_order_idx" ON "_instruments_content_v_version_prompts_rows" USING btree ("_order");
  CREATE INDEX "_instruments_content_v_version_prompts_rows_parent_id_idx" ON "_instruments_content_v_version_prompts_rows" USING btree ("_parent_id");
  CREATE INDEX "_instruments_content_v_version_fanout_subs_order_idx" ON "_instruments_content_v_version_fanout_subs" USING btree ("_order");
  CREATE INDEX "_instruments_content_v_version_fanout_subs_parent_id_idx" ON "_instruments_content_v_version_fanout_subs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_instruments_content_v_version_fanout_subs_locales_locale_pa" ON "_instruments_content_v_version_fanout_subs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_instruments_content_v_version_report_panels_order_idx" ON "_instruments_content_v_version_report_panels" USING btree ("_order");
  CREATE INDEX "_instruments_content_v_version_report_panels_parent_id_idx" ON "_instruments_content_v_version_report_panels" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_instruments_content_v_version_report_panels_locales_locale_" ON "_instruments_content_v_version_report_panels_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_instruments_content_v_version_calendar_days_order_idx" ON "_instruments_content_v_version_calendar_days" USING btree ("_order");
  CREATE INDEX "_instruments_content_v_version_calendar_days_parent_id_idx" ON "_instruments_content_v_version_calendar_days" USING btree ("_parent_id");
  CREATE INDEX "_instruments_content_v_version_calendar_days_locale_idx" ON "_instruments_content_v_version_calendar_days" USING btree ("_locale");
  CREATE INDEX "_instruments_content_v_version_calendar_items_order_idx" ON "_instruments_content_v_version_calendar_items" USING btree ("_order");
  CREATE INDEX "_instruments_content_v_version_calendar_items_parent_id_idx" ON "_instruments_content_v_version_calendar_items" USING btree ("_parent_id");
  CREATE INDEX "_instruments_content_v_version_calendar_items_locale_idx" ON "_instruments_content_v_version_calendar_items" USING btree ("_locale");
  CREATE INDEX "_instruments_content_v_version_version__status_idx" ON "_instruments_content_v" USING btree ("version__status");
  CREATE INDEX "_instruments_content_v_created_at_idx" ON "_instruments_content_v" USING btree ("created_at");
  CREATE INDEX "_instruments_content_v_updated_at_idx" ON "_instruments_content_v" USING btree ("updated_at");
  CREATE INDEX "_instruments_content_v_snapshot_idx" ON "_instruments_content_v" USING btree ("snapshot");
  CREATE INDEX "_instruments_content_v_published_locale_idx" ON "_instruments_content_v" USING btree ("published_locale");
  CREATE INDEX "_instruments_content_v_latest_idx" ON "_instruments_content_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_instruments_content_v_locales_locale_parent_id_unique" ON "_instruments_content_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_version_version_default_og_image_idx" ON "_site_settings_v" USING btree ("version_default_og_image_id");
  CREATE INDEX "_site_settings_v_version_version__status_idx" ON "_site_settings_v" USING btree ("version__status");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");
  CREATE INDEX "_site_settings_v_snapshot_idx" ON "_site_settings_v" USING btree ("snapshot");
  CREATE INDEX "_site_settings_v_published_locale_idx" ON "_site_settings_v" USING btree ("published_locale");
  CREATE INDEX "_site_settings_v_latest_idx" ON "_site_settings_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_site_settings_v_locales_locale_parent_id_unique" ON "_site_settings_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ui_labels__status_idx" ON "ui_labels" USING btree ("_status");
  CREATE UNIQUE INDEX "ui_labels_locales_locale_parent_id_unique" ON "ui_labels_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ui_labels_v_version_version__status_idx" ON "_ui_labels_v" USING btree ("version__status");
  CREATE INDEX "_ui_labels_v_created_at_idx" ON "_ui_labels_v" USING btree ("created_at");
  CREATE INDEX "_ui_labels_v_updated_at_idx" ON "_ui_labels_v" USING btree ("updated_at");
  CREATE INDEX "_ui_labels_v_snapshot_idx" ON "_ui_labels_v" USING btree ("snapshot");
  CREATE INDEX "_ui_labels_v_published_locale_idx" ON "_ui_labels_v" USING btree ("published_locale");
  CREATE INDEX "_ui_labels_v_latest_idx" ON "_ui_labels_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_ui_labels_v_locales_locale_parent_id_unique" ON "_ui_labels_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_service_pages_fk" FOREIGN KEY ("service_pages_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_legal_pages_fk" FOREIGN KEY ("legal_pages_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_service_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("service_pages_id");
  CREATE INDEX "payload_locked_documents_rels_legal_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("legal_pages_id");
  CREATE INDEX "site_settings__status_idx" ON "site_settings" USING btree ("_status");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_faq_id" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_faq_en" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_trust" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_hl" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_usp_pts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_usp" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_inc_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_inc_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_ai_head" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_ai_rows_cells" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_ai_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_work" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_tier_feat" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_tiers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_addons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_mod_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_mods" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_grp_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_sel_opt" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_sel" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_grp" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_proj" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_src" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_fed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_feeds" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_trust_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_hl_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_usp_pts_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_usp_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_inc_items_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_inc_tabs_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_ai_head_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_ai_rows_v_cells" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_ai_rows_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_work_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_tier_feat_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_tiers_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_addons_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_mod_items_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_mods_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_grp_items_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_sel_opt_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_sel_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_grp_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_proj_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_stats_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_faq_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_src_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_fed_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sp_feeds_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_service_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_service_pages_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "legal_pages_content_intro" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "lp_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "lp_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "legal_pages_content_ask" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "legal_pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "legal_pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_legal_pages_v_version_content_intro" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_lp_items_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_lp_sections_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_legal_pages_v_version_content_ask" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_legal_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_legal_pages_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_hero_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_hero_lines_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_c360_pillar_line" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_c360_pillar_line_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_process_groups_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_process_groups_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_process_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_process_groups_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "o0" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "q0" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "o1" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "q1" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "o2" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "q2" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "o3" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "q3" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "o4" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "q4" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "o5" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "q5" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "o6" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "q6" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "o7" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "q7" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_hero_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_hero_lines_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_c360_pillar_line" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_c360_pillar_line_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_process_groups_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_process_groups_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_process_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_process_groups_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_o0_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_q0_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_o1_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_q1_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_o2_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_q2_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_o3_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_q3_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_o4_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_q4_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_o5_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_q5_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_o6_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_q6_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_o7_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_q7_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hub_page_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hub_page_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hub_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hub_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_hub_page_v_version_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_hub_page_v_version_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_hub_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_hub_page_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_story_who" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_story_ways" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_story_ways_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_why_why" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_why_why_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_why_not" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_aside_facts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_aside_facts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_story_who" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_story_ways" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_story_ways_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_why_why" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_why_why_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_why_not" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_aside_facts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_aside_facts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_budget_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_budget_options_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_timeline_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_timeline_options_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_next_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contact_page_v_version_budget_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contact_page_v_version_budget_options_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contact_page_v_version_timeline_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contact_page_v_version_timeline_options_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contact_page_v_version_next_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contact_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contact_page_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_page_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "portfolio_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "portfolio_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_portfolio_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_portfolio_page_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "not_found_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "not_found_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_not_found_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_not_found_page_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "campaign_content_nodes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "campaign_content_nodes_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "campaign_content_edges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "campaign_content_edges_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "campaign_content_pillars" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "campaign_content_pillars_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "campaign_content_table_head" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "campaign_content_extras" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "campaign_content_extras_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "campaign_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "campaign_content_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_campaign_content_v_version_nodes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_campaign_content_v_version_nodes_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_campaign_content_v_version_edges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_campaign_content_v_version_edges_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_campaign_content_v_version_pillars" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_campaign_content_v_version_pillars_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_campaign_content_v_version_table_head" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_campaign_content_v_version_extras" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_campaign_content_v_version_extras_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_campaign_content_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_campaign_content_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instruments_content_common_annot" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instruments_content_serp_places" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instruments_content_serp_places_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instruments_content_instagram_tiles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instruments_content_site_nav" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instruments_content_site_menu" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instruments_content_site_gauges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instruments_content_site_gauges_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instruments_content_funnel_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instruments_content_funnel_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instruments_content_ai_answer_cites" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instruments_content_ai_answer_cites_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instruments_content_prompts_head" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instruments_content_prompts_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instruments_content_fanout_subs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instruments_content_fanout_subs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instruments_content_report_panels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instruments_content_report_panels_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instruments_content_calendar_days" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instruments_content_calendar_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instruments_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instruments_content_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instruments_content_v_version_common_annot" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instruments_content_v_version_serp_places" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instruments_content_v_version_serp_places_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instruments_content_v_version_instagram_tiles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instruments_content_v_version_site_nav" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instruments_content_v_version_site_menu" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instruments_content_v_version_site_gauges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instruments_content_v_version_site_gauges_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instruments_content_v_version_funnel_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instruments_content_v_version_funnel_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instruments_content_v_version_ai_answer_cites" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instruments_content_v_version_ai_answer_cites_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instruments_content_v_version_prompts_head" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instruments_content_v_version_prompts_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instruments_content_v_version_fanout_subs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instruments_content_v_version_fanout_subs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instruments_content_v_version_report_panels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instruments_content_v_version_report_panels_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instruments_content_v_version_calendar_days" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instruments_content_v_version_calendar_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instruments_content_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instruments_content_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_settings_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_settings_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ui_labels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ui_labels_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_ui_labels_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_ui_labels_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "posts_faq_id" CASCADE;
  DROP TABLE "posts_faq_en" CASCADE;
  DROP TABLE "sp_trust" CASCADE;
  DROP TABLE "sp_hl" CASCADE;
  DROP TABLE "sp_usp_pts" CASCADE;
  DROP TABLE "sp_usp" CASCADE;
  DROP TABLE "sp_inc_items" CASCADE;
  DROP TABLE "sp_inc_tabs" CASCADE;
  DROP TABLE "sp_ai_head" CASCADE;
  DROP TABLE "sp_ai_rows_cells" CASCADE;
  DROP TABLE "sp_ai_rows" CASCADE;
  DROP TABLE "sp_work" CASCADE;
  DROP TABLE "sp_tier_feat" CASCADE;
  DROP TABLE "sp_tiers" CASCADE;
  DROP TABLE "sp_addons" CASCADE;
  DROP TABLE "sp_mod_items" CASCADE;
  DROP TABLE "sp_mods" CASCADE;
  DROP TABLE "sp_grp_items" CASCADE;
  DROP TABLE "sp_sel_opt" CASCADE;
  DROP TABLE "sp_sel" CASCADE;
  DROP TABLE "sp_grp" CASCADE;
  DROP TABLE "sp_proj" CASCADE;
  DROP TABLE "sp_stats" CASCADE;
  DROP TABLE "sp_faq" CASCADE;
  DROP TABLE "sp_src" CASCADE;
  DROP TABLE "sp_fed" CASCADE;
  DROP TABLE "sp_feeds" CASCADE;
  DROP TABLE "service_pages" CASCADE;
  DROP TABLE "service_pages_locales" CASCADE;
  DROP TABLE "_sp_trust_v" CASCADE;
  DROP TABLE "_sp_hl_v" CASCADE;
  DROP TABLE "_sp_usp_pts_v" CASCADE;
  DROP TABLE "_sp_usp_v" CASCADE;
  DROP TABLE "_sp_inc_items_v" CASCADE;
  DROP TABLE "_sp_inc_tabs_v" CASCADE;
  DROP TABLE "_sp_ai_head_v" CASCADE;
  DROP TABLE "_sp_ai_rows_v_cells" CASCADE;
  DROP TABLE "_sp_ai_rows_v" CASCADE;
  DROP TABLE "_sp_work_v" CASCADE;
  DROP TABLE "_sp_tier_feat_v" CASCADE;
  DROP TABLE "_sp_tiers_v" CASCADE;
  DROP TABLE "_sp_addons_v" CASCADE;
  DROP TABLE "_sp_mod_items_v" CASCADE;
  DROP TABLE "_sp_mods_v" CASCADE;
  DROP TABLE "_sp_grp_items_v" CASCADE;
  DROP TABLE "_sp_sel_opt_v" CASCADE;
  DROP TABLE "_sp_sel_v" CASCADE;
  DROP TABLE "_sp_grp_v" CASCADE;
  DROP TABLE "_sp_proj_v" CASCADE;
  DROP TABLE "_sp_stats_v" CASCADE;
  DROP TABLE "_sp_faq_v" CASCADE;
  DROP TABLE "_sp_src_v" CASCADE;
  DROP TABLE "_sp_fed_v" CASCADE;
  DROP TABLE "_sp_feeds_v" CASCADE;
  DROP TABLE "_service_pages_v" CASCADE;
  DROP TABLE "_service_pages_v_locales" CASCADE;
  DROP TABLE "legal_pages_content_intro" CASCADE;
  DROP TABLE "lp_items" CASCADE;
  DROP TABLE "lp_sections" CASCADE;
  DROP TABLE "legal_pages_content_ask" CASCADE;
  DROP TABLE "legal_pages" CASCADE;
  DROP TABLE "legal_pages_locales" CASCADE;
  DROP TABLE "_legal_pages_v_version_content_intro" CASCADE;
  DROP TABLE "_lp_items_v" CASCADE;
  DROP TABLE "_lp_sections_v" CASCADE;
  DROP TABLE "_legal_pages_v_version_content_ask" CASCADE;
  DROP TABLE "_legal_pages_v" CASCADE;
  DROP TABLE "_legal_pages_v_locales" CASCADE;
  DROP TABLE "home_page_hero_lines" CASCADE;
  DROP TABLE "home_page_hero_lines_locales" CASCADE;
  DROP TABLE "home_page_c360_pillar_line" CASCADE;
  DROP TABLE "home_page_c360_pillar_line_locales" CASCADE;
  DROP TABLE "home_page_process_groups_steps" CASCADE;
  DROP TABLE "home_page_process_groups_steps_locales" CASCADE;
  DROP TABLE "home_page_process_groups" CASCADE;
  DROP TABLE "home_page_process_groups_locales" CASCADE;
  DROP TABLE "home_page_faq" CASCADE;
  DROP TABLE "home_page_faq_locales" CASCADE;
  DROP TABLE "o0" CASCADE;
  DROP TABLE "q0" CASCADE;
  DROP TABLE "o1" CASCADE;
  DROP TABLE "q1" CASCADE;
  DROP TABLE "o2" CASCADE;
  DROP TABLE "q2" CASCADE;
  DROP TABLE "o3" CASCADE;
  DROP TABLE "q3" CASCADE;
  DROP TABLE "o4" CASCADE;
  DROP TABLE "q4" CASCADE;
  DROP TABLE "o5" CASCADE;
  DROP TABLE "q5" CASCADE;
  DROP TABLE "o6" CASCADE;
  DROP TABLE "q6" CASCADE;
  DROP TABLE "o7" CASCADE;
  DROP TABLE "q7" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_locales" CASCADE;
  DROP TABLE "_home_page_v_version_hero_lines" CASCADE;
  DROP TABLE "_home_page_v_version_hero_lines_locales" CASCADE;
  DROP TABLE "_home_page_v_version_c360_pillar_line" CASCADE;
  DROP TABLE "_home_page_v_version_c360_pillar_line_locales" CASCADE;
  DROP TABLE "_home_page_v_version_process_groups_steps" CASCADE;
  DROP TABLE "_home_page_v_version_process_groups_steps_locales" CASCADE;
  DROP TABLE "_home_page_v_version_process_groups" CASCADE;
  DROP TABLE "_home_page_v_version_process_groups_locales" CASCADE;
  DROP TABLE "_home_page_v_version_faq" CASCADE;
  DROP TABLE "_home_page_v_version_faq_locales" CASCADE;
  DROP TABLE "_o0_v" CASCADE;
  DROP TABLE "_q0_v" CASCADE;
  DROP TABLE "_o1_v" CASCADE;
  DROP TABLE "_q1_v" CASCADE;
  DROP TABLE "_o2_v" CASCADE;
  DROP TABLE "_q2_v" CASCADE;
  DROP TABLE "_o3_v" CASCADE;
  DROP TABLE "_q3_v" CASCADE;
  DROP TABLE "_o4_v" CASCADE;
  DROP TABLE "_q4_v" CASCADE;
  DROP TABLE "_o5_v" CASCADE;
  DROP TABLE "_q5_v" CASCADE;
  DROP TABLE "_o6_v" CASCADE;
  DROP TABLE "_q6_v" CASCADE;
  DROP TABLE "_o7_v" CASCADE;
  DROP TABLE "_q7_v" CASCADE;
  DROP TABLE "_home_page_v" CASCADE;
  DROP TABLE "_home_page_v_locales" CASCADE;
  DROP TABLE "hub_page_faq" CASCADE;
  DROP TABLE "hub_page_faq_locales" CASCADE;
  DROP TABLE "hub_page" CASCADE;
  DROP TABLE "hub_page_locales" CASCADE;
  DROP TABLE "_hub_page_v_version_faq" CASCADE;
  DROP TABLE "_hub_page_v_version_faq_locales" CASCADE;
  DROP TABLE "_hub_page_v" CASCADE;
  DROP TABLE "_hub_page_v_locales" CASCADE;
  DROP TABLE "about_page_story_who" CASCADE;
  DROP TABLE "about_page_story_ways" CASCADE;
  DROP TABLE "about_page_story_ways_locales" CASCADE;
  DROP TABLE "about_page_why_why" CASCADE;
  DROP TABLE "about_page_why_why_locales" CASCADE;
  DROP TABLE "about_page_why_not" CASCADE;
  DROP TABLE "about_page_aside_facts" CASCADE;
  DROP TABLE "about_page_aside_facts_locales" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "about_page_locales" CASCADE;
  DROP TABLE "_about_page_v_version_story_who" CASCADE;
  DROP TABLE "_about_page_v_version_story_ways" CASCADE;
  DROP TABLE "_about_page_v_version_story_ways_locales" CASCADE;
  DROP TABLE "_about_page_v_version_why_why" CASCADE;
  DROP TABLE "_about_page_v_version_why_why_locales" CASCADE;
  DROP TABLE "_about_page_v_version_why_not" CASCADE;
  DROP TABLE "_about_page_v_version_aside_facts" CASCADE;
  DROP TABLE "_about_page_v_version_aside_facts_locales" CASCADE;
  DROP TABLE "_about_page_v" CASCADE;
  DROP TABLE "_about_page_v_locales" CASCADE;
  DROP TABLE "contact_page_budget_options" CASCADE;
  DROP TABLE "contact_page_budget_options_locales" CASCADE;
  DROP TABLE "contact_page_timeline_options" CASCADE;
  DROP TABLE "contact_page_timeline_options_locales" CASCADE;
  DROP TABLE "contact_page_next_steps" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "contact_page_locales" CASCADE;
  DROP TABLE "_contact_page_v_version_budget_options" CASCADE;
  DROP TABLE "_contact_page_v_version_budget_options_locales" CASCADE;
  DROP TABLE "_contact_page_v_version_timeline_options" CASCADE;
  DROP TABLE "_contact_page_v_version_timeline_options_locales" CASCADE;
  DROP TABLE "_contact_page_v_version_next_steps" CASCADE;
  DROP TABLE "_contact_page_v" CASCADE;
  DROP TABLE "_contact_page_v_locales" CASCADE;
  DROP TABLE "blog_page" CASCADE;
  DROP TABLE "blog_page_locales" CASCADE;
  DROP TABLE "_blog_page_v" CASCADE;
  DROP TABLE "_blog_page_v_locales" CASCADE;
  DROP TABLE "portfolio_page" CASCADE;
  DROP TABLE "portfolio_page_locales" CASCADE;
  DROP TABLE "_portfolio_page_v" CASCADE;
  DROP TABLE "_portfolio_page_v_locales" CASCADE;
  DROP TABLE "not_found_page" CASCADE;
  DROP TABLE "not_found_page_locales" CASCADE;
  DROP TABLE "_not_found_page_v" CASCADE;
  DROP TABLE "_not_found_page_v_locales" CASCADE;
  DROP TABLE "campaign_content_nodes" CASCADE;
  DROP TABLE "campaign_content_nodes_locales" CASCADE;
  DROP TABLE "campaign_content_edges" CASCADE;
  DROP TABLE "campaign_content_edges_locales" CASCADE;
  DROP TABLE "campaign_content_pillars" CASCADE;
  DROP TABLE "campaign_content_pillars_locales" CASCADE;
  DROP TABLE "campaign_content_table_head" CASCADE;
  DROP TABLE "campaign_content_extras" CASCADE;
  DROP TABLE "campaign_content_extras_locales" CASCADE;
  DROP TABLE "campaign_content" CASCADE;
  DROP TABLE "campaign_content_locales" CASCADE;
  DROP TABLE "_campaign_content_v_version_nodes" CASCADE;
  DROP TABLE "_campaign_content_v_version_nodes_locales" CASCADE;
  DROP TABLE "_campaign_content_v_version_edges" CASCADE;
  DROP TABLE "_campaign_content_v_version_edges_locales" CASCADE;
  DROP TABLE "_campaign_content_v_version_pillars" CASCADE;
  DROP TABLE "_campaign_content_v_version_pillars_locales" CASCADE;
  DROP TABLE "_campaign_content_v_version_table_head" CASCADE;
  DROP TABLE "_campaign_content_v_version_extras" CASCADE;
  DROP TABLE "_campaign_content_v_version_extras_locales" CASCADE;
  DROP TABLE "_campaign_content_v" CASCADE;
  DROP TABLE "_campaign_content_v_locales" CASCADE;
  DROP TABLE "instruments_content_common_annot" CASCADE;
  DROP TABLE "instruments_content_serp_places" CASCADE;
  DROP TABLE "instruments_content_serp_places_locales" CASCADE;
  DROP TABLE "instruments_content_instagram_tiles" CASCADE;
  DROP TABLE "instruments_content_site_nav" CASCADE;
  DROP TABLE "instruments_content_site_menu" CASCADE;
  DROP TABLE "instruments_content_site_gauges" CASCADE;
  DROP TABLE "instruments_content_site_gauges_locales" CASCADE;
  DROP TABLE "instruments_content_funnel_steps" CASCADE;
  DROP TABLE "instruments_content_funnel_steps_locales" CASCADE;
  DROP TABLE "instruments_content_ai_answer_cites" CASCADE;
  DROP TABLE "instruments_content_ai_answer_cites_locales" CASCADE;
  DROP TABLE "instruments_content_prompts_head" CASCADE;
  DROP TABLE "instruments_content_prompts_rows" CASCADE;
  DROP TABLE "instruments_content_fanout_subs" CASCADE;
  DROP TABLE "instruments_content_fanout_subs_locales" CASCADE;
  DROP TABLE "instruments_content_report_panels" CASCADE;
  DROP TABLE "instruments_content_report_panels_locales" CASCADE;
  DROP TABLE "instruments_content_calendar_days" CASCADE;
  DROP TABLE "instruments_content_calendar_items" CASCADE;
  DROP TABLE "instruments_content" CASCADE;
  DROP TABLE "instruments_content_locales" CASCADE;
  DROP TABLE "_instruments_content_v_version_common_annot" CASCADE;
  DROP TABLE "_instruments_content_v_version_serp_places" CASCADE;
  DROP TABLE "_instruments_content_v_version_serp_places_locales" CASCADE;
  DROP TABLE "_instruments_content_v_version_instagram_tiles" CASCADE;
  DROP TABLE "_instruments_content_v_version_site_nav" CASCADE;
  DROP TABLE "_instruments_content_v_version_site_menu" CASCADE;
  DROP TABLE "_instruments_content_v_version_site_gauges" CASCADE;
  DROP TABLE "_instruments_content_v_version_site_gauges_locales" CASCADE;
  DROP TABLE "_instruments_content_v_version_funnel_steps" CASCADE;
  DROP TABLE "_instruments_content_v_version_funnel_steps_locales" CASCADE;
  DROP TABLE "_instruments_content_v_version_ai_answer_cites" CASCADE;
  DROP TABLE "_instruments_content_v_version_ai_answer_cites_locales" CASCADE;
  DROP TABLE "_instruments_content_v_version_prompts_head" CASCADE;
  DROP TABLE "_instruments_content_v_version_prompts_rows" CASCADE;
  DROP TABLE "_instruments_content_v_version_fanout_subs" CASCADE;
  DROP TABLE "_instruments_content_v_version_fanout_subs_locales" CASCADE;
  DROP TABLE "_instruments_content_v_version_report_panels" CASCADE;
  DROP TABLE "_instruments_content_v_version_report_panels_locales" CASCADE;
  DROP TABLE "_instruments_content_v_version_calendar_days" CASCADE;
  DROP TABLE "_instruments_content_v_version_calendar_items" CASCADE;
  DROP TABLE "_instruments_content_v" CASCADE;
  DROP TABLE "_instruments_content_v_locales" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP TABLE "_site_settings_v_locales" CASCADE;
  DROP TABLE "ui_labels" CASCADE;
  DROP TABLE "ui_labels_locales" CASCADE;
  DROP TABLE "_ui_labels_v" CASCADE;
  DROP TABLE "_ui_labels_v_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_service_pages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_legal_pages_fk";
  
  DROP INDEX "payload_locked_documents_rels_service_pages_id_idx";
  DROP INDEX "payload_locked_documents_rels_legal_pages_id_idx";
  DROP INDEX "site_settings__status_idx";
  ALTER TABLE "posts" DROP COLUMN "related_service";
  ALTER TABLE "posts" DROP COLUMN "show_feature_card";
  ALTER TABLE "posts" DROP COLUMN "mid_cta_show";
  ALTER TABLE "posts" DROP COLUMN "mid_cta_position";
  ALTER TABLE "posts" DROP COLUMN "no_index";
  ALTER TABLE "users" DROP COLUMN "job_title_id";
  ALTER TABLE "users" DROP COLUMN "job_title_en";
  ALTER TABLE "users" DROP COLUMN "bio_id";
  ALTER TABLE "users" DROP COLUMN "bio_en";
  ALTER TABLE "users" DROP COLUMN "profile_url";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "service_pages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "legal_pages_id";
  ALTER TABLE "site_settings" DROP COLUMN "_status";
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_posts_related_service";
  DROP TYPE "public"."enum_posts_mid_cta_position";
  DROP TYPE "public"."enum_sp_usp_logo";
  DROP TYPE "public"."enum_sp_work_card";
  DROP TYPE "public"."enum_sp_fed_k";
  DROP TYPE "public"."enum_sp_fed_gate";
  DROP TYPE "public"."enum_sp_feeds_k";
  DROP TYPE "public"."enum_sp_feeds_gate";
  DROP TYPE "public"."enum_service_pages_key";
  DROP TYPE "public"."enum_service_pages_status";
  DROP TYPE "public"."enum_service_pages_content_pricing_kind";
  DROP TYPE "public"."enum_service_pages_content_pricing_builder";
  DROP TYPE "public"."enum__sp_usp_v_logo";
  DROP TYPE "public"."enum__sp_work_v_card";
  DROP TYPE "public"."enum__sp_fed_v_k";
  DROP TYPE "public"."enum__sp_fed_v_gate";
  DROP TYPE "public"."enum__sp_feeds_v_k";
  DROP TYPE "public"."enum__sp_feeds_v_gate";
  DROP TYPE "public"."enum__service_pages_v_version_key";
  DROP TYPE "public"."enum__service_pages_v_version_status";
  DROP TYPE "public"."enum__service_pages_v_published_locale";
  DROP TYPE "public"."enum__service_pages_v_version_content_pricing_kind";
  DROP TYPE "public"."enum__service_pages_v_version_content_pricing_builder";
  DROP TYPE "public"."enum_legal_pages_key";
  DROP TYPE "public"."enum_legal_pages_status";
  DROP TYPE "public"."enum__legal_pages_v_version_key";
  DROP TYPE "public"."enum__legal_pages_v_version_status";
  DROP TYPE "public"."enum__legal_pages_v_published_locale";
  DROP TYPE "public"."enum_q0_type";
  DROP TYPE "public"."enum_q1_type";
  DROP TYPE "public"."enum_q2_type";
  DROP TYPE "public"."enum_q3_type";
  DROP TYPE "public"."enum_q4_type";
  DROP TYPE "public"."enum_q5_type";
  DROP TYPE "public"."enum_q6_type";
  DROP TYPE "public"."enum_q7_type";
  DROP TYPE "public"."enum_home_page_status";
  DROP TYPE "public"."enum__q0_v_type";
  DROP TYPE "public"."enum__q1_v_type";
  DROP TYPE "public"."enum__q2_v_type";
  DROP TYPE "public"."enum__q3_v_type";
  DROP TYPE "public"."enum__q4_v_type";
  DROP TYPE "public"."enum__q5_v_type";
  DROP TYPE "public"."enum__q6_v_type";
  DROP TYPE "public"."enum__q7_v_type";
  DROP TYPE "public"."enum__home_page_v_version_status";
  DROP TYPE "public"."enum__home_page_v_published_locale";
  DROP TYPE "public"."enum_hub_page_status";
  DROP TYPE "public"."enum__hub_page_v_version_status";
  DROP TYPE "public"."enum__hub_page_v_published_locale";
  DROP TYPE "public"."enum_about_page_status";
  DROP TYPE "public"."enum__about_page_v_version_status";
  DROP TYPE "public"."enum__about_page_v_published_locale";
  DROP TYPE "public"."enum_contact_page_status";
  DROP TYPE "public"."enum__contact_page_v_version_status";
  DROP TYPE "public"."enum__contact_page_v_published_locale";
  DROP TYPE "public"."enum_blog_page_status";
  DROP TYPE "public"."enum__blog_page_v_version_status";
  DROP TYPE "public"."enum__blog_page_v_published_locale";
  DROP TYPE "public"."enum_portfolio_page_status";
  DROP TYPE "public"."enum__portfolio_page_v_version_status";
  DROP TYPE "public"."enum__portfolio_page_v_published_locale";
  DROP TYPE "public"."enum_not_found_page_status";
  DROP TYPE "public"."enum__not_found_page_v_version_status";
  DROP TYPE "public"."enum__not_found_page_v_published_locale";
  DROP TYPE "public"."enum_campaign_content_status";
  DROP TYPE "public"."enum__campaign_content_v_version_status";
  DROP TYPE "public"."enum__campaign_content_v_published_locale";
  DROP TYPE "public"."enum_instruments_content_status";
  DROP TYPE "public"."enum__instruments_content_v_version_status";
  DROP TYPE "public"."enum__instruments_content_v_published_locale";
  DROP TYPE "public"."enum_site_settings_status";
  DROP TYPE "public"."enum__site_settings_v_version_status";
  DROP TYPE "public"."enum__site_settings_v_published_locale";
  DROP TYPE "public"."enum_ui_labels_status";
  DROP TYPE "public"."enum__ui_labels_v_version_status";
  DROP TYPE "public"."enum__ui_labels_v_published_locale";`)
}
