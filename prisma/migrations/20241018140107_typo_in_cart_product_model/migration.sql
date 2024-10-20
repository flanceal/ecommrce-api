/*
  Warnings:

  - You are about to drop the column `quatity` on the `CartProduct` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `CartProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CartProduct` DROP COLUMN `quatity`,
    ADD COLUMN `quantity` INTEGER NOT NULL;
