const express = require('express');
const router = express.Router();
const { auth } = require('../../controllers');
const { controllerWrapper, validation, authenticate } = require('../../middlewares');
const { joiSchema } = require('../../models/user');

router.post('/register', validation(joiSchema), controllerWrapper(auth.register));

router.post('/login', validation(joiSchema), controllerWrapper(auth.login));

router.get('/logout', authenticate, controllerWrapper(auth.logout));

module.exports = router;