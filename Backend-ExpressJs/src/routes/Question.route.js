import express from 'express';
import {
    getQuestion,
    createQuestion,
    deleteQuestion,
    getRandomQuestions,
} from '../app/controllers/Question.controller.js';
import { verifyPermission, verifyRights, verifyToken } from './auth.js'
const router = express.Router();

// CRUD
router.get('/questions', getQuestion);
router.delete('/:id',deleteQuestion);
router.post('/create', createQuestion);

// ?limit = 3
router.get('/get-random/:type', getRandomQuestions);
//essay type

// verify, authorize
export default router;