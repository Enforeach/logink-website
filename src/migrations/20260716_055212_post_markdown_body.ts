import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_body_format" AS ENUM('richtext', 'markdown');
  ALTER TABLE "posts" ALTER COLUMN "body_id" DROP NOT NULL;
  ALTER TABLE "posts" ADD COLUMN "body_format" "enum_posts_body_format" DEFAULT 'richtext';
  ALTER TABLE "posts" ADD COLUMN "body_markdown_id" varchar;
  ALTER TABLE "posts" ADD COLUMN "body_markdown_en" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" ALTER COLUMN "body_id" SET NOT NULL;
  ALTER TABLE "posts" DROP COLUMN "body_format";
  ALTER TABLE "posts" DROP COLUMN "body_markdown_id";
  ALTER TABLE "posts" DROP COLUMN "body_markdown_en";
  DROP TYPE "public"."enum_posts_body_format";`)
}
