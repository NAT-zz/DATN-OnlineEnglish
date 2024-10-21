import userRoute from './User.route.js';
import grammarRoute from './Task.route.js';
import testRoute from './Test.route.js';
import selfStudyRoute from './SelfStudy.route.js';
import commentRoute from './Comment.route.js';

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
    app.use('/api/task', grammarRoute);
    app.use('/api/test', testRoute);
    app.use('/api/self-study', selfStudyRoute);

    app.use('/api/comment', commentRoute);
}

export default route;
