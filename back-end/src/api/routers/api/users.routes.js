const express = require('express');
const router = express.Router();
const { register, login, getAllEditors } = require('../../controllers/users.controller');

router.post('/register', register);

router.post('/login', login);

router.get('/allEditors', getAllEditors);

module.exports = router;