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
import { handleDailyStorage } from './app/controllers/DailyTasks.controller.js';

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
        '11 15 * * *',
        async () => {
            try {
                // create noti
                const getStudents = await users.find({ role: ROLES.STUDENT });
                const studentIds = getStudents.map((user) => user.id);

                const newNoti = new notis({
                    id: Number((await findMaxId()) + 1),
                    to: studentIds,
                    from: 0,
                    content: 'Time for your daily questions!',
                });
                await newNoti.save();

                // send through socket
                for (const id of studentIds) {
                    let receiverSocketId = getReceiverSocketId(id);
                    if (receiverSocketId) {
                        io.to(receiverSocketId).emit('newNoti', {
                            ...newNoti._doc,
                            to: undefined,
                            from: 'System',
                        });
                    }
                }
                console.log({
                    ...newNoti._doc,
                    to: undefined,
                    from: 'System',
                });

                // send mail
                for (const user of getStudents) {
                    const userRecord = await handleDailyStorage(user.id);

                    if (userRecord.todayStatus === true) {
                        userRecord.todayStatus = false;
                    }
                    await userRecord.save();

                    await sendDailyEmail(user);
                }
            } catch (error) {
                console.log('Error in cron job:', error.message);
            }
        },
        null,
        true,
    );

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
})();
