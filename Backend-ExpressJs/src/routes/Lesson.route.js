import express from 'express';

import {
    getLessons,
    deleteLesson,
    createLesson,
    getDetail
} from '../app/controllers/Lesson.controller.js';

const router = express.Router();

//CRUD
router.get('/lessons', getLessons);
router.get('/detail/:id', getDetail);

router.delete('/:id', deleteLesson);
router.post('/create', createLesson);

export default router;
