/*
  Warnings:

  - You are about to drop the `_BillingAddressToPayments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PaymentInformationToPayments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BillingAddressToPayments" DROP CONSTRAINT "_BillingAddressToPayments_A_fkey";

-- DropForeignKey
ALTER TABLE "_BillingAddressToPayments" DROP CONSTRAINT "_BillingAddressToPayments_B_fkey";

-- DropForeignKey
ALTER TABLE "_PaymentInformationToPayments" DROP CONSTRAINT "_PaymentInformationToPayments_A_fkey";

-- DropForeignKey
ALTER TABLE "_PaymentInformationToPayments" DROP CONSTRAINT "_PaymentInformationToPayments_B_fkey";

-- AlterTable
ALTER TABLE "BillingAddress" ADD COLUMN     "paymentsId" TEXT;

-- AlterTable
ALTER TABLE "PaymentInformation" ADD COLUMN     "paymentsId" TEXT;

-- DropTable
DROP TABLE "_BillingAddressToPayments";

-- DropTable
DROP TABLE "_PaymentInformationToPayments";

-- AddForeignKey
ALTER TABLE "BillingAddress" ADD CONSTRAINT "BillingAddress_paymentsId_fkey" FOREIGN KEY ("paymentsId") REFERENCES "Payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentInformation" ADD CONSTRAINT "PaymentInformation_paymentsId_fkey" FOREIGN KEY ("paymentsId") REFERENCES "Payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
