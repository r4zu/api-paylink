/*
  Warnings:

  - You are about to drop the column `billing_address_id` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `payment_information_id` on the `Payments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_billing_address_id_fkey";

-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_payment_information_id_fkey";

-- AlterTable
ALTER TABLE "Payments" DROP COLUMN "billing_address_id",
DROP COLUMN "payment_information_id";

-- CreateTable
CREATE TABLE "_BillingAddressToPayments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BillingAddressToPayments_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PaymentInformationToPayments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PaymentInformationToPayments_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BillingAddressToPayments_B_index" ON "_BillingAddressToPayments"("B");

-- CreateIndex
CREATE INDEX "_PaymentInformationToPayments_B_index" ON "_PaymentInformationToPayments"("B");

-- AddForeignKey
ALTER TABLE "_BillingAddressToPayments" ADD CONSTRAINT "_BillingAddressToPayments_A_fkey" FOREIGN KEY ("A") REFERENCES "BillingAddress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BillingAddressToPayments" ADD CONSTRAINT "_BillingAddressToPayments_B_fkey" FOREIGN KEY ("B") REFERENCES "Payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentInformationToPayments" ADD CONSTRAINT "_PaymentInformationToPayments_A_fkey" FOREIGN KEY ("A") REFERENCES "PaymentInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentInformationToPayments" ADD CONSTRAINT "_PaymentInformationToPayments_B_fkey" FOREIGN KEY ("B") REFERENCES "Payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
