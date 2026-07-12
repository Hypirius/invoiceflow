/*
  Warnings:

  - A unique constraint covering the columns `[deviceId,userId]` on the table `refresh_tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_deviceId_userId_key" ON "refresh_tokens"("deviceId", "userId");
