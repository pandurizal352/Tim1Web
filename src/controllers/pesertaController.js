// src/controllers/pesertaController.js
const prisma = require('../config/utils');
const fs = require('fs');
const path = require('path');
// READ
const getAllPeserta = async (req, res) => {
    try {
        const paraPeserta = await prisma.peserta.findMany({
            include : { 
                pelatihan : true, bidang : true,  user: true, // opsional kalau mau tahu input oleh siapa
        pesertaSertifikat: {
          include: {
             
            sertifikat: true, // ambil data sertifikasi dari relasi perantara
          },
            },
              },
        });
        return res.json(paraPeserta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message : 'Internal Server Error' })
    }
}

const getPesertaById = async (req, res) => {
    try {
        const id = parseInt (req.params.id);
        const peserta = await prisma.peserta.findUnique({
            where: { id },
            include : { pelatihan : true, bidang : true, user: true, // opsional kalau mau tahu input oleh siapa
                 pesertaSertifikat: {
          include: {
            sertifikat: true, // ambil data sertifikasi dari relasi perantara
          },

            },
            },
        });

        if (!peserta) return res.status(404).json({message : 'Peserta not found'});
        return res.json(peserta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message : 'Internal Server Error' })
    }
}

// CREATE
const createPeserta = async (req, res) => {
    try {
        const { nama_peserta, email_peserta, telpn_peserta, alamat_peserta, id_user, id_bidang,id_pelatihan } = req.body;
        const data = { 
      nama_peserta, 
      email_peserta, 
      telpn_peserta, 
      alamat_peserta, 
      
    };

     // kalau ada user
    if (id_user) {
      data.user = { connect: { id: parseInt(id_user) } };
    }

    // jika user pilih bidang, hubungkan
    if (id_bidang) {
      data.bidang = { connect: { id: parseInt(id_bidang) } };
    }

    // Relasi ke Pelatihan (karena 1 peserta = 1 pelatihan)
    if (id_pelatihan) {
      data.pelatihan = { connect: { id: parseInt(id_pelatihan) } };
    }

        const peserta = await prisma.peserta.create({
            data,
            include: { bidang: true,
              pelatihan: true,
              user: true
             },
        });
        return res.status(201).json(peserta);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message : error.message});
    }
}

// UPDATE
const updatePeserta = async (req, res) => {
    try {
        const id = parseInt (req.params.id);
        const { nama_peserta, email_peserta, telpn_peserta, alamat_peserta, id_user, id_bidang,id_pelatihan } = req.body;
        const data = { 
      nama_peserta, 
      email_peserta, 
      telpn_peserta, 
      alamat_peserta, 
      
    };

     // Ubah relasi user jika dikirim
    if ("id_user" in req.body) {
      if (id_user === null) {
        data.user = { disconnect: true };
      } else {
        data.user = { connect: { id: parseInt(id_user) } };
      }
    }

    // Jika bidang ingin diubah
    if ("id_bidang" in req.body) {
      if (id_bidang === null) {
        data.bidang = { disconnect: true }; // putus relasi bidang asal jangan putuskan relasi kita ndut
      } else {
        data.bidang = { connect: { id: parseInt(id_bidang) } }; // sambungkan ke bidang baru asal jangan relasi ke orang baru
      }
    }

      if ("id_pelatihan" in req.body) {
      if (id_pelatihan === null) {
        data.pelatihan = { disconnect: true };
      } else {
        data.pelatihan = { connect: { id: parseInt(id_pelatihan) } };
      }
    }


        const peserta = await prisma.peserta.update({
            where : { id },
            data,
             include: { bidang: true,
              user: true,
              pelatihan: true,
             },
        });
        return res.json(peserta);
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message : 'Peserta not found'});
        }
        return res.status(400).json({ message : error.message });
    }
}

// DELETE
const deletePeserta = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        await prisma.peserta.delete({ where : { id } });
        return res.json({ message : 'Peserta deleted' });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json ({ message : 'Peserta not found'});
        }
        return res.status(500).json ({ message : 'Internal Server Error' });
    }
}


const tambahPeserta = async (req, res) => {
  try {
    const { id_user, id_bidang, id_pelatihan } = req.body;
    const peserta = JSON.parse(req.body.peserta || "[]"); // penting! jika dikirim via multipart/form-data
    const bukti_pembayaran = req.file ? req.file.filename : null;

    // Validasi
    if (!id_user || !id_bidang || !id_pelatihan || peserta.length === 0) {
      return res.status(400).json({ message: "Data tidak lengkap." });
    }

    // 1️⃣ Update bukti pembayaran user (jika ada file)
    if (bukti_pembayaran) {
      await prisma.user.update({
        where: { id: parseInt(id_user) },
        data: { bukti_pembayaran },
      });
    }

    // 2️⃣ Tambah peserta secara batch
    const createdPeserta = await prisma.peserta.createMany({
      data: peserta.map((p) => ({
        nama_peserta: p.nama_peserta,
        email_peserta: p.email_peserta,
        // telpn_peserta: parseInt(p.telpn_peserta),
        telpn_peserta: p.telpn_peserta,
        // telpn_peserta: parseInt(p.telpn_peserta.startsWith("0") ? p.telpn_peserta.slice(1) : p.telpn_peserta),

        alamat_peserta: p.alamat_peserta,
        id_user: parseInt(id_user),
        id_bidang: parseInt(id_bidang),
        id_pelatihan: parseInt(id_pelatihan),
      })),
    });

    return res.status(201).json({
      message: "Data peserta berhasil ditambahkan.",
      total_ditambahkan: createdPeserta.count,
      bukti_pembayaran,
    });
  } catch (error) {
    console.error("Error tambahPeserta:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan server.",
      error: error.message,
    });
  }
};



const getPesertaByQ = async (req, res) => {
  try {
    const { q } = req.query;
    const keyword = q?.toLowerCase() || "";

    const semuaPeserta = await prisma.peserta.findMany({
      include: {
        pelatihan: true,
        user: true,
        pesertaSertifikat: {
          include: {
            sertifikat: true, // ⬅ WAJIB UNTUK AMBIL PDF!
          },
        },
      },
    });

    const peserta = semuaPeserta.filter(p =>
      p.nama_peserta.toLowerCase().includes(keyword)
    );

    res.json({ data: peserta });
  } catch (error) {
    console.error("❌ ERROR FETCHING PESERTA:", error);
    res.status(500).json({
      message: "Gagal mengambil data peserta",
      error: error.message,
    });
  }
};



// const tambahPeserta = async (req, res) => {
//   try {
//     const { id_user, id_bidang, id_pelatihan, bukti_pembayaran, peserta } = req.body;

//     // Validasi awal
//     if (!id_user || !id_bidang || !id_pelatihan || !peserta || peserta.length === 0) {
//       return res.status(400).json({ message: "Data tidak lengkap." });
//     }

//     
//     await prisma.user.update({
//       where: { id: id_user },
//       data: { bukti_pembayaran },
//     });

//     //  Tambah peserta secara batch
//     const createdPeserta = await prisma.peserta.createMany({
//       data: peserta.map((p) => ({
//         nama_peserta: p.nama_peserta,
//         email_peserta: p.email_peserta,
//         telpn_peserta: p.telpn_peserta,
//         alamat_peserta: p.alamat_peserta,
//         id_user,
//         id_bidang,
//         id_pelatihan,
//       })),
//     });

//     return res.status(201).json({
//       message: "Data peserta berhasil ditambahkan.",
//       total_ditambahkan: createdPeserta.count,
//     });
//   } catch (error) {
//     console.error("Error tambahPeserta:", error);
//     return res.status(500).json({ message: "Terjadi kesalahan server.", error });
//   }
// };

module.exports = {
    getAllPeserta,
    getPesertaById,
    createPeserta,
    updatePeserta,
    deletePeserta,
    tambahPeserta,
    getPesertaByQ
};