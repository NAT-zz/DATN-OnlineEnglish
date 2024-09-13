const express = require('express');
const router = express.Router();
const { getComment, comment } = require('../app/controllers/Comment.controller');

const { verifyToken, verifyPermission } = require('./auth');
const { ROLES } = require('../utils/Constants');

router.get('/:type/:id', getComment);
router.post('/:type/:id',verifyToken, comment);

module.exports = router;