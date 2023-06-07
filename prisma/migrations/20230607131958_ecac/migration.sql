-- CreateTable
CREATE TABLE `Inquiry` (
    `inquiryId` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `inquiryTitle` VARCHAR(200) NULL,
    `inquiryContent` VARCHAR(500) NOT NULL,
    `publishDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Inquiry_inquiryId_key`(`inquiryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
