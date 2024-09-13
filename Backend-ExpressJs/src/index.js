const http = require("http");
const app = require('./app/middlewares/config');
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
const { mongoConnect } = require('./services/mongo');
const { redisConnect } = require('./services/redis');

const { initDataUser } = require('./models/users.model');
const { initDataGrammar } = require('./models/grammars.model');
const { initDataTest } = require('./models/tests.model');
const { initDataMedia } = require('./models/medias.model');
const { initDatatopic } = require('./models/topics.model');
const { initDataTip } = require('./models/tips.model');
const { initDataRate } = require('./models/rates.model');
const { initDataComment } = require('./models/comments.model');

(async function startServer()
{
    await mongoConnect();
    await redisConnect();

    await initDataUser();
    await initDataGrammar();
    await initDataTest();
    await initDataMedia();
    await initDatatopic();
    await initDataTip();

    await initDataRate();
    await initDataComment();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
})();

