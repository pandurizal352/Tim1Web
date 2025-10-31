// src/routes/movieRoutes.js
const express = require ('express');
const router = express.Router();
const  pesertasertifikatController = require('../controllers/pesertasertifikatController')
const { validationBodyPesertaSertifikat } = require('../middleware/validation');

router.get('/', pesertasertifikatController.getAllPesertaSertifikats);
router.get('/:id', pesertasertifikatController.getPesertaSertifikatById);
router.post('/', validationBodyPesertaSertifikat, pesertasertifikatController.createPesertaSertifikat);
router.put('/:id', validationBodyPesertaSertifikat, pesertasertifikatController.updatePesertaSertifikat);
router.delete('/:id', pesertasertifikatController.deletePesertaSertifikat);



module.exports = router;