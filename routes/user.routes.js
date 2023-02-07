const express = require('express');
const router = express.Router();


const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getByIdUser);
router.post('/', userController.createUser);
router.post('/login', userController.login);
router.put('/:id/user', userController.updateUser);

module.exports = router;