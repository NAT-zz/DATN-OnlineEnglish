import { makeSuccessResponse } from '../../utils/Response.js';
import { StatusCodes } from 'http-status-codes';
import lessons from '../../models/lessons.mongo.js';
import classes from '../../models/classes.mongo.js';
import tests from '../../models/tests.mongo.js';
import users from '../../models/users.mongo.js';
import storages from '../../models/storage.mongo.js';
import questions from '../../models/questions.mongo.js';
import tasks from '../../models/tasks.mongo.js';
import { findMaxId, saveClass } from '../../models/classes.model.js';

import {
    filterData,
    addToStorage,
    deleteFromStorage,
    handleStorage,
    deleteFromStorageStudent,
} from '../../utils/Strorage.js';
import { LEVEL, RIGHT_TYPE, ROLES, TASK_TYPE } from '../../utils/Constants.js';
import { saveStorage } from '../../models/storage.model.js';
import notis from '../../models/notis.mongo.js';
import { findMaxId as findMaxIdNoti } from '../../models/notis.model.js';
import { getReceiverSocketId } from '../../services/socket.js';
import { io } from '../../services/socket.js';

const getTeacherOfClass = async (classId) => {
    const getStorage = await storages.findOne({
        classes: { $in: [classId] },
        role: ROLES.TEACHER,
    });

    if (getStorage && getStorage instanceof storages) {
        const getTeacher = await users
            .findOne({ id: getStorage.userId })
            .select('userName avatar description id coin');
        if (getTeacher && getTeacher instanceof users) {
            return getTeacher;
        } else throw new Error('No user found');
    } else throw new Error('No storage found');
};

const getClasses = async (req, res) => {
    try {
        const getAll = await classes.find({});
        const dataWithTeacher = await Promise.all(
            getAll.map(async (val) => {
                const getTeacher = await getTeacherOfClass(val.id);
                return {
                    ...val._doc,
                    teacher: getTeacher,
                };
            }),
        );

        let data = Object.keys(LEVEL).reduce((acc, key) => {
            acc[key] = [];
            return acc;
        }, {});

        for (const level in LEVEL) {
            for (const val of dataWithTeacher) {
                if (val.level == level) {
                    data[level].push(val);
                }
            }
        }

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
        let data = await filterData(req.userData.id, getAll, RIGHT_TYPE.class);

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

                // get teacher
                const getStorage = await storages.findOne({
                    role: ROLES.TEACHER,
                    classes: { $in: [getOne.id] },
                });
                if (getStorage && getStorage instanceof storages) {
                    const getTeacher = await users
                        .findOne({
                            id: getStorage.userId,
                        })
                        .select('id userName avatar');
                    if (getTeacher && getTeacher instanceof users) {
                        getOne.teacher = getTeacher;
                    }
                }

                // calculate record
                let record = {
                    progressLesson: 0,
                    progressTest: 0,
                    overall: 0,
                };
                const getStorageStudent = await storages.findOne({
                    userId: req.userData.id,
                    role: ROLES.STUDENT,
                });

                if (
                    getStorageStudent &&
                    getStorageStudent instanceof storages
                ) {
                    let lessonCount = 0;
                    let lessonRes = 0;

                    listLesson.forEach((lesson) => {
                        if (
                            getStorageStudent.lessons.find((les) => {
                                if (les.id === lesson.id) {
                                    lessonRes += parseFloat(
                                        les.multiple_choice.score.slice(0, 2),
                                    );
                                    return true;
                                }
                                return false;
                            })
                        ) {
                            lessonCount++;
                        }
                    });
                    lessonRes = lessonRes / listLesson.length;

                    let testCount = 0;
                    let testRes = 0;
                    listTest.forEach((test) => {
                        if (
                            getStorageStudent.tests.find((tst) => {
                                if (tst.id === test.id) {
                                    testRes += parseFloat(
                                        tst.multiple_choice.score.slice(0, 2),
                                    );
                                    return true;
                                }
                                return false;
                            })
                        ) {
                            testCount++;
                        }
                    });
                    testRes = testRes / listTest.length;

                    record.progressLesson = Math.floor(
                        (lessonCount / listLesson.length) * 100,
                    );
                    record.progressTest = Math.floor(
                        (testCount / listTest.length) * 100,
                    );
                    record.overall = Math.floor((lessonRes + testRes) / 2);

                    console.log('record: ', record);
                }

                return makeSuccessResponse(res, StatusCodes.OK, {
                    data: {
                        ...getOne._doc,
                        lessons: listLesson,
                        tests: listTest,
                        teacher: getOne.teacher,
                        record,
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
            await deleteFromStorage(req.userData.id, id, RIGHT_TYPE.class);

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
                getClass.level = req.body?.level
                    ? req.body.level
                    : getClass.level;
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
                level: req.body?.level ? req.body.level : LEVEL.A1,
                description: req.body?.description,
                lessons: req.body?.lessons,
                tests: req.body?.tests,
                startDate: req.body?.startDate,
                endDate: req.body?.endDate,
            };

            newClass = await classes.create({
                id: Number((await findMaxId()) + 1),
                level: newClass.level,
                name: newClass.name,
                description: newClass?.description,
                lessons: newClass?.lessons,
                tests: newClass?.tests,
                startDate: newClass?.startDate,
                endDate: newClass?.endDate,
            });

            if (!(newClass && newClass instanceof classes))
                throw new Error('Unable to create new Lesson!');

            await addToStorage(req.userData.id, newClass.id, RIGHT_TYPE.class);
            return makeSuccessResponse(res, StatusCodes.OK, {
                message: 'Class created',
                data: newClass._doc,
            });
        }
    } catch (error) {
        console.log('Error in createClass: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const getStudents = async (req, res) => {
    const classId = req.params.id;

    if (!classId) {
        return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
            message: 'Class ID is required.',
        });
    }
    const getUsers = await storages.find({
        classes: { $in: classId },
        role: ROLES.STUDENT,
    });
    let data = [];
    for (const student of getUsers) {
        const user = await users.findOne({ id: student.userId }, '-passWord');
        if (user && user instanceof users) {
            data.push(user);
        }
    }
    return makeSuccessResponse(res, StatusCodes.OK, {
        data: data,
    });
};

const studentSignup = async (req, res) => {
    if (!req.userData.id || !req.params.id) {
        return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
            message: 'Invalid request, userData or classId is required.',
        });
    }
    try {
        const getUser = await users.findOne({ id: req.userData.id });
        if (getUser && getUser instanceof users) {
            if (getUser.coin >= 30) {
                getUser.coin -= 30;
                await getUser.save();
            } else
                return makeSuccessResponse(
                    res,
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    {
                        message: `You don't have enought coin`,
                    },
                );
        } else throw Error('User not found');

        if (
            await addToStorage(req.userData.id, req.params.id, RIGHT_TYPE.class)
        ) {
            const teacher = await getTeacherOfClass(req.params.id);
            teacher.coin += 1;
            await teacher.save();

            const newNoti = new notis({
                id: Number((await findMaxIdNoti()) + 1),
                to: teacher.id,
                from: 0,
                content: `"${getUser.userName}" signed up for you class!, 1 coin added`,
            });
            await newNoti.save();

            let receiverSocketId = getReceiverSocketId(teacher.id);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('newNoti', {
                    ...newNoti._doc,
                    to: undefined,
                    from: 'System',
                });
            }

            return makeSuccessResponse(res, StatusCodes.OK, {
                message: 'Student has been signed up for the class',
            });
        } else {
            return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
                message: 'Failed to sign up for the class',
            });
        }
    } catch (error) {
        console.log('Error in studentSignup: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, try again later!',
        });
    }
};

const studentSignout = async (req, res, next) => {
    if (!req.userData.id || !req.params.id) {
        return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
            message: 'Invalid request, userData or classId is required.',
        });
    }
    try {
        const getClass = await classes.findOne({ id: req.params.id });
        const getUser = await users.findOne({ id: req.userData.id });
        if (getUser && getUser instanceof users) {
            getUser.coin += 10;
            await getUser.save();
        } else throw Error('User not found');

        if (getClass && getClass instanceof classes) {
            await deleteFromStorageStudent(
                req.userData.id,
                req.params.id,
                RIGHT_TYPE.class,
            );
            for (const lesson of getClass.lessons) {
                await deleteFromStorageStudent(
                    req.userData.id,
                    lesson.id,
                    RIGHT_TYPE.lesson,
                );
            }
            for (const test of getClass.tests) {
                await deleteFromStorageStudent(
                    req.userData.id,
                    test.id,
                    RIGHT_TYPE.test,
                );
            }

            return makeSuccessResponse(res, StatusCodes.OK, {
                message: 'Student has been signed out for the class',
            });
        }
        return makeSuccessResponse(res, StatusCodes.OK, {
            message: 'Signed out failed',
        });
    } catch (error) {
        console.log('Error in studentSignOut: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, try again later!',
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
    //         },
    // {
    //      "idEssayTask": 3,
    //      "content": "this is my essay............"
    // }
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
                let dataEssay = [];
                req.body.data.forEach((val) => {
                    if (val.idEssayTask) {
                        dataEssay.push({
                            idTask: val.idEssayTask,
                            score: 'waiting',
                            content: val.content,
                        });
                    }
                });
                savedResult.essays = dataEssay;
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

const getSubmitted = async (req, res) => {
    const classId = req.params.classId;
    const type = req.params.type;
    const typeId = req.params.typeId;

    try {
        if (!classId || !type || !typeId) {
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Missing type or id',
            });
        }
        let getResult = {
            submitted: [],
            unsubmitted: [],
        };
        const getStudents = await storages.find({
            classes: { $in: [classId] },
            role: ROLES.STUDENT,
        });
        let lessonRes;

        for (const student of getStudents) {
            if (type == 'lesson') {
                lessonRes = student.lessons.find((val) => val.id == typeId);
            } else if (type == 'test') {
                lessonRes = student.tests.find((val) => val.id == typeId);
            }

            const getUser = await users
                .findOne({ id: student.userId })
                .select('userName avatar id');
            if (lessonRes) {
                getResult.submitted.push({
                    student: getUser,
                    result: lessonRes,
                    createdAt: Date.now(),
                });
            } else {
                getResult.unsubmitted.push({
                    student: getUser,
                });
            }
        }

        return makeSuccessResponse(res, StatusCodes.OK, {
            data: getResult,
        });
    } catch (error) {
        console.log('Error in getSubmitted: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const markingEssay = async (req, res) => {
    // {
    //     "studentId": 4,
    //     "taskId": 3,
    //     "score": 8
    // }
    if (
        !req.body?.studentId ||
        !req.body?.taskId ||
        !req.body?.type ||
        !req.body?.score
    )
        return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
            message: 'Missing required data',
        });
    try {
        const getStorage = await storages.findOne({
            userId: req.body.studentId,
        });
        if (getStorage && getStorage instanceof storages) {
            if (req.body.type == 'lesson') {
                for (const val of getStorage.lessons) {
                    const getEssay = val?.essays.find(
                        (essayVal) => essayVal.idTask == req.body.taskId,
                    );
                    if (getEssay) {
                        getEssay.score = req.body.score;
                        break;
                    }
                }
            } else if (req.body.type == 'test') {
                for (const val of getStorage.tests) {
                    const getEssay = val?.essays.find(
                        (essayVal) => essayVal.idTask == req.body.taskId,
                    );
                    if (getEssay) {
                        getEssay.score = req.body.score;
                        break;
                    }
                }
            }

            await saveStorage(getStorage);
        }
        return makeSuccessResponse(res, StatusCodes.OK, {});
    } catch (error) {
        console.log('Error in markingEssay: ', error.message);
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
    studentSignout,
    handleSubmit,
    getSubmitted,
    markingEssay,
    getStudents,
};
