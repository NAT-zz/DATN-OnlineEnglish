import express from 'express';

import {
    getLessons,
    deleteLesson,
    createLesson,
    getDetail,
} from '../app/controllers/Lesson.controller.js';
import { verifyPermission, verifyRights, verifyToken } from './auth.js';
import { RIGHT_TYPE, ROLES } from '../utils/Constants.js';

const router = express.Router();

//CRUD
router.get(
    '/lessons',
    verifyToken,
    verifyPermission([ROLES.TEACHER]),
    getLessons,
);
router.delete(
    '/:id',
    verifyToken,
    verifyPermission([ROLES.TEACHER]),
    verifyRights(RIGHT_TYPE.lesson),
    deleteLesson,
);
router.post(
    '/create',
    verifyToken,
    verifyPermission([ROLES.TEACHER]),
    verifyRights(RIGHT_TYPE.lesson),
    createLesson,
);

// retrive results for student
router.get(
    '/detail/:id',
    verifyToken,
    verifyPermission([ROLES.TEACHER, ROLES.STUDENT]),
    getDetail,
);

export default router;
