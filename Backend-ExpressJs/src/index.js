import { mongoConnect } from './services/mongo.js';
import { redisConnect } from './services/redis.js';

import { initDataUser } from './models/users.model.js';
import { initDataQuestion } from './models/questions.model.js';
import { initDataTask } from './models/tasks.model.js';
import { initDataLesson } from './models/lessons.model.js';
import { initDataTest } from './models/tests.model.js';
import { initDataClass } from './models/classes.model.js';
import { initDataStorage } from './models/storage.model.js';

import { getReceiverSocketId, io, server } from './services/socket.js';
import { initDataMessage } from './models/messages.model.js';
import { initDataConversation } from './models/conversations.model.js';
import { initDataNoti } from './models/notis.model.js';

import { CronJob } from 'cron';

import notis from './models/notis.mongo.js';
import users from './models/users.mongo.js';
import { findMaxId } from './models/notis.model.js';
import { ROLES } from './utils/Constants.js';
import { sendDailyEmail } from './services/email.js';

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
    await initDataNoti();

    // Schedule a job to run every day at 7:00 AM
    const job = new CronJob(
        '00 07 * * *',
        async () => {
            // create noti
            const getStudents = await users.find({ role: ROLES.STUDENT });
            const studentIds = getStudents.map((user) => user.id);

            const newNoti = new notis({
                id: Number((await findMaxId()) + 1),
                to: studentIds,
                from: 'System',
                content: 'Time for your daily questions!',
            });
            await newNoti.save();

            // send through socket
            for (const id of studentIds) {
                let receiverSocketId = getReceiverSocketId(id);
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit('newNoti', {
                        from: 'System',
                        content,
                    });
                }
            }

            // send mail
            for (const user of getStudents) await sendDailyEmail(user.email);
        },
        null,
        false,
    );

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
})();
