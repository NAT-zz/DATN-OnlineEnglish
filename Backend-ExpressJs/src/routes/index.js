import userRoute from './User.route.js';
import questionRoute from './Question.route.js';
import taskRoute from './Task.route.js';
import lessonRoute from './Lesson.route.js';
import testRoute from './Test.route.js';
import classRoute from './Class.route.js';

import multer from 'multer';
import { uploadFile } from '../app/controllers/File.controller.js';
import { mongoDeleteAllDB } from '../services/mongo.js';

import storages from '../models/storage.mongo.js';
import questions from '../models/questions.mongo.js';
import tasks from '../models/tasks.mongo.js';
import lessons from '../models/lessons.mongo.js';
import tests from '../models/tests.mongo.js';
import classes from '../models/classes.mongo.js';
import users from '../models/users.mongo.js';
import {
    deleteLastestUser,
    deleteUser,
} from '../app/controllers/User.controller.js';

const storage = multer.memoryStorage();
const fileUpload = multer({ storage });

function route(app) {
    // for dev
    app.get('/api/admin/cleardb', async (req, res) => {
        try {
            await mongoDeleteAllDB();
            return res.status(200).json({ message: 'All collections dropped' });
        } catch (err) {
            return res
                .status(500)
                .json({ message: 'Error occurred while dropping collections' });
        }
    });
    app.delete('/:id', deleteUser);
    app.post('/deleteLastest', deleteLastestUser);
    app.get('/api', async (req, res) => {
        try {
            let data = null;
            const type = req.query.type;
            switch (type) {
                case 'user':
                    data = await users.find();
                    break;
                case 'storage':
                    data = await storages.find();
                    break;
                case 'question':
                    data = await questions.find({}, '-r');
                    break;
                case 'task':
                    data = await tasks.find({}, '-r');
                    break;
                case 'lesson':
                    data = await lessons.find();
                    break;
                case 'test':
                    data = await tests.find();
                    break;
                case 'class':
                    data = await classes.find();
                    break;
                default:
                    break;
            }

            return res.status(200).json({
                data,
            });
        } catch (err) {
            return res
                .status(500)
                .json({ message: 'Error occurred while getting storages' });
        }
    });

    //file upload
    app.post('/api/upload', fileUpload.single('file'), uploadFile);

    app.use('/api/user', userRoute);
    app.use('/api/question', questionRoute);
    app.use('/api/task', taskRoute);
    app.use('/api/lesson', lessonRoute);
    app.use('/api/test', testRoute);
    app.use('/api/class', classRoute);
}

export default route;
