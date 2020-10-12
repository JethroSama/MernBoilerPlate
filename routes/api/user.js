const express = require('express');
const { requireSignIn } = require('../../controllers/auth');
const { secret } = require('../../controllers/user');
const router = express.Router();
// /api/v1/auth
router.get('/secret', requireSignIn, secret);

module.exports = router;
