// src/controllers/sertifikasiController.js
const prisma = require("../config/utils");

const getAllPesertaSertifikats = async (req, res) => {
  try {
    const pesertasertifikats = await prisma.pesertaSertifikat.findMany({
      include: {
        peserta: true, // relasi langsung ke Peserta
        sertifikat: {  // dari sini kamu bisa include pelatihan
          include: {
            pelatihan: true, // relasi dari Sertifikasi ke Pelatihan
          },
        },
      },
    });
    return res.json(pesertasertifikats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPesertaSertifikatById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const pesertasertifikat = await prisma.pesertaSertifikat.findUnique({
      where: { id },
      include: {
        peserta: true,
        sertifikat: {
          include: { pelatihan: true },
        },
      },
    });

    if (!pesertasertifikat)
      return res.status(404).json({ message: "Peserta Sertifikat not found" });

    return res.json(pesertasertifikat);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createPesertaSertifikat = async (req, res) => {
  try {
    const { id_peserta, id_sertifikat } = req.body;

    // pastikan data minimal id_peserta ada
    if (!id_peserta) {
      return res.status(400).json({ message: "id_peserta wajib diisi" });
    }

        // buat objek data manual
    const data = {
      id_peserta: parseInt(id_peserta),
    };

    // kalau id_sertifikat dikirim, tambahkan ke objek data
    if (id_sertifikat) {
      data.id_sertifikat = parseInt(id_sertifikat);
    }


    // buat data baru
    const pesertaSertifikat = await prisma.pesertaSertifikat.create({
    //   data: {
    //     // peserta: { connect: { id: parseInt(id_peserta) } },
    //     // ...(id_sertifikat && { sertifikat: { connect: { id: parseInt(id_sertifikat) } } })
    //     // Titik-titik tiga (...) itu menyebarkan isi objek hanya jika kondisi sebelumnya (id_sertifikat && {...}) terpenuhi.
    //   },
    data,
      include: {
        peserta: true,
        sertifikat: {
          include: {
            pelatihan: true, // sertakan data pelatihan yang terkait sertifikat
          },
        },
      },
    });

    return res.status(201).json(pesertaSertifikat);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

const updatePesertaSertifikat = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { id_peserta, id_sertifikat } = req.body;

    // siapkan data yang akan diupdate
    const data = {
        id_peserta: parseInt(id_peserta),
    };

    // update relasi peserta (opsional)
    if (id_peserta !== undefined) {
      if (id_peserta === null) {
        data.id_peserta = null; // hapus relasi
      } else {
        data.id_peserta = parseInt(id_peserta);
      }
    }

    // update relasi sertifikat (opsional)
    if (id_sertifikat !== undefined) {
      if (id_sertifikat === null) {
        data.id_sertifikat = null; // hapus relasi
      } else {
        data.id_sertifikat = parseInt(id_sertifikat);
      }
    }

    // lakukan update
    const pesertaSertifikat = await prisma.pesertaSertifikat.update({
      where: { id },
      data,
      include: {
        peserta: true,
        sertifikat: {
          include: { pelatihan: true },
        },
      },
    });

    return res.json(pesertaSertifikat);
  } catch (error) {
    console.error(error);

    // jika data tidak ditemukan
    if (error.code === "P2025") {
      return res.status(404).json({ message: "PesertaSertifikat not found" });
    }

    return res.status(400).json({ message: error.message });
  }
};


const deletePesertaSertifikat = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // hapus data peserta sertifikat berdasarkan id
    await prisma.pesertaSertifikat.delete({
      where: { id },
    });

    return res.json({ message: "PesertaSertifikat deleted successfully" });
  } catch (error) {
    console.error(error);

    // error.code P2025 = data tidak ditemukan di Prisma
    if (error.code === "P2025") {
      return res.status(404).json({ message: "PesertaSertifikat not found" });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
  getAllPesertaSertifikats,
  getPesertaSertifikatById,
  createPesertaSertifikat,
  updatePesertaSertifikat,
  deletePesertaSertifikat,
};
