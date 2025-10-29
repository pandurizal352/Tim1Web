const express = require('express');
const router = express.Router();
const authUserController = require('../controllers/authUserController');

router.get('/', authUserController.getAllUser);
router.get('/:id', authUserController.getAllUserById);
router.post('/register', authUserController.register);
router.post('/login', authUserController.login);
router.put('/:id', authUserController.updateUser);
router.delete('/:id', authUserController.deleteuser);


module.exports = router;