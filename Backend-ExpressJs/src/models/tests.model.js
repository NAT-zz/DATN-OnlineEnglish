import { readFileSync } from 'fs';
import path from 'path';
import tests from './tests.mongo.js';

const __dirname = path.resolve();
const findMaxId = async () => {
    const latesTest = await tests.findOne().sort('-id');

    if (!latesTest || !(latesTest instanceof tests)) {
        return 0;
    }
    return latesTest.id;
};

const saveTest = async (test) => {
    try {
        let getTest = await tests.findOne({
            name: test?.name,
            tasks: test?.tasks,
        });

        if (getTest && getTest instanceof tests) {
            getTest.name = test?.name ? test.name : getTest.name;
            getTest.tasks = test?.tasks
                ? test.tasks
                : getTest.tasks;
            getTest.publicDate = test?.publicDate
                ? test.publicDate
                : getTest.publicDate;
            getTest.endDate = test?.endDate ? test.endDate : getTest.endDate;
            getTest.time = test?.time ? test.time : getTest.time;

            await getTest.save();
            return getTest._doc;
        } else {
            getTest = await tests.create({
                id: Number((await findMaxId()) + 1),
                name: test.name,
                tasks: test?.tasks,
                publicDate: test?.publicDate,
                endDate: test?.endDate,
                time: test?.time,
            });
            if (getTest instanceof tests && getTest) return getTest._doc;
            throw new Error('Unable to create new Test!');
        }
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};

const initDataTest = async () => {
    console.log('Init tests started');
    const json = readFileSync(path.join(__dirname, 'src/data/test.json'));
    const readtests = JSON.parse(json.toString());
    for (const prop in readtests) {
        await saveTest(readtests[prop]);
    }
};

export { initDataTest, findMaxId, saveTest };
