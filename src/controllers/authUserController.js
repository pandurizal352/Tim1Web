const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error('JWT_SECRET belum di set');
const SALT_ROUNDS = 10;

module.exports = {
    // POST /api/institute/register
    register: async (req, res, next) => {
        try {
            const { email_perusahaan, password, nama_institusi, telpn_perusahaan, alamat } = req.body;

            // Validasi sederhana
            if (!email_perusahaan || !password || !nama_institusi) {
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
                    telpn_perusahaan: telpn_perusahaan || '',
                    alamat: alamat || null
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
    },

    // POST /api/institute/login
    login: async (req, res, next) => {
        try {
            const { email_perusahaan, password } = req.body;
            if (!email_perusahaan || !password) {
                return res.status(400).json({ message: 'Email dan password wajib diisi' });
            }

            // Ambil user institute
            const institute = await prisma.user.findUnique({
                where: { email_perusahaan }
            });

            if (!institute) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Bandingkan password
            const match = await bcrypt.compare(password, institute.password);
            if (!match) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Sign JWT
            const payload = { 
                id_user: institute.id_user, 
                email_perusahaan: institute.email_perusahaan 
            };
            const token = jwt.sign(payload, jwtSecret, { expiresIn: '24h' });

            return res.json({
                message: 'Login berhasil',
                token,
                institute: {
                    id_user: institute.id_user,
                    email_perusahaan: institute.email_perusahaan,
                    nama_institusi: institute.nama_institusi
                }
            });
        } catch (err) {
            next(err);
        }
    }
};