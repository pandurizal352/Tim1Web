-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_institusi` VARCHAR(191) NOT NULL,
    `email_perusahaan` VARCHAR(191) NOT NULL,
    `telpn_perusahaan` INTEGER NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `posisi` VARCHAR(191) NOT NULL,
    `status_pembayaran` VARCHAR(191) NULL,
    `bukti_pembayaran` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_perusahaan_key`(`email_perusahaan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Peserta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_peserta` VARCHAR(191) NOT NULL,
    `email_peserta` VARCHAR(191) NOT NULL,
    `telpn_peserta` VARCHAR(191) NOT NULL,
    `alamat_peserta` VARCHAR(191) NOT NULL,
    `id_user` INTEGER NULL,
    `id_bidang` INTEGER NULL,
    `id_pelatihan` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bidang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_bidang` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pelatihan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `biaya` INTEGER NOT NULL,
    `jangka_waktu` VARCHAR(191) NOT NULL,
    `nama_pelatihan` VARCHAR(191) NOT NULL,
    `id_bidang` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sertifikasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_dokumen` VARCHAR(191) NOT NULL,
    `tanggal_dan_bulan` DATETIME(3) NOT NULL,
    `id_pelatihan` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PesertaSertifikat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_peserta` INTEGER NOT NULL,
    `id_sertifikat` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Peserta` ADD CONSTRAINT `Peserta_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Peserta` ADD CONSTRAINT `Peserta_id_bidang_fkey` FOREIGN KEY (`id_bidang`) REFERENCES `Bidang`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Peserta` ADD CONSTRAINT `Peserta_id_pelatihan_fkey` FOREIGN KEY (`id_pelatihan`) REFERENCES `Pelatihan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pelatihan` ADD CONSTRAINT `Pelatihan_id_bidang_fkey` FOREIGN KEY (`id_bidang`) REFERENCES `Bidang`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sertifikasi` ADD CONSTRAINT `Sertifikasi_id_pelatihan_fkey` FOREIGN KEY (`id_pelatihan`) REFERENCES `Pelatihan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PesertaSertifikat` ADD CONSTRAINT `PesertaSertifikat_id_peserta_fkey` FOREIGN KEY (`id_peserta`) REFERENCES `Peserta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PesertaSertifikat` ADD CONSTRAINT `PesertaSertifikat_id_sertifikat_fkey` FOREIGN KEY (`id_sertifikat`) REFERENCES `Sertifikasi`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
