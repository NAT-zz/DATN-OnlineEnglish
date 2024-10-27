import storages from '../models/storage.mongo.js';
import { saveStorage } from '../models/storage.model.js';

const handleStorage = async (userId) => {
    const getStorage = await storages.findOne({ userId });

    try {
        if (getStorage && getStorage instanceof storages) {
            return getStorage;
        } else {
            return await saveStorage({ userId });
        }
    } catch (error) {
        console.error('Error in handleStorage:', error.message);
        throw new Error('Error while handling storage');
    }
};

const filterData = async (userId, data, type) => {
    try {
        const getStorage = await handleStorage(userId);
        let result = [];
        switch (type) {
            case 'question':
                result = data.map((val) => {
                    if (getStorage.questions.includes(val.id)) return val;
                });
                break;
            case 'task':
                result = data.map((val) => {
                    if (getStorage.tasks.includes(val.id)) return val;
                });
                break;
            case 'lesson':
                result = data.map((val) => {
                    if (getStorage.lessons.includes(val.id)) return val;
                });
                break;
            case 'test':
                result = data.map((val) => {
                    if (getStorage.tests.includes(val.id)) return val;
                });
                break;
            case 'class':
                result = data.map((val) => {
                    if (getStorage.classes.includes(val.id)) return val;
                });
                break;
            default:
                break;
        }

        return result;
    } catch (error) {
        console.error('Error in filterData:', error.message);
        throw new Error('Error while filtering data');
    }
};

const deleteFromStorage = async (userId, id, type) => {
    try {
        const getStorage = await handleStorage(userId);
        switch (type) {
            case 'question':
                getStorage.questions = getStorage.questions.filter(
                    (questionId) => questionId !== id,
                );
                break;
            case 'task':
                getStorage.tasks = getStorage.tasks.filter(
                    (taskId) => taskId !== id,
                );
                break;
            case 'lesson':
                getStorage.lessons = getStorage.lessons.filter(
                    (lessonId) => lessonId !== id,
                );
                break;
            case 'test':
                getStorage.tests = getStorage.tests.filter(
                    (testId) => testId !== id,
                );
                break;
            case 'class':
                getStorage.classes = getStorage.classes.filter(
                    (classId) => classId !== id,
                );
                break;

            default:
                break;
        }

        await getStorage.save();
    } catch (error) {
        console.error('Error in deleteFromStorage:', error.message);
        throw new Error('Error while deleting from storage');
    }
};

const addToStorage = async (userId, id, type) => {
    try {
        const getStorage = await handleStorage(userId);
        switch (type) {
            case 'question':
                if (getStorage.questions.includes(id)) {
                    return false;
                }
                getStorage.questions.push(id);
                break;
            case 'task':
                if (getStorage.tasks.includes(id)) {
                    return false;
                }
                getStorage.tasks.push(id);
                break;
            case 'lesson':
                if (getStorage.lessons.includes(id)) {
                    return false;
                }
                getStorage.lessons.push(id);
                break;
            case 'test':
                if (getStorage.tests.includes(id)) {
                    return false;
                }
                getStorage.tests.push(id);
                break;
            case 'class':
                if (getStorage.classes.includes(id)) {
                    return false;
                }
                getStorage.classes.push(id);
                break;
        }

        await getStorage.save();
        return true;
    } catch (error) {
        console.error('Error in addToStorage:', error.message);
        throw new Error('Error while adding to storage');
    }
};

export { filterData, deleteFromStorage, addToStorage };
