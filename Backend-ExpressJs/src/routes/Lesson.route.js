import express from 'express';

import {
    getLessons,
    deleteLesson,
    createLesson,
    getDetail,
} from '../app/controllers/Lesson.controller.js';
import { verifyPermission, verifyToken } from './auth.js';
import { ROLES } from '../utils/Constants.js';

const router = express.Router();

//CRUD
router.get('/lessons', getLessons);
router.get('/detail/:id', getDetail);

// retrive results for student
// router.get(
//     '/detail/:id',
//     verifyToken,
//     verifyPermission([ROLES.TEACHER, ROLES.STUDENT]),
//     getDetail,
// );

router.delete('/:id', deleteLesson);
router.post('/create', createLesson);

export default router;
