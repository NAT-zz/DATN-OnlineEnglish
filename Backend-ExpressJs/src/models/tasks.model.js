import { readFileSync } from 'fs';
import path from 'path';
import tasks from './tasks.mongo.js';

const __dirname = path.resolve();
const findMaxId = async () => {
    const latestTask = await tasks.findOne().sort('-id');

    if (!latestTask && !(latestTask instanceof tasks)) {
        return 0;
    }
    return latestTask.id;
};

const saveTask = async (task) => {
    try {
        let getTask = await tasks.findOne({
            task: task?.task,
            questions: task?.questions,
        });

        if (getTask && getTask instanceof tasks) {
            getTask.task = task?.task || getTask.task;
            getTask.topic = task?.topic || getTask.topic;
            getTask.questions = task?.questions || getTask.questions;
            getTask.taskType = task?.taskType || getTask.taskType;

            await getTask.save();
            return getTask.id;
        } else {
            getTask = await tasks.create({
                id: Number((await findMaxId()) + 1),
                task: task.task,
                topic: task.topic,
                questions: task.questions,
                taskType: task.taskType,
            });
            if (getTask && getTask instanceof tasks) return getTask.id;
            throw new Error('Unable to create new Task!');
        }
    } catch (err) {
        console.error(err.message);
    }
};

const initDataTask = async () => {
    console.log('Init tasks started');
    const json = readFileSync(path.join(__dirname, 'src/data/task.json'));
    const readTasks = JSON.parse(json.toString());
    for (const prop in readTasks) {
        await saveTask(readTasks[prop]);
    }
};

const getRandomTasks = async (filter, limit) => {
    return await tasks.findRandom(filter, '-_id -__v -r').limit(limit);
};

export { initDataTask, findMaxId, saveTask, getRandomTasks };
