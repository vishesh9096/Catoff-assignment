/*
  Warnings:

  - You are about to drop the `WalletAddress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "WalletAddress";

-- CreateTable
CREATE TABLE "Wallet" (
    "wallet_id" SERIAL NOT NULL,
    "addresss" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("wallet_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_addresss_key" ON "Wallet"("addresss");
