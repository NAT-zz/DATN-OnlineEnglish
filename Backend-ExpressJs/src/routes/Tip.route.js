const express = require('express');
const router = express.Router();
const { createTip, deleteTip, editTip, getAllTip, getTipById } = require('./../app/controllers/Tip.controller');

const { verifyToken, verifyPermission } = require('./auth');
const { ROLES } = require('../utils/Constants');

const multer = require('multer');
const fileUpload = multer();

router.get('/detail/:id', getTipById);
router.get('/get-all', getAllTip);
router.delete('/:id', deleteTip);
router.post('/create', fileUpload.single('picture'), verifyToken, verifyPermission([ROLES.ADMIN, ROLES.TEACHER]), createTip);
router.put('/:id', fileUpload.single('picture'), editTip)

module.exports = router;