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

const storage = multer.memoryStorage();
const fileUpload = multer({ storage });
const cpUpload = fileUpload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
]);

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
    app.get('/api/storage', async (req, res) => {
        try {
            const data = await storages.find();
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
