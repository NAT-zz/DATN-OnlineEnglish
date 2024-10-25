import express from 'express';
import {
    createTest,
    getTests,
    deleteTest,
} from '../app/controllers/Test.controller.js';

const router = express.Router();

// CRUD
router.get('/tests', getTests);
router.delete('/:id', deleteTest);
router.post('/create', createTest); 

export default router;
