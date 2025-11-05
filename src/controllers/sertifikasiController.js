// src/controllers/sertifikasiController.js
const prisma = require("../config/utils");
const path = require("path");
const fs = require("fs");

// READ GET ALL
const getAllSertifikasi = async (req, res) => {
  try {
    const sertifikasi = await prisma.sertifikasi.findMany({
      include: {
        pelatihan: {
          include: {
            bidang: true, // bidang dari pelatihan
          },
        },
        pesertaSertifikat: {
          include: {
            peserta: {
              include: {
                bidang: true,     // bidang dari peserta
                pelatihan: true,  // pelatihan dari peserta
              },
            },
          },
        },
      },
    });

    return res.json(sertifikasi);
  } catch (error) {
    console.error("Error getAllSertifikasi:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// const getAllSertifikasi = async (req, res) => {
//   try {
//     const sertifikasi = await prisma.sertifikasi.findMany({
//       include: {  pelatihan: true,
//         pesertaSertifikat: {
//           include: {
//             peserta: true, // ambil data peserta dari relasi perantara
//             pelatihan: true,
//             bidang : true, // untuk tau bidang apa yang di ambil lewat pelatihan
//           },
//        }, //sertakan data peserta
//     },
//     });
//     return res.json(sertifikasi);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// const getSertifikasiById = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     const sertifikasi = await prisma.sertifikasi.findUnique({
//       where: { id },
//       include: {
        
//         pelatihan: true,
//         pesertaSertifikat: {
//           include: {
//             peserta: true, // ambil data peserta dari relasi perantara
//           },
//         },
//       },
//     });

//     if (!sertifikasi)
//       return res.status(404).json({ message: "Certificate not found" });
//     return res.json(sertifikasi);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const getSertifikasiById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const sertifikasi = await prisma.sertifikasi.findUnique({
      where: { id },
      include: {
        pelatihan: {
          include: {
            bidang: true, // sertakan bidang dari pelatihan
          },
        },
        pesertaSertifikat: {
          include: {
            peserta: {
              include: {
                bidang: true,     // bidang yang diikuti peserta
                pelatihan: true,  // pelatihan peserta
              },
            },
          },
        },
      },
    });

    if (!sertifikasi)
      return res.status(404).json({ message: "Certificate not found" });

    return res.json(sertifikasi);
  } catch (error) {
    console.error("Error getSertifikasiById:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};





// CREATE
const createSertifikasi = async (req, res) => {
  try {
    const { tanggal_dan_bulan, id_pelatihan } = req.body;

    // pastikan ada file
    if (!req.file) {
      return res.status(400).json({ message: "File PDF wajib diupload." });
    }

    // validasi tanggal
    const date = new Date(tanggal_dan_bulan);
    if (isNaN(date)) {
      return res.status(400).json({
        message: "Format tanggal tidak valid. Gunakan format YYYY-MM-DD.",
      });
    }

    date.setHours(date.getHours() + 7);

    // simpan data ke database
    const sertifikasi = await prisma.sertifikasi.create({
      data: {
        nama_dokumen: req.file.filename, // hanya simpan nama file
        tanggal_dan_bulan: date,
        id_pelatihan: parseInt(id_pelatihan),
      },
      include: {
        pelatihan: true,
      },
    });

    return res.status(201).json({
      message: "Sertifikasi berhasil dibuat",
      data: sertifikasi,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// UPDATE
const updateSertifikasi = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { tanggal_dan_bulan, id_pelatihan } = req.body;
    const data = {};

    // Cari data lama
    const existing = await prisma.sertifikasi.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Sertifikasi tidak ditemukan" });
    }

    // Jika ada file baru
    if (req.file) {
      const oldPath = path.join(__dirname, "../uploads", existing.nama_dokumen);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath); // hapus file lama
      }

      data.nama_dokumen = req.file.filename; // ganti dengan file baru
    }

    // Jika tanggal diubah
    if (tanggal_dan_bulan) {
      const date = new Date(tanggal_dan_bulan);
      if (isNaN(date)) {
        return res
          .status(400)
          .json({ message: "Format tanggal tidak valid. Gunakan format YYYY-MM-DD." });
      }
      date.setHours(date.getHours() + 7);
      data.tanggal_dan_bulan = date;
    }

    if (id_pelatihan) {
      data.id_pelatihan = parseInt(id_pelatihan);
    }

    const updated = await prisma.sertifikasi.update({
      where: { id },
      data,
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};


// const updateSertifikasi = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     const { Nama_dokumen, tanggal_dan_bulan,  id_pelatihan } =
//       req.body;
//     const data = { Nama_dokumen };

//     if (tanggal_dan_bulan) {
//       const date = new Date(tanggal_dan_bulan);
//       if (isNaN(date)) {
//         return res
//           .status(400)
//           .json({
//             message: "Format tanggal tidak valid. Gunakan format YYYY-MM-DD.",
//           });
//       }
//       date.setHours(date.getHours() + 7); // opsional: WIB
//       data.tanggal_dan_bulan = date;
//     }

//     // if ("id_peserta" in req.body) {
//     //   data.id_peserta = id_peserta === null ? null : parseInt(id_peserta);
//     // }
//     if ("id_pelatihan" in req.body) {
//       data.id_pelatihan = id_pelatihan === null ? null : parseInt(id_pelatihan);
//     }

//     const sertifikasi = await prisma.sertifikasi.update({
//       where: { id },
//       data,
//       include: {  pelatihan: true }, //peserta: true
//     });

//     return res.json(sertifikasi);
//   } catch (error) {
//     console.error(error);
//     if (error.code === "P2025") {
//       //P2025 itu error code nya prisma, kalau hasilnya record not found
//       return res.status(404).json({ message: "Certificate not found" });
//     }
//     return res.status(400).json({ message: error.message });
//   }
// };

// DELETE
const deleteSertifikasi = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.sertifikasi.delete({ where: { id } });
    return res.json({ message: "sertifikasi deleted" });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Certificate not found" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllSertifikasi,
  getSertifikasiById,
  createSertifikasi,
  updateSertifikasi,
  deleteSertifikasi,
};
