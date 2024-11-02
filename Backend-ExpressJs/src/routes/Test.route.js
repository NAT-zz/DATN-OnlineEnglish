import express from 'express';
import {
    createTest,
    getTests,
    deleteTest,
    getDetail,
} from '../app/controllers/Test.controller.js';
import { verifyPermission, verifyToken } from './auth.js';
import { ROLES } from '../utils/Constants.js';

const router = express.Router();

// CRUD
router.get('/tests', getTests);
router.get('/detail/:id', getDetail);

// retrieve rulst for student
// router.get(
//     '/detail/:id',
//     verifyToken,
//     verifyPermission([ROLES.TEACHER, ROLES.STUDENT]),
//     getDetail,
// );

router.delete('/:id', deleteTest);
router.post('/create', createTest);

export default router;
