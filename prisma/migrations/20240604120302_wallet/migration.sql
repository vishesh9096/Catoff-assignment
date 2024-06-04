/*
  Warnings:

  - You are about to drop the column `addresss` on the `Wallet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[address]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Wallet_addresss_key";

-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "addresss",
ADD COLUMN     "address" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_address_key" ON "Wallet"("address");
