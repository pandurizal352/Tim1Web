// src/routes/categoryRoutes.js
const express = require ('express');
const router = express.Router();
const sertifikasiController = require('../controllers/sertifikasiController');
const { validationBodySertifikasi, uploadPdf} = require('../middleware/validation');

router.get('/', sertifikasiController.getAllSertifikasi);
router.get('/:id', sertifikasiController.getSertifikasiById);
router.post('/', uploadPdf, validationBodySertifikasi, sertifikasiController.createSertifikasi);
router.put('/:id', uploadPdf,validationBodySertifikasi, sertifikasiController.updateSertifikasi);
router.delete('/:id', sertifikasiController.deleteSertifikasi);

module.exports = router;