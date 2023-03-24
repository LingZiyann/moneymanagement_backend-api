
const express = require('express');
const router = new express.Router();
const formControllers = require('../controllers/form-controller');
const auth = require('../middleware/auth');

router.post('/form', auth ,  formControllers.createForm);
router.delete('/form/:id', auth , formControllers.deleteForm);
router.get('/form/:uid/:category', auth , formControllers.getFormByCategory);
router.get('/form/:uid', auth , formControllers.getAllForm);

module.exports = router;