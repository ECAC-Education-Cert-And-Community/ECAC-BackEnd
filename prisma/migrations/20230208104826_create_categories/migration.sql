-- CreateTable
CREATE TABLE `Users` (
    `userId` BIGINT NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(10) NOT NULL,
    `department` VARCHAR(20) NOT NULL,
    `userNick` VARCHAR(10) NULL,
    `userEmail` VARCHAR(50) NOT NULL,
    `userPW` VARCHAR(10) NOT NULL,
    `userPhoneNum` VARCHAR(12) NOT NULL,
    `profileImagePath` VARCHAR(200) NULL,
    `userRole` BIT(1) NOT NULL,
    `activityNum` BIGINT NULL,
    `serviceAgree` BIT(1) NOT NULL,
    `regDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `pointStatus` BIGINT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Posts` (
    `postId` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `postTitle` VARCHAR(200) NULL,
    `postContent` VARCHAR(500) NOT NULL,
    `imagePath` VARCHAR(200) NULL,
    `publishDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tag` VARCHAR(100) NOT NULL,
    `postViews` BIGINT NOT NULL,
    `postLikes` BIGINT NOT NULL,

    UNIQUE INDEX `Posts_postId_key`(`postId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
