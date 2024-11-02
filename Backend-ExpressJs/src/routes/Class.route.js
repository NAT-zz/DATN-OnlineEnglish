import express from 'express';
import {
    getClasses,
    deleteClass,
    createClass,
    getDetail,
    getClassAuth,
    studentSignup,
    handleSubmit,
    getSubmitted,
    markingEssay,
} from '../app/controllers/Class.controller.js';

import { verifyToken, verifyPermission, verifyRights } from './auth.js';
import { ROLES } from '../utils/Constants.js';
const router = express.Router();

// CRUD
router.get('/classes', getClasses);
router.get('/classes/auth', verifyToken, getClassAuth);
router.get('/detail/:id', getDetail);
// router.delete('/:id',verifyToken, verifyRights('class'), deleteClass);
router.delete('/:id', deleteClass);
router.post('/create', createClass);

//student
router.get(
    '/signUp/:id',
    verifyToken,
    verifyPermission([ROLES.STUDENT]),
    studentSignup,
);

router.post(
    '/submit/:type',
    verifyToken,
    verifyPermission([ROLES.STUDENT]),
    handleSubmit,
);

router.get(
    '/submitted/:classId/:type/:typeId',
    verifyToken,
    verifyPermission([ROLES.TEACHER]),
    getSubmitted,
);

router.post(
    '/marking',
    verifyToken,
    verifyPermission([ROLES.TEACHER]),
    markingEssay,
);

// verify, authorize
export default router;
