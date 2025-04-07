const express = require('express');
const router = express.Router();

router.use('/users', require('./api/users.routes'));
router.use('/articles', require("./api/articles.routes"));

module.exports = router;