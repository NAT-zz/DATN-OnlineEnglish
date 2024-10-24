import { mongoConnect } from './services/mongo.js';
import { redisConnect } from './services/redis.js';

import { initDataUser } from './models/users.model.js';
import { initDataQuestion } from './models/questions.model.js';
import { initDataTask } from './models/tasks.model.js';
// import { initDataTest } from './models/tests.model.js';
// import { initDataMedia } from './models/medias.model.js';
// import { initDatatopic } from './models/topics.model.js';

import { server } from './services/socket.js';

const PORT = process.env.SERVER_PORT;
(async function startServer() {
    await mongoConnect();
    await redisConnect();

    await initDataUser();
    await initDataQuestion();
    await initDataTask();

    // await initDataLesson();
    // await initDataTest();
    // await initDataMedia();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
})();
