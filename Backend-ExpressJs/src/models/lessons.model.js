import { readFileSync } from 'fs';
import path from 'path';
import lessons from './lessons.mongo.js';

const __dirname = path.resolve();
const findMaxId = async () => {
    const latestLesson = await lessons.findOne().sort('-id');

    if (!latestLesson && !(latestLesson instanceof lessons)) {
        return 0;
    }
    return latestLesson.id;
};

const saveLesson = async (lesson) => {
    try {
        let getLesson = await lessons.findOne({
            topic: lesson?.topic,
            type: lesson?.type,
            tasks: lesson?.tasks,
        });

        if (getLesson && getLesson instanceof lessons) {
            getLesson.topic = lesson?.topic ? lesson.topic : getLesson.topic;
            getLesson.content = lesson?.content
                ? lesson.content
                : getLesson.content;
            getLesson.tasks = lesson?.tasks ? lesson.tasks : getLesson.tasks;
            getLesson.media = lesson?.media ? lesson.media : getLesson.media;
            getLesson.publicDate = lesson?.publicDate
                ? lesson.publicDate
                : getLesson.publicDate;
            getLesson.taskEndDate = lesson?.taskEndDate
                ? lesson.taskEndDate
                : getLesson.taskEndDate;
            getLesson.type = lesson?.type ? lesson.type : getLesson.type;

            await getLesson.save();
            return getLesson._doc;
        } else {
            getLesson = await lessons.create({
                id: Number((await findMaxId()) + 1),
                topic: lesson.topic,
                content: lesson?.content,
                tasks: lesson?.tasks,
                media: lesson?.media,
                publicDate: lesson?.publicDate,
                taskEndDate: lesson?.taskEndDate,
                type: lesson?.type,
            });
            if (getLesson && getLesson instanceof lessons)
                return getLesson._doc;
            throw new Error('Unable to create new Lesson!');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const initDataLesson = async () => {
    console.log('Init lessons started');
    const json = readFileSync(path.join(__dirname, 'src/data/lesson.json'));
    const readLessons = JSON.parse(json.toString());
    for (const prop in readLessons) {
        await saveLesson(readLessons[prop]);
    }
};

export { initDataLesson, findMaxId, saveLesson };
