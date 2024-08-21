/*
  Warnings:

  - Added the required column `category` to the `Finance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `finance` ADD COLUMN `category` VARCHAR(191) NOT NULL;
