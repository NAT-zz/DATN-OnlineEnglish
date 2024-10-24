import express from 'express';

import {getLessons} from '../app/controllers/Lesson.controller.js';
import { verifyToken, verifyPermission } from './auth.js';
import { ROLES } from '../utils/Constants.js';

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
// router.delete('/topic/:id', deleteTopic);
// router.post(
//     '/topic/create',
//     cpUpload,
//     verifyToken,
//     verifyPermission([ROLES.ADMIN, ROLES.TEACHER]),
//     createTopic,
// ); // create

// router.post('/topic/add-tasks/:id', addTasksToTopic);

export default router;
