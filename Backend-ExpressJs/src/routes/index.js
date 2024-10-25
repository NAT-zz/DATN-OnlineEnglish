import userRoute from './User.route.js';
import questionRoute from './Question.route.js';
import taskRoute from './Task.route.js';
import lessonRoute from './Lesson.route.js';
import testRoute from './Test.route.js';

import { mongoDeleteAllDB } from '../services/mongo.js';
function route(app) {
    // for dev
    app.get('/api/admin/cleardb', async (req, res) => {
        try {
            await mongoDeleteAllDB();
            return res
                .status(200)
                .json({ message: 'All collections dropped' });
        } catch (err) {
            return res
                .status(500)
                .json({ message: 'Error occurred while dropping collections' });
        }
    });

    app.use('/api/user', userRoute);
    app.use('/api/question', questionRoute);
    app.use('/api/task', taskRoute);
    app.use('/api/lesson', lessonRoute);
    app.use('/api/test', testRoute);
}

export default route;
