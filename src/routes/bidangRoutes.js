// src/routes/movieRoutes.js
const express = require ('express');
const router = express.Router();
const  bidangController = require('../controllers/bidangController')
const { validationBodyBidang } = require('../middleware/validation');

router.get('/', bidangController.getAllBidangs);
router.get('/:id', bidangController.getBidangById);
router.post('/', validationBodyBidang, bidangController.createBidang);
router.put('/:id', validationBodyBidang, bidangController.updateBidang);
router.delete('/:id', bidangController.deleteBidang);



module.exports = router;