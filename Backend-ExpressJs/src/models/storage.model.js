import { readFileSync } from 'fs';
import path from 'path';
import storages from './storage.mongo.js';

const __dirname = path.resolve();

const saveStorage = async (storage) => {
    try {
        let getStorage = await storages.findOne({
            userId: storage?.userId,
            role: storage?.role,
        });

        if (getStorage && getStorage instanceof storages) {
            getStorage.userId = storage?.userId
                ? storage.userId
                : getStorage.userId;
            getStorage.role = storage?.role ? storage.role : getStorage.role;
            getStorage.questions = storage?.questions
                ? storage.questions
                : getStorage.questions;
            getStorage.tasks = storage?.tasks
                ? storage.tasks
                : getStorage.tasks;
            getStorage.lessons = storage?.lessons
                ? storage.lessons
                : getStorage.lessons;
            getStorage.tests = storage?.tests
                ? storage.tests
                : getStorage.tests;
            getStorage.classes = storage?.classes
                ? storage.classes
                : getStorage.classes;

            await getStorage.save();
            return getStorage;
        } else {
            getStorage = await storages.create({
                userId: storage.userId,
                role: storage.role,
                questions: storage?.questions,
                tasks: storage?.tasks,
                lessons: storage?.lessons,
                tests: storage?.tests,
                classes: storage?.classes,
            });

            if (getStorage && getStorage instanceof storages) return getStorage;
            throw new Error('Unable to create new Storage!');
        }
    } catch (err) {
        console.error('Error in saveStorage:', err.message);
        throw err;
    }
};

const initDataStorage = async () => {
    console.log('Init storages started');
    const json = readFileSync(path.join(__dirname, 'src/data/storage.json'));
    const readStorages = JSON.parse(json.toString());
    for (const prop in readStorages) {
        await saveStorage(readStorages[prop]);
    }
};

export { initDataStorage, saveStorage };
