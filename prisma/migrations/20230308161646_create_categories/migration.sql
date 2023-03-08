/*
  Warnings:

  - You are about to drop the `Acitivity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Acitivity`;

-- CreateTable
CREATE TABLE `Activity` (
    `activityId` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `activityName` VARCHAR(300) NULL,
    `activityPeriod` VARCHAR(300) NULL,
    `certification` BIT(1) NOT NULL,

    UNIQUE INDEX `Activity_activityId_key`(`activityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
