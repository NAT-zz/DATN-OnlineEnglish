import { makeSuccessResponse } from '../../utils/Response.js';
import { StatusCodes } from 'http-status-codes';
import tests from '../../models/tests.mongo.js';
import tasks from '../../models/tasks.mongo.js';
import questions from '../../models/questions.mongo.js';
import { saveTest } from '../../models/tests.model.js';
import { getResult } from '../../utils/Strorage.js';

const getTests = async (req, res) => {
    try {
        const getAll = await tests.find();

        return makeSuccessResponse(res, StatusCodes.OK, {
            data: getAll,
        });
    } catch (error) {
        console.log('Error in getTests: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const getDetail = async (req, res) => {
    const id = req.params.id;
    try {
        if (!id)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Missing id',
            });

        const getTest = await tests.findOne({ id }, '-r -__v');
        if (getTest && getTest instanceof tests) {
            let listTask = [];
            for (const id of getTest.tasks) {
                let getTask = await tasks.findOne({ id }, '-r -__v');
                let dataQuestion = [];
                if (getTask && getTask instanceof tasks) {
                    let listQuestion = [];

                    for (const questionId of getTask.questions) {
                        let getQuestion = await questions.findOne(
                            { id: questionId },
                            '-r -__v',
                        );
                        if (getQuestion && getQuestion instanceof questions) {
                            listQuestion.push(getQuestion);
                        }
                    }
                    dataQuestion = {
                        ...getTask._doc,
                        questions: listQuestion,
                    };
                }
                listTask.push(dataQuestion);
            }

            // const result = await getResult(req.userData.id, 'test', id);


            return makeSuccessResponse(res, StatusCodes.NOT_FOUND, {
                data: {
                    ...getTest._doc,
                    tasks: listTask,
                    // result: result ? result : []
                },
            });
        } else {
            return makeSuccessResponse(res, StatusCodes.NOT_FOUND, {
                message: `Test not found with id ${id}`,
            });
        }
    } catch (err) {
        console.log('Error in getDetail: ', err.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const deleteTest = async (req, res) => {
    const id = req.params.id;
    try {
        if (!id)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Missing id',
            });
        const deleteCount = (await tests.deleteOne({ id })).deletedCount;

        if (deleteCount > 0) {
            return makeSuccessResponse(res, StatusCodes.OK, {
                message: `Test ${id} deleted `,
            });
        }

        return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
            message: `Test not found with id ${id}`,
        });
    } catch (error) {
        console.log('Error in deleteTest: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const createTest = async (req, res) => {
    const id = req.query.updateId;
    try {
        if (id) {
            const getTest = await tests.findOne({ id });
            if (getTest && getTest instanceof tests) {
                getTest.name = req.body?.name ? req.body.name : getTest.name;
                getTest.tasks = req.body?.tasks
                    ? req.body.tasks
                    : getTest.tasks;
                getTest.publicDate = req.body?.publicDate
                    ? req.body.publicDate
                    : getTest.publicDate;
                getTest.endDate = req.body?.endDate
                    ? req.body.endDate
                    : getTest.endDate;
                getTest.time = req.body?.time ? req.body.time : getTest.time;

                await getTest.save();
                return makeSuccessResponse(res, StatusCodes.OK, {
                    message: 'Test updated',
                    data: getTest,
                });
            } else {
                return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                    message: `Test not found with id ${id}`,
                });
            }
        } else {
            if (!req.body.name) {
                return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                    message: 'Missing test name',
                });
            }

            let newTest = {
                name: req.body.name,
                tasks: req.body?.tasks,
                publicDate: req.body?.publicDate,
                endDate: req.body?.endDate,
                time: req.body?.time,
            };

            newTest = await saveTest(newTest);
            return makeSuccessResponse(res, StatusCodes.OK, {
                message: 'Test created',
                data: newTest,
            });
        }
    } catch (error) {
        console.log('Error in createTest: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

export { getTests, createTest, deleteTest, getDetail };
