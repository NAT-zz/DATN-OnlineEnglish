import express from 'express';
import {
    createTest,
    checkAnswers,
    getTest,
    deleteTest,
    makeTestFromRandom,
} from '../app/controllers/Test.controller.js';

import { verifyToken, verifyPermission } from './auth.js';
import { ROLES } from '../utils/Constants.js';
const router = express.Router();

router.get('/:id', getTest);
router.post('/create', createTest); // create
router.delete('/:id', deleteTest);
//edit

router.get('/get-random', makeTestFromRandom);
router.post('/check-answers', checkAnswers);

export default router;
