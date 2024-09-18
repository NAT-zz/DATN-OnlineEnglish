import userRoute from './User.route.js';
import grammarRoute from './Task.route.js';
import testRoute from './Test.route.js';
import selfStudyRoute from './SelfStudy.route.js';
import tipRoute from './Tip.route.js';
import rateRoute from './Rate.route.js';
import commentRoute from './Comment.route.js';

function route(app) {
    app.use('/api/user', userRoute);
    app.use('/api/task', grammarRoute);
    app.use('/api/test', testRoute);
    app.use('/api/self-study', selfStudyRoute);
    app.use('/api/tip', tipRoute);
    app.use('/api/rate', rateRoute);
    app.use('/api/comment', commentRoute);

    // app.use('/api/course');
}

export default route;
