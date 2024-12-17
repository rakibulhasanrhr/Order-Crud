/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "Order" (
    "orderId" TEXT NOT NULL,
    "pickupLocation" TEXT NOT NULL,
    "dropOffLocation" TEXT NOT NULL,
    "ambulance" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "phone" TEXT,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderId_key" ON "Order"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_phoneNumber_key" ON "Order"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
