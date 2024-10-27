import { makeSuccessResponse } from '../../utils/Response.js';
import { StatusCodes } from 'http-status-codes';
import lessons from '../../models/lessons.mongo.js';
import classes from '../../models/classes.mongo.js';
import tests from '../../models/tests.mongo.js';
import { saveClass } from '../../models/classes.model.js';

import { filterData, addToStorage } from '../../utils/Strorage.js';

const getClasses = async (req, res) => {
    try {
        const getAll = await classes.find({});

        return makeSuccessResponse(res, StatusCodes.OK, {
            data: getAll,
        });
    } catch (error) {
        console.log('Error in getClasses: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const getClassAuth = async (req, req) => {
    try {
        const getAll = await classes.find({});
        const data = await filterData(req.userData.id, getAll, 'class');

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
export {
    getClasses,
    createClass,
    deleteClass,
    getDetail,
    getClassAuth,
    studentSignup,
};
