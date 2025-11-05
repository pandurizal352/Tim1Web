const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error('JWT_SECRET belum di set');
const SALT_ROUNDS = 10;


const getAllUser = async (req, res) => {
    try {
        const semuaInstitusi = await prisma.user.findMany({
            include: { peserta: true } // kalau ingin ambil relasi peserta juga
        });
        return res.json(semuaInstitusi);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAllUserById = async (req, res) => {
    try {
        const id = parseInt (req.params.id);
        const userbyid = await prisma.user.findUnique({
            where: { id },
            include: { peserta: true } // kalau ingin ambil relasi peserta juga
        });
         if (!userbyid) return res.status(404).json({message : 'Peserta not found'});
        return res.json(userbyid);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


const deleteuser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        await prisma.user.delete({ where : { id } });
        return res.json({ message : 'User deleted' });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json ({ message : 'User not found'});
        }
        return res.status(500).json ({ message : 'Internal Server Error' });
    }
}

const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nama_institusi, email_perusahaan, telpn_perusahaan, alamat, password, status_pembayaran } = req.body;
    //mencoba di postman pake ini
    //  const body = req.body || {}; 
    // const { nama_institusi, email_perusahaan, telpn_perusahaan, alamat, password } = body;


    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Institusi tidak ditemukan" });
    }

    // Hash password jika diubah
    let hashedPassword = existing.password;
    if (password && password.trim() !== "") {
      hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    }

    // Proses file baru
    let bukti_pembayaran = existing.bukti_pembayaran;
    if (req.file) {
      // hapus file lama
      if (existing.bukti_pembayaran) {
        const oldPath = path.join("uploads/bukti_pembayaran", existing.bukti_pembayaran);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      bukti_pembayaran = req.file.filename;
    }

    // Update data
    const updated = await prisma.user.update({
      where: { id },
      data: {
        nama_institusi: nama_institusi ?? existing.nama_institusi,
        email_perusahaan: email_perusahaan ?? existing.email_perusahaan,
        telpn_perusahaan: telpn_perusahaan
          ? parseInt(telpn_perusahaan)
          : existing.telpn_perusahaan,
        alamat: alamat ?? existing.alamat,
        password: hashedPassword,
        status_pembayaran: status_pembayaran ?? existing.status_pembayaran,
        // status_pembayaran,
        bukti_pembayaran,
      },
    });

    res.json({
      message: "Data institusi berhasil diperbarui",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// const updateUser = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     const { nama_institusi, email_perusahaan, telpn_perusahaan, alamat, password } = req.body;

//     const existing = await prisma.user.findUnique({ where: { id } });
//     if (!existing) {
//       return res.status(404).json({ message: "Institusi tidak ditemukan" });
//     }

//     // Hash ulang password jika diubah
//     let hashedPassword = existing.password;
//     if (password) {
//       hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
//     }

//     // Jika ada file baru
//     let bukti_pembayaran = existing.bukti_pembayaran;
//     if (req.file) {
//       // Hapus file lama jika ada
//       if (existing.bukti_pembayaran) {
//         const oldPath = path.join("uploads/bukti_pembayaran", existing.bukti_pembayaran);
//         if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
//       }
//       bukti_pembayaran = req.file.filename;
//     }

//     // Update user
//     const updated = await prisma.user.update({
//       where: { id },
//       data: {
//         nama_institusi: nama_institusi ?? existing.nama_institusi,
//         email_perusahaan: email_perusahaan ?? existing.email_perusahaan,
//         telpn_perusahaan: telpn_perusahaan
//           ? parseInt(telpn_perusahaan)
//           : existing.telpn_perusahaan,
//         alamat: alamat ?? existing.alamat,
//         password: hashedPassword,
//         bukti_pembayaran,
//       },
//     });

//     return res.json({
//       message: "Data institusi berhasil diperbarui",
//       data: updated,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: error.message });
//   }
// };

// const updateUser = async (req, res) => {
//     try {
//         const  id  = parseInt(req.params.id); // ambil id dari URL
//         const { nama_institusi, email_perusahaan, telpn_perusahaan, alamat, password } = req.body;

//         // Pastikan data yang mau di-update ada di database
//         const existing = await prisma.user.findUnique({
//             where: { id }
//         });

//         if (!existing) {
//             return res.status(404).json({ message: 'Institusi tidak ditemukan' });
//         }

//         // Kalau password diisi, hash ulang
//         let hashedPassword = existing.password;
//         if (password) {
//             const bcrypt = require('bcrypt');
//             hashedPassword = await bcrypt.hash(password, 10);
//         }

//         // Update data institusi
//         const updated = await prisma.user.update({
//             where: { id },
//             data: {
//                 nama_institusi: nama_institusi ?? existing.nama_institusi,
//                 email_perusahaan: email_perusahaan ?? existing.email_perusahaan,
//                 telpn_perusahaan: telpn_perusahaan
//           ? parseInt(telpn_perusahaan)
//           : existing.telpn_perusahaan,
//                 alamat: alamat ?? existing.alamat,
//                 password: hashedPassword
//             }
//         });

//         return res.json({
//             message: 'Data institusi berhasil diperbarui',
//             data: updated
//         });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// };


    // POST /api/institute/register
   const register = async (req, res, next) => {
        try {
            const { email_perusahaan, password, nama_institusi, telpn_perusahaan, alamat, posisi } = req.body;

            // Validasi sederhana
            if (!email_perusahaan || !password || !nama_institusi || !posisi) {
                return res.status(400).json({ message: 'Email, password, dan nama institusi wajib diisi' });
            }
            if (password.length < 6) {
                return res.status(400).json({ message: 'Password minimal 6 karakter' });
            }

            // Cek apakah institusi sudah ada
            const existing = await prisma.user.findUnique({
                where: { email_perusahaan }
            });

            if (existing) {
                return res.status(409).json({ message: 'Email institusi sudah terdaftar' });
            }

            // Hash password
            const hashed = await bcrypt.hash(password, SALT_ROUNDS);

            // Insert user institute
            const newInstitute = await prisma.user.create({
                data: {
                    email_perusahaan,
                    password: hashed,
                    nama_institusi,
                    telpn_perusahaan: telpn_perusahaan ? parseInt(telpn_perusahaan) : 0,
                    // telpn_perusahaan: telpn_perusahaan || '',
                    alamat: alamat || null,
                    posisi
                }
            });

            return res.status(201).json({
                id_user: newInstitute.id_user,
                email_perusahaan: newInstitute.email_perusahaan,
                nama_institusi: newInstitute.nama_institusi
            });
        } catch (err) {
            next(err);
        }
    }

    // POST /api/institute/login
const login = async (req, res, next) => {
  try {
    const { email_perusahaan, password } = req.body;
    if (!email_perusahaan || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi' });
    }

    // Ambil user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email_perusahaan },
    });

    if (!user) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    // Bandingkan password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    // Buat payload token
    const payload = {
      id: user.id,
      email_perusahaan: user.email_perusahaan,
      posisi: user.posisi,
    };

    // Buat JWT
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '24h' });

    // Kirim response
    return res.json({
      message: 'Login berhasil',
      token,
      user: {
        id: user.id,
        nama_institusi: user.nama_institusi,
        email_perusahaan: user.email_perusahaan,
        posisi: user.posisi,
      },
    });
  } catch (err) {
    next(err);
  }
};



//  const login = async (req, res, next) => {
//         try {
//             const { email_perusahaan, password } = req.body;
//             if (!email_perusahaan || !password) {
//                 return res.status(400).json({ message: 'Email dan password wajib diisi' });
//             }

//             // Ambil user institute
//             const institute = await prisma.user.findUnique({
//                 where: { email_perusahaan }
//             });

//             if (!institute) {
//                 return res.status(401).json({ message: 'Invalid credentials' });
//             }

//             // Bandingkan password
//             const match = await bcrypt.compare(password, institute.password);
//             if (!match) {
//                 return res.status(401).json({ message: 'Invalid credentials' });
//             }

//             // Sign JWT
//             const payload = { 
//                 id_user: institute.id_user, 
//                 email_perusahaan: institute.email_perusahaan,
//                 posisi: user.posisi, 
//             };
//             const token = jwt.sign(payload, jwtSecret, { expiresIn: '24h' });

//             return res.json({
//                 message: 'Login berhasil',
//                 token,
//                 institute: {
//                     id_user: institute.id_user,
//                     email_perusahaan: institute.email_perusahaan,
//                     nama_institusi: institute.nama_institusi,
//                     posisi: user.posisi,
//                 }
//             });
//         } catch (err) {
//             next(err);
//         }
//     }

module.exports = { 
    getAllUser,
    getAllUserById,
    deleteuser,
    updateUser,
    register,    
    login,

};
