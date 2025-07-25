/*
  Warnings:

  - You are about to drop the column `timeStamp` on the `Telemetry` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Telemetry` table. All the data in the column will be lost.
  - Added the required column `timestamp` to the `Telemetry` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `deviceId` on the `Telemetry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Telemetry" DROP CONSTRAINT "Telemetry_userId_fkey";

-- AlterTable
ALTER TABLE "Telemetry" DROP COLUMN "timeStamp",
DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL,
DROP COLUMN "deviceId",
ADD COLUMN     "deviceId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Device" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Telemetry" ADD CONSTRAINT "Telemetry_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
