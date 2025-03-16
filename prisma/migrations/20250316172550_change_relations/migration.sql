/*
  Warnings:

  - A unique constraint covering the columns `[paymentsId]` on the table `BillingAddress` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[paymentsId]` on the table `PaymentInformation` will be added. If there are existing duplicate values, this will fail.
  - Made the column `paymentsId` on table `BillingAddress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `paymentsId` on table `PaymentInformation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BillingAddress" DROP CONSTRAINT "BillingAddress_paymentsId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentInformation" DROP CONSTRAINT "PaymentInformation_paymentsId_fkey";

-- AlterTable
ALTER TABLE "BillingAddress" ALTER COLUMN "paymentsId" SET NOT NULL;

-- AlterTable
ALTER TABLE "PaymentInformation" ALTER COLUMN "paymentsId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BillingAddress_paymentsId_key" ON "BillingAddress"("paymentsId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentInformation_paymentsId_key" ON "PaymentInformation"("paymentsId");

-- AddForeignKey
ALTER TABLE "BillingAddress" ADD CONSTRAINT "BillingAddress_paymentsId_fkey" FOREIGN KEY ("paymentsId") REFERENCES "Payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentInformation" ADD CONSTRAINT "PaymentInformation_paymentsId_fkey" FOREIGN KEY ("paymentsId") REFERENCES "Payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
