import { readFileSync } from 'fs';
import path from 'path';
import classes from './classes.mongo.js';

const __dirname = path.resolve();
const findMaxId = async () => {
    const lastestClass = await classes.findOne().sort('-id');

    if (!lastestClass && !(lastestClass instanceof classes)) {
        return 0;
    }
    return lastestClass.id;
};

const saveClass = async (thisClass) => {
    try {
        let getClass = await classes.findOne({
            name: thisClass?.name,
        });

        if (getClass && getClass instanceof classes) {
            getClass.name = thisClass?.name ? thisClass.name : getClass.name;
            getClass.description = thisClass?.description
                ? thisClass.description
                : getClass.description;
            getClass.lessons = thisClass?.lessons
                ? thisClass.lessons
                : getClass.lessons;
            getClass.tests = thisClass?.tests
                ? thisClass.tests
                : getClass.tests;
            getClass.startDate = thisClass?.startDate
                ? thisClass.startDate
                : getClass.startDate;
            getClass.endDate = thisClass?.endDate
                ? thisClass.endDate
                : getClass.endDate;

            await getClass.save();
            return getClass._doc;
        } else {
            getClass = await classes.create({
                id: Number((await findMaxId()) + 1),
                name: thisClass.name,
                description: thisClass?.description,
                lessons: thisClass?.lessons,
                tests: thisClass?.tests,
                startDate: thisClass?.startDate,
                endDate: thisClass?.endDate,
            });

            if (getClass && getClass instanceof classes) return getClass._doc;
            throw new Error('Unable to create new Lesson!');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const initDataClass = async () => {
    console.log('Init classes started');
    const json = readFileSync(path.join(__dirname, 'src/data/class.json'));
    const readClasses = JSON.parse(json.toString());
    for (const prop in readClasses) {
        await saveClass(readClasses[prop]);
    }
};

export { initDataClass, findMaxId, saveClass };
