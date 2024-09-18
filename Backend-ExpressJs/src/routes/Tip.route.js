import express from 'express';
import {
    createTip,
    deleteTip,
    editTip,
    getAllTip,
    getTipById,
} from './../app/controllers/Tip.controller.js';
import { verifyToken, verifyPermission } from './auth.js';
import { ROLES } from '../utils/Constants.js';
import multer from 'multer';

const router = express.Router();
const fileUpload = multer();

router.get('/detail/:id', getTipById);
router.get('/get-all', getAllTip);
router.delete('/:id', deleteTip);
router.post(
    '/create',
    fileUpload.single('picture'),
    verifyToken,
    verifyPermission([ROLES.ADMIN, ROLES.TEACHER]),
    createTip,
);
router.put('/:id', fileUpload.single('picture'), editTip);

export default router;
