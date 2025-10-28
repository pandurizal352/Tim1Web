-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_institusi` VARCHAR(191) NOT NULL,
    `email_perusahaan` VARCHAR(191) NOT NULL,
    `telpn_perusahaan` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Peserta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_peserta` VARCHAR(191) NOT NULL,
    `email_peserta` VARCHAR(191) NOT NULL,
    `telpn_peserta` INTEGER NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `id_user` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bidang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_bidang` VARCHAR(191) NOT NULL,
    `daftar_pelatihan` VARCHAR(191) NULL,
    `id_peserta` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pelatihan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `biaya` INTEGER NOT NULL,
    `jangka_waktu` DATETIME(3) NOT NULL,
    `nama_bidang` VARCHAR(191) NOT NULL,
    `id_peserta` INTEGER NULL,
    `id_Bidang` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sertifikasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nama_dokumen` VARCHAR(191) NOT NULL,
    `tanggal_dan_bulan` DATETIME(3) NOT NULL,
    `id_peserta` INTEGER NOT NULL,
    `id_pelatihan` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Peserta` ADD CONSTRAINT `Peserta_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bidang` ADD CONSTRAINT `Bidang_id_peserta_fkey` FOREIGN KEY (`id_peserta`) REFERENCES `Peserta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pelatihan` ADD CONSTRAINT `Pelatihan_id_peserta_fkey` FOREIGN KEY (`id_peserta`) REFERENCES `Peserta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pelatihan` ADD CONSTRAINT `Pelatihan_id_Bidang_fkey` FOREIGN KEY (`id_Bidang`) REFERENCES `Bidang`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sertifikasi` ADD CONSTRAINT `Sertifikasi_id_peserta_fkey` FOREIGN KEY (`id_peserta`) REFERENCES `Peserta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sertifikasi` ADD CONSTRAINT `Sertifikasi_id_pelatihan_fkey` FOREIGN KEY (`id_pelatihan`) REFERENCES `Pelatihan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
