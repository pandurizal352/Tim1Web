// src/controllers/sertifikasiController.js
const prisma = require("../config/utils");

// READ GET ALL
const getAllSertifikasi = async (req, res) => {
  try {
    const sertifikasi = await prisma.sertifikasi.findMany({
      include: {  pelatihan: true,
        pesertaSertifikat: {
          include: {
            peserta: true, // ambil data peserta dari relasi perantara
          },
       }, //sertakan data peserta
    },
    });
    return res.json(sertifikasi);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSertifikasiById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const sertifikasi = await prisma.sertifikasi.findUnique({
      where: { id },
      include: {
        
        pelatihan: true,
        pesertaSertifikat: {
          include: {
            peserta: true, // ambil data peserta dari relasi perantara
          },
        },
      },
    });

    if (!sertifikasi)
      return res.status(404).json({ message: "Certificate not found" });
    return res.json(sertifikasi);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// CREATE
const createSertifikasi = async (req, res) => {
  try {
    const { Nama_dokumen, tanggal_dan_bulan,  id_pelatihan } =
      req.body;

    const date = new Date(tanggal_dan_bulan);
    if (isNaN(date)) {
      return res
        .status(400)
        .json({
          message: "Format tanggal tidak valid. Gunakan format YYYY-MM-DD.",
        });
    }
    date.setHours(date.getHours() + 7);

    const sertifikasi = await prisma.sertifikasi.create({
      data: {
        Nama_dokumen,
        tanggal_dan_bulan: date,
        // id_peserta: id_peserta ? parseInt(id_peserta) : null,
        id_pelatihan: id_pelatihan ? parseInt(id_pelatihan) : null,
      },
      include: {  pelatihan: true },
    });

    return res.status(201).json(sertifikasi);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message }); //jika foreign key invalid, prisma error
  }
};

// UPDATE
const updateSertifikasi = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { Nama_dokumen, tanggal_dan_bulan,  id_pelatihan } =
      req.body;
    const data = { Nama_dokumen };

    if (tanggal_dan_bulan) {
      const date = new Date(tanggal_dan_bulan);
      if (isNaN(date)) {
        return res
          .status(400)
          .json({
            message: "Format tanggal tidak valid. Gunakan format YYYY-MM-DD.",
          });
      }
      date.setHours(date.getHours() + 7); // opsional: WIB
      data.tanggal_dan_bulan = date;
    }

    // if ("id_peserta" in req.body) {
    //   data.id_peserta = id_peserta === null ? null : parseInt(id_peserta);
    // }
    if ("id_pelatihan" in req.body) {
      data.id_pelatihan = id_pelatihan === null ? null : parseInt(id_pelatihan);
    }

    const sertifikasi = await prisma.sertifikasi.update({
      where: { id },
      data,
      include: {  pelatihan: true }, //peserta: true
    });

    return res.json(sertifikasi);
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      //P2025 itu error code nya prisma, kalau hasilnya record not found
      return res.status(404).json({ message: "Certificate not found" });
    }
    return res.status(400).json({ message: error.message });
  }
};

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
