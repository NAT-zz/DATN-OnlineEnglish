import userRoute from './User.route.js';
import grammarRoute from './Task.route.js';
import testRoute from './Test.route.js';
import selfStudyRoute from './SelfStudy.route.js';
import commentRoute from './Comment.route.js';

function route(app) {
    app.use('/api/user', userRoute);
    app.use('/api/task', grammarRoute);
    app.use('/api/test', testRoute);
    app.use('/api/self-study', selfStudyRoute);

    app.use('/api/comment', commentRoute);
}

export default route;
