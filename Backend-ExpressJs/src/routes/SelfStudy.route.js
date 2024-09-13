const express = require('express');
const router = express.Router();

const { getTopics, getTopicById, deleteTopic, createTopic, addTasksToTopic, rate, editTopic } = require('../app/controllers/Topic.controller');
const { verifyToken, verifyPermission } = require('./auth');
const { ROLES } = require('../utils/Constants');

const multer = require('multer');
const fileUpload = multer();

router.get('/:skill/:level', getTopics);
router.get('/:id', getTopicById);


const cpUpload = fileUpload.fields([{ name: 'titlePicture', maxCount: 1 }, 
                                            { name: 'audio', maxCount: 1 },
                                            { name: 'transcript', maxCount: 1 }]);
router.delete('/topic/:id', deleteTopic);
router.post('/topic/create', cpUpload, verifyToken, verifyPermission([ROLES.ADMIN, ROLES.TEACHER]), createTopic); // create
router.post('/topic/edit/:id', editTopic);
router.post('/topic/add-tasks/:id', addTasksToTopic);

router.get('/rate/:topicId/:rateCount', rate);

module.exports = router;