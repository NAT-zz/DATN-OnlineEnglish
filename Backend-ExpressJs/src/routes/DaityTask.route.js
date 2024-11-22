import express from 'express';

import {
    createQuestions,
    checkAnswer,
    getDaily,
} from '../app/controllers/DailyTasks.controller.js';

import { verifyToken } from './auth.js';
const router = express.Router();

// for dev
router.post('/create', createQuestions);

// student
router.post('/check-answer', verifyToken, checkAnswer);
router.get('/getDaily', verifyToken, getDaily);

export default router;
