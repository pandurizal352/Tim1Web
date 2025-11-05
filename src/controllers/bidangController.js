// src/controllers/BidangController.js
const prisma = require("../config/utils");

// READ
const getAllBidangs = async (req, res) => {
  try {
    const bidangs = await prisma.bidang.findMany({
      include: {
        pelatihan: true, // relasi ke Pelatihan
        peserta: true, // relasi ke Peserta
      },
    });
    return res.json(bidangs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBidangById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const bidang = await prisma.bidang.findUnique({
      where: { id },
      include: {
        pelatihan: true,
        peserta: true,
      },
    });

    if (!bidang) return res.status(404).json({ message: "Bidang not found" });
    return res.json(bidang);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// CREATE
const createBidang = async (req, res) => {
  try {
    const { nama_bidang} = req.body;

    // siapkan data dasar
    const data = {
      nama_bidang,
      // daftar_pelatihan: daftar_pelatihan || null,
      //   id_peserta: id_peserta || null,
    };

    // jika id_peserta disertakan, set relasinya
    // if (id_peserta !== undefined && id_peserta !== null) {
    //   data.peserta = { connect: { id: parseInt(id_peserta) } };
    // }
    // buat bidang baru
    const bidang = await prisma.bidang.create({
      data,
      include: {
        peserta: true, // tampilkan data peserta yang berelasi
        pelatihan: true, // tampilkan pelatihan yang terkait bidang
      },
    });
    return res.status(201).json(bidang);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// UPDATE
const updateBidang = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nama_bidang } = req.body;
    const data = {
      nama_bidang,
      // daftar_pelatihan: daftar_pelatihan || null,
    };

    // jika id_peserta dikirim, ubah relasinya
    // if ("id_peserta" in req.body) {
    //   if (id_peserta === null) {
    //     data.id_peserta = null; // putuskan relasi jika dikirim null
    //   } else {
    //     data.peserta = { connect: { id: parseInt(id_peserta) } };
    //   }
    // }

    const bidang = await prisma.bidang.update({
      where: { id },
      data,
      include: {
        peserta: true,
        pelatihan: true,
      },
    });

    return res.json(bidang);
  } catch (error) {
    console.error(error);

    // Error code P2025 = data tidak ditemukan
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Bidang not found" });
    }

    return res.status(400).json({ message: error.message });
  }
};

// DELETE
const deleteBidang = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    // karena relation di prisma onDelete: SetNull, saat delete bidang, movie.bidangId akan jadi null
    await prisma.bidang.delete({ where: { id } });
    return res.json({ message: "Bidang deleted" });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Bidang not found" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllBidangs,
  getBidangById,
  createBidang,
  updateBidang,
  deleteBidang,
};
