/*
  Warnings:

  - You are about to drop the column `user_receiver_id` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_user_receiver_id_fkey`;

-- DropIndex
DROP INDEX `Message_user_receiver_id_fkey` ON `Message`;

-- AlterTable
ALTER TABLE `Message` DROP COLUMN `user_receiver_id`,
    ADD COLUMN `is_read` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `Conversation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `last_message_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user1_id` INTEGER NOT NULL,
    `user2_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_user1_id_fkey` FOREIGN KEY (`user1_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_user2_id_fkey` FOREIGN KEY (`user2_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
