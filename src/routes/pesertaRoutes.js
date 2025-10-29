// src/routes/movieRoutes.js
const express = require ('express');
const router = express.Router();
const pesertaController = require('../controllers/pesertaController');
const { validationBodyPeserta } = require('../middleware/validation');

router.get('/', pesertaController.getAllPeserta);
router.get('/:id', pesertaController.getPesertaById);
router.post('/', validationBodyPeserta, pesertaController.createPeserta);
router.put('/:id', validationBodyPeserta, pesertaController.updatePeserta);
router.delete('/:id', pesertaController.deletePeserta);

module.exports = router;