import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "case_studies" ALTER COLUMN "industry" DROP NOT NULL;
  ALTER TABLE "case_studies" ALTER COLUMN "challenge" DROP NOT NULL;
  ALTER TABLE "case_studies" ALTER COLUMN "strategy" DROP NOT NULL;
  ALTER TABLE "case_studies" ALTER COLUMN "results" DROP NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "case_studies" ALTER COLUMN "industry" SET NOT NULL;
  ALTER TABLE "case_studies" ALTER COLUMN "challenge" SET NOT NULL;
  ALTER TABLE "case_studies" ALTER COLUMN "strategy" SET NOT NULL;
  ALTER TABLE "case_studies" ALTER COLUMN "results" SET NOT NULL;`)
}
