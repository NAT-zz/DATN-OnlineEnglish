import express from 'express';
import {
    createTest,
    getTests,
    deleteTest,
    getDetail,
} from '../app/controllers/Test.controller.js';
import { verifyPermission, verifyRights, verifyToken } from './auth.js';
import { RIGHT_TYPE, ROLES } from '../utils/Constants.js';

const router = express.Router();

// CRUD
router.get('/tests', verifyToken, verifyPermission([ROLES.TEACHER]), getTests);
router.delete(
    '/:id',
    verifyToken,
    verifyPermission([ROLES.TEACHER]),
    verifyRights(RIGHT_TYPE.test),
    deleteTest,
);
router.post(
    '/create',
    verifyToken,
    verifyPermission([ROLES.TEACHER]),
    verifyRights(RIGHT_TYPE.test),
    createTest,
);

router.get('/detail/:id', getDetail);

// retrieve rulst for student
// router.get(
//     '/detail/:id',
//     verifyToken,
//     verifyPermission([ROLES.TEACHER, ROLES.STUDENT]),
//     getDetail,
// );

export default router;
