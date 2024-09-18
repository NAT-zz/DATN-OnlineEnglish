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

const saveTest = async (Test) => {
    try {
        let getTest = await tests.findOne({
            name: Test.name,
        });

        if (getTest instanceof tests && getTest) {
            getTest.grammarIds = Test.grammarIds;
            await getTest.save();
            return getTest.id;
        } else {
            getTest = await tests.create({
                id: Number((await findMaxId()) + 1),
                name: Test.name,
                grammarIds: Test.grammarIds,
            });
            if (getTest instanceof tests && getTest) return getTest.id;
            throw new Error('Unable to create new Test!');
        }
    } catch (err) {
        console.error(err.message);
    }
};

const initDataTest = async () => {
    console.log('Init test started');
    const json = readFileSync(path.join(__dirname, 'src/data/test.json'));
    const readtests = JSON.parse(json.toString());
    for (const prop in readtests) {
        await saveTest(readtests[prop]);
    }
};

export { initDataTest, findMaxId, saveTest };
