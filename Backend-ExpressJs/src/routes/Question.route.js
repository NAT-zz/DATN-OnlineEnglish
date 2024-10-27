import express from 'express';
import {
    getQuestion,
    createQuestion,
    deleteQuestion,
    getRandomQuestions,
    checkAnswers,
} from '../app/controllers/Question.controller.js';
import { verifyPermission, verifyRights, verifyToken } from './auth.js'
const router = express.Router();

// CRUD
router.get('/questions', verifyToken ,getQuestion);
router.delete('/:id',deleteQuestion);
router.post('/create', createQuestion);

// ?limit = 3
router.get('/get-random/:type', getRandomQuestions);
router.post('/check-answers', checkAnswers);
//essay type

// verify, authorize
export default router;