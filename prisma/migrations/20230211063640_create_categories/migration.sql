/*
  Warnings:

  - A unique constraint covering the columns `[userEmail]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Users` MODIFY `userPW` VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Users_userEmail_key` ON `Users`(`userEmail`);
