/*
  Warnings:

  - Added the required column `billing_address_id` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_information_id` to the `Payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payments" ADD COLUMN     "billing_address_id" TEXT NOT NULL,
ADD COLUMN     "payment_information_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "BillingAddress" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BillingAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentInformation" (
    "id" TEXT NOT NULL,
    "name_on_card" TEXT NOT NULL,
    "card_number" TEXT NOT NULL,
    "expiration" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentInformation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_billing_address_id_fkey" FOREIGN KEY ("billing_address_id") REFERENCES "BillingAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_payment_information_id_fkey" FOREIGN KEY ("payment_information_id") REFERENCES "PaymentInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
