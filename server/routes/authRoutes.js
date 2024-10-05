const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/authController');

const router = express.Router();

router.get('/users', getUser);

router.post('/registro', registerUser);

router.post('/login', loginUser);



module.exports = router;
