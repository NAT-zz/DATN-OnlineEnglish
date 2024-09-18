import express from 'express';

import { verifyToken, verifyPermission } from './auth.js';
import {
    getRandomTasks,
    checkAnswers,
    createGrammar,
    deleteGrammar,
    getGrammar,
} from '../app/controllers/Task.controller.js';
import { ROLES } from '../utils/Constants.js';
const router = express.Router();

// type: SELECTION, FILL
router.get('/get-random/:skill/:type/:topic/:number', getRandomTasks);
router.post('/check-answers/:skill/:type', checkAnswers);

// CRUD
router.get('/get/:skill/:id', getGrammar);
router.post('/create/:skill', createGrammar);
router.delete('/delete/:skill/:id', deleteGrammar);
//edit

export default router;
