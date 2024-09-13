const userRoute = require('./User.route');
const grammarRoute = require('./Task.route');
const testRoute = require('./Test.route');
const selfStudyRoute = require('./SelfStudy.route');
const tipRoute = require('./Tip.route');
const rateRoute = require('./Rate.route');
const commentRoute = require('./Comment.route');

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

module.exports = route;