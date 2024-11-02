import { makeSuccessResponse } from '../../utils/Response.js';
import { StatusCodes } from 'http-status-codes';
import lessons from '../../models/lessons.mongo.js';
import classes from '../../models/classes.mongo.js';
import tests from '../../models/tests.mongo.js';
import users from '../../models/users.mongo.js';
import storages from '../../models/storage.mongo.js';
import questions from '../../models/questions.mongo.js';
import tasks from '../../models/tasks.mongo.js';
import { saveClass } from '../../models/classes.model.js';

import {
    filterData,
    addToStorage,
    deleteFromStorage,
} from '../../utils/Strorage.js';
import { ROLES, TASK_TYPE } from '../../utils/Constants.js';

const getTeacherOfClass = async (classId) => {
    const getStorage = await storages.findOne({
        classes: { $in: [classId] },
        role: ROLES.TEACHER,
    });

    if (getStorage && getStorage instanceof storages) {
        const getTeacher = await users
            .findOne({ id: getStorage.userId })
            .select('userName avatar description');
        if (getTeacher && getTeacher instanceof users) {
            return getTeacher;
        } else throw new Error('No user found');
    } else throw new Error('No storage found');
};

const getClasses = async (req, res) => {
    try {
        const getAll = await classes.find({});
        const data = await Promise.all(
            getAll.map(async (val) => {
                const getTeacher = await getTeacherOfClass(val.id);
                return {
                    ...val._doc,
                    teacher: getTeacher,
                };
            }),
        );

        return makeSuccessResponse(res, StatusCodes.OK, {
            data,
        });
    } catch (error) {
        console.log('Error in getClasses: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const getClassAuth = async (req, res) => {
    try {
        const getAll = await classes.find({});
        let data = await filterData(req.userData.id, getAll, 'class');

        data = await Promise.all(
            data.map(async (val) => {
                const getTeacher = await getTeacherOfClass(val.id);
                return {
                    ...val._doc,
                    teacher: getTeacher,
                };
            }),
        );

        return makeSuccessResponse(res, StatusCodes.OK, {
            data,
        });
    } catch (error) {
        console.log('Error in getClassAuth: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const getDetail = async (req, res) => {
    const id = req.params.id;
    try {
        if (!id) {
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Class ID is required.',
            });
        } else {
            const getOne = await classes.findOne({ id });
            if (getOne && getOne instanceof classes) {
                let listLesson = [];
                let listTest = [];
                for (const id of getOne.lessons) {
                    let getLesson = await lessons.findOne({ id }, '-r -__v');
                    listLesson.push(getLesson._doc);
                }
                for (const id of getOne.tests) {
                    let getTest = await tests.findOne({ id }, '-r -__v');
                    listTest.push(getTest._doc);
                }

                return makeSuccessResponse(res, StatusCodes.OK, {
                    data: {
                        ...getOne._doc,
                        lessons: listLesson,
                        tests: listTest,
                    },
                });
            } else {
                return makeSuccessResponse(res, StatusCodes.NOT_FOUND, {
                    message: `Class not found with id ${id}`,
                });
            }
        }
    } catch (err) {
        console.log('Error in getDetail: ', err.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const deleteClass = async (req, res) => {
    const id = req.params.id;
    try {
        if (!id) {
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Class ID is required.',
            });
        } else {
            const deleteCount = (await classes.deleteOne({ id })).deletedCount;
            await deleteFromStorage(req.userData.id, id, 'class');

            if (deleteCount > 0) {
                return makeSuccessResponse(res, StatusCodes.OK, {
                    message: `Class deleted with id ${id}`,
                });
            } else
                return makeSuccessResponse(res, StatusCodes.NOT_FOUND, {
                    message: `No class found with id ${id}`,
                });
        }
    } catch (error) {
        console.log('Error in deleteClass: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const createClass = async (req, res) => {
    const id = req.query.updateId;
    try {
        if (id) {
            const getClass = await classes.findOne({ id });
            if (getClass && getClass instanceof classes) {
                getClass.name = req.body?.name ? req.body.name : getClass.name;
                getClass.description = req.body?.description
                    ? req.body.description
                    : getClass.description;
                getClass.lessons = req.body?.lessons
                    ? req.body.lessons
                    : getClass.lessons;
                getClass.tests = req.body?.tests
                    ? req.body.tests
                    : getClass.tests;
                getClass.startDate = req.body?.startDate
                    ? req.body.startDate
                    : getClass.startDate;
                getClass.endDate = req.body?.endDate
                    ? req.body.endDate
                    : getClass.endDate;

                await getClass.save();
                return makeSuccessResponse(res, StatusCodes.OK, {
                    message: `Class updated with id ${id}`,
                    data: {
                        ...getClass._doc,
                    },
                });
            }
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: `Class not found with id ${id}`,
            });
        } else {
            if (!req.body.name)
                return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                    message: 'Missing class name',
                });
            let newClass = {
                name: req.body.name,
                description: req.body?.description,
                lessons: req.body?.lessons,
                tests: req.body?.tests,
                startDate: req.body?.startDate,
                endDate: req.body?.endDate,
            };

            newClass = await saveClass(newClass);
            return makeSuccessResponse(res, StatusCodes.OK, {
                message: 'Class created',
                data: newClass,
            });
        }
    } catch (error) {
        console.log('Error in createClass: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const studentSignup = async (req, res) => {
    if (!req.userData || !req.params.id) {
        return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
            message: 'Invalid request, userData or classId is required.',
        });
    }

    // add to teacher studying
    if (await addToStorage(req.userData.id, req.params.id, 'class')) {
        return makeSuccessResponse(res, StatusCodes.OK, {
            message: 'Student has been signed up for the class',
        });
    } else {
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Failed to sign up for the class',
        });
    }
};

const checkQuestionAnswer = async (data) => {
    // {
    //     "data": [
    //         {
    //             "id": 4,
    //             "answer": "I'm fine"
    //         },
    //         {
    //             "id": 5,
    //             "answer": "I'm fine"
    //         }
    //     ]
    // }
    const correctResult = [],
        wrongResult = [];
    for (const val of data) {
        const getSentence = await questions.findOne({
            id: val.id,
        });

        if (getSentence && getSentence instanceof questions) {
            if (getSentence.key === val.answer.trim())
                correctResult.push(val.id);
            else wrongResult.push(val.id);
        }
    }
    return {
        correctResult,
        wrongResult,
    };
};

const getAmountQuestion = async (id, type) => {
    let amount = {
        multiple_choice: 0,
        essay: 0,
    };
    let getType;
    if (type == 'lesson') {
        getType = await lessons.findOne({
            id,
        });
        if (!(getType && getType instanceof lessons))
            throw new Error('No lesson found');
    } else if (type == 'test') {
        getType = await tests.findOne({
            id,
        });
        if (!(getType && getType instanceof tests))
            throw new Error('No test found');
    }

    for (const task of getType.tasks) {
        console.log(task);
        const getTask = await tasks.findOne({
            id: task,
        });
        if (getTask && getTask instanceof tasks) {
            if (getTask.taskType == TASK_TYPE.MULTIPLE_CHOICE)
                amount.multiple_choice += getTask.questions.length;
            else if (getTask.taskType == TASK_TYPE.ESSAY) amount.essay++;
        }
    }
    return amount;
};

const handleSubmit = async (req, res) => {
    const type = req.params.type;
    if (type != 'lesson' && type != 'test') {
        return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
            message: 'Invalid type',
        });
    }
    if (!req.body.data || !req.body.id)
        return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
            message: 'Missing data or test/lesson id',
        });

    const amount = await getAmountQuestion(req.body.id, type);
    console.log(amount);

    try {
        const result = await checkQuestionAnswer(req.body.data);
        // Total score is 1 out of 8 (13%)
        if (result) {
            const percent = (
                (result.correctResult.length / amount.multiple_choice) *
                100
            ).toFixed();

            const savedResult = {
                id: req.body.id,
                multiple_choice: {
                    score: `${percent}% - ${result.correctResult.length}/${amount.multiple_choice} `,
                    correctQuestions: result.correctResult,
                },
            };
            if (amount.essay > 0) {
                savedResult.essay = {
                    score: 'waiting',
                };
            }

            const added = await addToStorage(
                req.userData.id,
                savedResult,
                type,
            );

            if (added) console.log('result saved');
            else {
                console.log('result not saved');
                return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                    message: `You've already submitted this task`,
                });
            }

            return makeSuccessResponse(res, StatusCodes.OK, {
                message:
                    amount.essay > 0
                        ? `Result for multiple choice, wating for teacher to check on your essay...`
                        : 'Result for multiple choice',
                data: savedResult,
            });
        } else
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'No result',
            });
    } catch (err) {
        console.log('Error in handleSubmit: ', err.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};
export {
    getClasses,
    createClass,
    deleteClass,
    getDetail,
    getClassAuth,
    studentSignup,
    handleSubmit,
};
