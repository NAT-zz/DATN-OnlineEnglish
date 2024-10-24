// import express from 'express';

// import {
//     getTopics,
//     getTopicById,
//     deleteTopic,
//     createTopic,
//     addTasksToTopic,
//     rate,
//     editTopic,
// } from '../app/controllers/Topic.controller.js';
// import { verifyToken, verifyPermission } from './auth.js';
// import { ROLES } from '../utils/Constants.js';

// import multer from 'multer';
// const fileUpload = multer();
// const router = express.Router();

// router.get('/:skill/:level', getTopics);
// router.get('/:id', getTopicById);

// const cpUpload = fileUpload.fields([
//     { name: 'titlePicture', maxCount: 1 },
//     { name: 'audio', maxCount: 1 },
//     { name: 'transcript', maxCount: 1 },
// ]);
// router.delete('/topic/:id', deleteTopic);
// router.post(
//     '/topic/create',
//     cpUpload,
//     verifyToken,
//     verifyPermission([ROLES.ADMIN, ROLES.TEACHER]),
//     createTopic,
// ); // create
// router.post('/topic/edit/:id', editTopic);
// router.post('/topic/add-tasks/:id', addTasksToTopic);

// router.get('/rate/:topicId/:rateCount', rate);

// export default router;
