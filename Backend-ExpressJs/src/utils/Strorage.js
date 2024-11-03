import storages from '../models/storage.mongo.js';
import users from '../models/users.mongo.js';
import classes from '../models/classes.mongo.js';
import { saveStorage } from '../models/storage.model.js';
import { RIGHT_TYPE, ROLES } from './Constants.js';

const handleStorage = async (userId) => {
    const getStorage = await storages.findOne({ userId });

    try {
        if (getStorage && getStorage instanceof storages) {
            return getStorage;
        } else {
            const getUser = await users.findOne({ id: userId });
            if (getUser && getUser instanceof users) {
                return await saveStorage({ userId, role: getUser.role });
            } else throw new Error('No user found');
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
            case RIGHT_TYPE.question:
                data.forEach((val) => {
                    if (getStorage.questions.includes(val.id)) {
                        result.push(val);
                    }
                });
                break;
            case RIGHT_TYPE.task:
                data.forEach((val) => {
                    if (getStorage.tasks.includes(val.id)) {
                        result.push(val);
                    }
                });
                break;
            case RIGHT_TYPE.lesson:
                data.forEach((val) => {
                    if (getStorage.lessons.includes(val.id)) {
                        result.push(val);
                    }
                });
                break;
            case RIGHT_TYPE.test:
                data.forEach((val) => {
                    if (getStorage.tests.includes(val.id)) {
                        result.push(val);
                    }
                });
                break;
            case RIGHT_TYPE.class:
                data.forEach((val) => {
                    if (getStorage.classes.includes(val.id)) {
                        result.push(val);
                    }
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

        const getAllStorage = await storages.find({
            classes: { $in: [id] },
        });

        switch (type) {
            case RIGHT_TYPE.question:
                getStorage.questions = getStorage.questions.filter(
                    (questionId) => questionId.toString() !== id,
                );
                break;
            case RIGHT_TYPE.task:
                getStorage.tasks = getStorage.tasks.filter(
                    (taskId) => taskId.toString() !== id,
                );
                break;

            default:
                for (const val of getAllStorage) {
                    if (type == RIGHT_TYPE.lesson) {
                        val.lessons = val.lessons.filter(
                            (lessonId) => lessonId.toString() !== id,
                        );
                    } else if (type == RIGHT_TYPE.test) {
                        val.tests = val.tests.filter(
                            (testId) => testId.toString() !== id,
                        );
                    } else if (type == RIGHT_TYPE.class) {
                        val.classes = val.classes.filter(
                            (classId) => classId.toString() !== id,
                        );
                    }
                    await val.save();
                }
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
        const getUser = await users.findOne({ id: userId });

        if (getUser.role == ROLES.TEACHER) {
            switch (type) {
                case RIGHT_TYPE.question:
                    if (!getStorage.questions.includes(id)) {
                        getStorage.questions.push(id);
                    }
                    break;
                case RIGHT_TYPE.task:
                    if (!getStorage.tasks.includes(id)) {
                        getStorage.tasks.push(id);
                    }
                    break;
                case RIGHT_TYPE.lesson:
                    if (getStorage.lessons.includes(id)) {
                        return false;
                    }
                    getStorage.lessons.push(id);
                    break;
                case RIGHT_TYPE.test:
                    if (getStorage.tests.includes(id)) {
                        return false;
                    }
                    getStorage.tests.push(id);
                    break;
                case RIGHT_TYPE.class:
                    if (getStorage.classes.includes(id)) {
                        return false;
                    }
                    getStorage.classes.push(id);
                    break;
            }
        } else {
            switch (type) {
                case RIGHT_TYPE.lesson:
                    if (getStorage.lessons.find((val) => val.id === id.id)) {
                        return false;
                    }
                    getStorage.lessons.push(id);
                    break;
                case RIGHT_TYPE.test:
                    if (getStorage.tests.find((val) => val.id === id.id)) {
                        return false;
                    }
                    getStorage.tests.push(id);
                    break;
                case RIGHT_TYPE.class:
                    if (getStorage.classes.includes(id)) {
                        return false;
                    }
                    getStorage.classes.push(id);
                    break;
            }
        }

        await getStorage.save();
        return true;
    } catch (error) {
        console.error('Error in addToStorage:', error.message);
        throw new Error('Error while adding to storage');
    }
};

const getResult = async (userId, type, id) => {
    const getUser = await users.findOne({ id: userId });
    if (getUser && getUser instanceof users) {
        const getStorage = await storages.findOne({
            userId,
            role: ROLES.STUDENT,
        });
        if (getStorage && getStorage instanceof storages) {
            let res;
            if (type == RIGHT_TYPE.lesson) {
                res = getStorage.lessons.find((val) => {
                    return val.id == id;
                });
            } else if (type == RIGHT_TYPE.test) {
                res = getStorage.tests.find((val) => {
                    return val.id == id;
                });
            }

            if (res) {
                return res;
            } else return false;
        } else throw new Error('Storage not found');
    } else throw new Error('User not found');
};

export { filterData, deleteFromStorage, addToStorage, getResult };
