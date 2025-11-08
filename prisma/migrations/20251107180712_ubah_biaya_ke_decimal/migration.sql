/*
  Warnings:

  - You are about to alter the column `biaya` on the `pelatihan` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(20,2)`.

*/
-- AlterTable
ALTER TABLE `pelatihan` MODIFY `biaya` DECIMAL(20, 2) NOT NULL;

-- AlterTable
ALTER TABLE `peserta` MODIFY `telpn_peserta` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `status_pembayaran` VARCHAR(191) NULL;
