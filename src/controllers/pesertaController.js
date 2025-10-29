
// src/controllers/pesertaController.js
const prisma = require('../config/utils');

// READ
const getAllPeserta = async (req, res) => {
    try {
        const paraPeserta = await prisma.peserta.findMany({
            include : { pelatihan : true, bidang : true, sertifikasi : true } 
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
            include : { pelatihan : true, bidang : true, sertifikasi : true }
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
        const { nama_peserta, email_peserta, telpn_peserta, alamat_peserta } = req.body;
        const peserta = await prisma.peserta.create({
            data : { nama_peserta, email_peserta, telpn_peserta, alamat_peserta }
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
        const { nama_peserta, email_peserta, telpn_peserta, alamat_peserta } = req.body;

        const peserta = await prisma.peserta.update({
            where : { id },
            data: { nama_peserta, email_peserta, telpn_peserta, alamat_peserta }
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

module.exports = {
    getAllPeserta,
    getPesertaById,
    createPeserta,
    updatePeserta,
    deletePeserta
};