import express from 'express';

import {
    getLessons,
    deleteLesson,
    createLesson
} from '../app/controllers/Lesson.controller.js';

import multer from 'multer';
const fileUpload = multer();
const router = express.Router();

const cpUpload = fileUpload.fields([
    { name: 'titlePicture', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
    { name: 'transcript', maxCount: 1 },
]);

//CRUD
router.get('/lessons', getLessons);
router.delete('/:id', deleteLesson);
router.post('/create', createLesson);

// router.post(
//     '/topic/create',
//     cpUpload,
//     verifyToken,
//     verifyPermission([ROLES.ADMIN, ROLES.TEACHER]),
//     createTopic,
// );

// router.post('/topic/add-tasks/:id', addTasksToTopic);

export default router;
