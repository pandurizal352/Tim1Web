-- AlterTable
ALTER TABLE `peserta` ADD COLUMN `bukti_pembayaran` VARCHAR(191) NULL,
    ADD COLUMN `status_pembayaran` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `telpn_perusahaan` VARCHAR(191) NOT NULL;
