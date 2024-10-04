import http from 'http';
import app from './app/middlewares/config.js';
import { mongoConnect } from './services/mongo.js';
import { redisConnect } from './services/redis.js';

import { initDataUser } from './models/users.model.js';
import { initDataGrammar } from './models/grammars.model.js';
import { initDataTest } from './models/tests.model.js';
import { initDataMedia } from './models/medias.model.js';
import { initDatatopic } from './models/topics.model.js';
import { initDataComment } from './models/comments.model.js';

const PORT = process.env.SERVER_PORT;
const server = http.createServer(app);
(async function startServer() {
    await mongoConnect();
    await redisConnect();

    await initDataUser();
    await initDataGrammar();
    await initDataTest();
    await initDataMedia();
    await initDatatopic();

    await initDataComment();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
})();
