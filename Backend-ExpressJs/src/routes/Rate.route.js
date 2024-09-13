const express = require('express');
const router = express.Router();
const { rate, getRate } = require('../app/controllers/Rate.controller');

const { verifyToken, verifyPermission } = require('./auth');
const { ROLES } = require('../utils/Constants');

router.get('/:type/:id', getRate);
router.post('/:type/:id/:rateCount', verifyToken, rate);

module.exports = router;