// src/routes/movieRoutes.js
const express = require ('express');
const router = express.Router();
const  pelatihanController = require('../controllers/pelatihanController')
const { validationBodyPelatihan } = require('../middleware/validation');

router.get('/', pelatihanController.getAllPelatihans);
router.get('/:id', pelatihanController.getPelatihanById);
router.post('/', validationBodyPelatihan, pelatihanController.createPelatihan);
router.put('/:id', validationBodyPelatihan, pelatihanController.updatePelatihan);
router.delete('/:id', pelatihanController.deletePelatihan);



module.exports = router;