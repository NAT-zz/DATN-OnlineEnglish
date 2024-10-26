import express from 'express';
import {
    createTest,
    getTests,
    deleteTest,
    getDetail,
} from '../app/controllers/Test.controller.js';

const router = express.Router();

// CRUD
router.get('/tests', getTests);
router.get('/detail/:id', getDetail);
router.delete('/:id', deleteTest);
router.post('/create', createTest);

export default router;
