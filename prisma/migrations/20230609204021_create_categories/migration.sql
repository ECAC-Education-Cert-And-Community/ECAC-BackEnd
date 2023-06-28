-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `Comments_postId_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `Comments_userId_fkey`;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `posts`(`postId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `activity` RENAME INDEX `Activity_activityId_key` TO `activity_activityId_key`;

-- RenameIndex
ALTER TABLE `postinterest` RENAME INDEX `PostInterest_collectId_key` TO `postInterest_collectId_key`;

-- RenameIndex
ALTER TABLE `posts` RENAME INDEX `Posts_postId_key` TO `posts_postId_key`;

-- RenameIndex
ALTER TABLE `users` RENAME INDEX `Users_userEmail_key` TO `users_userEmail_key`;
