// src/routes/movieRoutes.js
const express = require ('express');
const router = express.Router();
const pesertaController = require('../controllers/pesertaController');
const { validationBodyPeserta,uploadBukti } = require('../middleware/validation');

router.get('/search', pesertaController.getPesertaByQ);
router.get('/', pesertaController.getAllPeserta);
router.get('/:id', pesertaController.getPesertaById);
router.post('/', validationBodyPeserta, pesertaController.createPeserta);
router.post('/tambahpeserta', uploadBukti, pesertaController.tambahPeserta);
router.put('/:id', validationBodyPeserta, pesertaController.updatePeserta);
router.put("/konfirmasi/:id", pesertaController.konfirmasiPembayaran);
router.delete('/:id', pesertaController.deletePeserta);

module.exports = router;