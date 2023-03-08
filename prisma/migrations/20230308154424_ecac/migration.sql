-- CreateTable
CREATE TABLE `PostInterest` (
    `collectId` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `postId` BIGINT NOT NULL,

    UNIQUE INDEX `PostInterest_collectId_key`(`collectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
