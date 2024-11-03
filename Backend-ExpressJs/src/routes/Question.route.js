import express from 'express';
import {
    getQuestion,
    createQuestion,
    deleteQuestion,
    getRandomQuestions,
} from '../app/controllers/Question.controller.js';
import { verifyPermission, verifyRights, verifyToken } from './auth.js';
import { ROLES, RIGHT_TYPE } from '../utils/Constants.js';
const router = express.Router();

// CRUD
router.get(
    '/questions',
    verifyToken,
    verifyPermission([ROLES.TEACHER]),
    getQuestion,
);
router.delete(
    '/:id',
    verifyToken,
    verifyPermission([ROLES.TEACHER]),
    verifyRights(RIGHT_TYPE.question),
    deleteQuestion,
);
router.post(
    '/create',
    verifyToken,
    verifyPermission([ROLES.TEACHER]),
    verifyRights(RIGHT_TYPE.question),
    createQuestion,
);

router.get('/get-random/:type', getRandomQuestions);

export default router;
