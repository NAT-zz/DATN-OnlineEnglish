import { StatusCodes } from 'http-status-codes';
import { findMaxId } from '../../models/lessons.model.js';
import lessons from '../../models/lessons.mongo.js';
import questions from '../../models/questions.mongo.js';
import tasks from '../../models/tasks.mongo.js';
import { LESSON_TYPE, RIGHT_TYPE } from '../../utils/Constants.js';
import { makeSuccessResponse } from '../../utils/Response.js';
import {
    addToStorage,
    deleteFromStorage,
    filterData,
    getResult,
} from '../../utils/Strorage.js';

const getLessons = async (req, res) => {
    const topic = req.query.topic;
    const type = req.query.type?.toUpperCase();

    try {
        let getLessons;
        if (topic && type)
            getLessons = await lessons.find(
                {
                    topic,
                    type,
                },
                '-r -__v',
            );
        else if (topic)
            getLessons = await lessons.find(
                {
                    topic,
                },
                '-r -__v',
            );
        else if (type)
            getLessons = await lessons.find(
                {
                    type,
                },
                '-r -__v',
            );
        else getLessons = await lessons.find({}, '-r -__v');

        const data = await filterData(
            req.userData.id,
            getLessons,
            RIGHT_TYPE.lesson,
        );

        return makeSuccessResponse(res, StatusCodes.OK, {
            data,
        });
    } catch (error) {
        console.log('Error in getLesson: ', error.message);
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
                message: 'Missing lesson Id',
            });
        const getLesson = await lessons.findOne({ id }, '-r -__v');
        if (getLesson && getLesson instanceof lessons) {
            let listTask = [];
            for (const id of getLesson.tasks) {
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

            let result;
            if (req.userData.role == ROLES.STUDENT)
                result = await getResult(req.userData.id, 'lesson', id);

            return makeSuccessResponse(res, StatusCodes.OK, {
                data: {
                    ...getLesson._doc,
                    tasks: listTask,
                    result: result ? result : [],
                },
            });
        } else {
            return makeSuccessResponse(res, StatusCodes.NOT_FOUND, {
                message: `Lesson not found with id ${id}`,
            });
        }
    } catch (err) {
        console.log('Error in getDetail: ', err.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const deleteLesson = async (req, res) => {
    const id = req.params.id;
    try {
        if (!id)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Missing required data',
            });
        const deleteCount = (await lessons.deleteOne({ id })).deletedCount;
        if (deleteCount > 0) {
            await deleteFromStorage(req.userData.id, id, RIGHT_TYPE.lesson);
            return makeSuccessResponse(res, StatusCodes.OK, {
                message: `Lesson deleted with id ${id}`,
            });
        } else {
            return makeSuccessResponse(res, StatusCodes.NOT_FOUND, {
                message: 'Lesson not found',
            });
        }
    } catch (error) {
        console.log('Error in deleteLesson: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const createLesson = async (req, res) => {
    const id = req.query.updateId;
    try {
        const type = req.body.type?.toUpperCase();
        if (type && !(type in LESSON_TYPE)) {
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Invalid lesson type',
            });
        }
        if (id) {
            const findLesson = await lessons.findOne({ id });
            if (findLesson && findLesson instanceof lessons) {
                findLesson.topic = req.body?.topic
                    ? req.body.topic.trim()
                    : findLesson.topic;
                findLesson.content = req.body?.content
                    ? req.body.content.trim()
                    : findLesson.content;
                findLesson.tasks = req.body?.tasks
                    ? req.body.tasks
                    : findLesson.tasks;
                findLesson.media = req.body?.media
                    ? req.body.media
                    : findLesson.media;
                findLesson.type = type ? type : findLesson.type;
                findLesson.publicDate = req.body?.publicDate
                    ? req.body.publicDate
                    : findLesson.publicDate;
                findLesson.taskEndDate = req.body?.taskEndDate
                    ? req.body.taskEndDate
                    : findLesson.taskEndDate;

                await findLesson.save();
                return makeSuccessResponse(res, StatusCodes.OK, {
                    message: `Lesson updated with id ${id}`,
                    data: { ...findLesson._doc, r: undefined },
                });
            } else {
                return makeSuccessResponse(res, StatusCodes.NOT_FOUND, {
                    message: `Lesson not found with id ${id}`,
                });
            }
        } else {
            if (!req.body.topic) {
                return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                    message: 'Topic is required',
                });
            }

            let lesson = {
                topic: req.body.topic,
                content: req.body?.content,
                tasks: req.body?.tasks,
                media: req.body?.media,
                type: type,
                publicDate: req.body?.publicDate,
                taskEndDate: req.body?.taskEndDate,
            };

            const newLesson = await lessons.create({
                id: Number((await findMaxId()) + 1),
                topic: lesson.topic,
                content: lesson?.content,
                tasks: lesson?.tasks,
                media: lesson?.media,
                publicDate: lesson?.publicDate,
                taskEndDate: lesson?.taskEndDate,
                type: lesson?.type,
            });
            if (!(newLesson && newLesson instanceof lessons))
                throw new Error('Unable to create new Lesson!');

            await addToStorage(
                req.userData.id,
                newLesson.id,
                RIGHT_TYPE.lesson,
            );

            return makeSuccessResponse(res, StatusCodes.OK, {
                message: 'Lesson created',
                data: { ...newLesson._doc, r: undefined },
            });
        }
    } catch (err) {
        console.log('Error in createLesson: ', err.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

export { createLesson, deleteLesson, getLessons, getDetail };
