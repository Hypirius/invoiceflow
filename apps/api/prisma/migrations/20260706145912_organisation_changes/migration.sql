/*
  Warnings:

  - A unique constraint covering the columns `[stripe_account_id]` on the table `organisation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `organisation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organisation" ADD COLUMN     "charges_enabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "payouts_enabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stripe_account_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "organisation_stripe_account_id_key" ON "organisation"("stripe_account_id");
