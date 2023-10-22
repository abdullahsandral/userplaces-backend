const express = require('express');
const fileUpload = require('../middelware/file-upload');
const { check } = require('express-validator');

const router = express.Router();
const usersControllers = require('../controllers/users-controllers');

const nameValidator = check('name').not().isEmpty();
const emailValidator = check('email').normalizeEmail().isEmail();
const passwordValidator = check('password').not().isEmpty();

const signupValidator = [nameValidator, emailValidator, passwordValidator];

router.get('', usersControllers.getAllUsers);

router.post('/signin', usersControllers.signIn);

router.post('/signup', fileUpload.single('userImage'), signupValidator, usersControllers.signUP);

module.exports = router;
