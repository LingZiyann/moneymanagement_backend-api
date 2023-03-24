const express = require('express');
const userController = require('../controllers/user-controller');


const router = new express.Router()

router.post('/signup', userController.signup)
router.post('/login', userController.login)

module.exports = router