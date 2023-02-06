const express = require('express');
const router = express.Router();


const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getByIdUser);
router.get('/:id/account', userController.getByIdUserAccount);
router.post('/', userController.createUser);
router.post('/login', userController.login);
router.put('/:id/user', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;