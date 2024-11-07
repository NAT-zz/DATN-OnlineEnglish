import { mongoConnect } from './services/mongo.js';
import { redisConnect } from './services/redis.js';

import { initDataUser } from './models/users.model.js';
import { initDataQuestion } from './models/questions.model.js';
import { initDataTask } from './models/tasks.model.js';
import { initDataLesson } from './models/lessons.model.js';
import { initDataTest } from './models/tests.model.js';
import { initDataClass } from './models/classes.model.js';
import { initDataStorage } from './models/storage.model.js';

import { server } from './services/socket.js';
import { initDataMessage } from './models/messages.model.js';
import { initDataConversation } from './models/conversations.model.js';

const PORT = process.env.SERVER_PORT;
(async function startServer() {
    await mongoConnect();
    await redisConnect();

    await initDataUser();
    await initDataQuestion();
    await initDataTask();
    await initDataLesson();
    await initDataTest();
    await initDataClass();
    await initDataStorage();

    await initDataConversation();
    await initDataMessage();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
})();
