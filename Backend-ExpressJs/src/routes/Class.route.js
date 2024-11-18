import express from 'express';
import {
    getClasses,
    deleteClass,
    createClass,
    getDetail,
    getClassAuth,
    studentSignup,
    studentSignout,
    handleSubmit,
    getSubmitted,
    markingEssay,
    getStudents,
} from '../app/controllers/Class.controller.js';

import { verifyToken, verifyPermission, verifyRights } from './auth.js';
import { RIGHT_TYPE, ROLES } from '../utils/Constants.js';
const router = express.Router();

// CRUD
router.get('/classes', getClasses);

// teacher/student
router.get(
    '/classes/auth',
    verifyToken,
    verifyPermission([ROLES.TEACHER, ROLES.STUDENT]),
    getClassAuth,
);
router.delete(
    '/:id',
    verifyToken,
    verifyPermission([ROLES.TEACHER]),
    verifyRights(RIGHT_TYPE.class),
    deleteClass,
);
router.post(
    '/create',
    verifyToken,
    verifyPermission([ROLES.TEACHER]),
    verifyRights(RIGHT_TYPE.class),
    createClass,
);

router.get('/detail/:id', getDetail);

//student
router.get(
    '/signUp/:id',
    verifyToken,
    verifyPermission([ROLES.STUDENT]),
    studentSignup,
);

router.get(
    '/signOut/:id',
    verifyToken,
    verifyPermission([ROLES.STUDENT]),
    studentSignout,
);

router.post(
    '/submit/:type',
    verifyToken,
    verifyPermission([ROLES.STUDENT]),
    handleSubmit,
);

// teacher
router.get(
    '/students/:id',
    verifyToken,
    verifyPermission([ROLES.TEACHER]),
    verifyRights(RIGHT_TYPE.class),
    getStudents,
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
