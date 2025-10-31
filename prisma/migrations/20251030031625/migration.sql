/*
  Warnings:

  - You are about to drop the column `alamat` on the `peserta` table. All the data in the column will be lost.
  - Added the required column `alamat_peserta` to the `Peserta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `peserta` DROP COLUMN `alamat`,
    ADD COLUMN `alamat_peserta` VARCHAR(191) NOT NULL;
