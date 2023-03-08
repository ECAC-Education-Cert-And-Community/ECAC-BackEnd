-- CreateTable
CREATE TABLE `Acitivity` (
    `activityId` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `activityName` VARCHAR(300) NULL,
    `activityPeriod` VARCHAR(300) NULL,
    `certification` BIT(1) NOT NULL,

    UNIQUE INDEX `Acitivity_activityId_key`(`activityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
