import { makeSuccessResponse } from '../../utils/Response.js';
import { StatusCodes } from 'http-status-codes';
import tasks from '../../models/tasks.mongo.js';
import questions from '../../models/questions.mongo.js';
import { findMaxId, saveTask } from '../../models/tasks.model.js';
import { RIGHT_TYPE, TASK_TYPE } from '../../utils/Constants.js';

import {
    addToStorage,
    deleteFromStorage,
    filterData,
} from '../../utils/Strorage.js';

const getTasks = async (req, res) => {
    const topic = req.query.topic;
    const type = req.query.type?.toUpperCase();

    try {
        let getTasks;
        if (topic && type) {
            getTasks = await tasks.find(
                {
                    topic,
                    taskType: type,
                },
                '-r -__v',
            );
        } else if (topic) {
            getTasks = await tasks.find(
                {
                    topic,
                },
                '-r -__v',
            );
        } else if (type) {
            getTasks = await tasks.find(
                {
                    taskType: type,
                },
                '-r -__v',
            );
        } else {
            getTasks = await tasks.find({}, '-r -__v');
        }

        let data = await Promise.all(
            getTasks.map(async (task) => {
                let listQuestion = [];
                for (const id of task.questions) {
                    let getQuestion = await questions.findOne(
                        { id },
                        '-r -__v',
                    );
                    if (getQuestion && getQuestion instanceof questions) {
                        listQuestion.push(getQuestion);
                    }
                }
                return {
                    ...task._doc,
                    questions: listQuestion,
                };
            }),
        );

        data = await filterData(req.userData.id, data, RIGHT_TYPE.task);

        return makeSuccessResponse(res, StatusCodes.OK, {
            data,
        });
    } catch (error) {
        console.log('Error in getTasks: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const deleteTask = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
            message: 'Task ID is required.',
        });
    }
    try {
        const deleteTask = (
            await tasks.deleteOne({
                id: id,
            })
        ).deletedCount;
        if (deleteTask) {
            await deleteFromStorage(req.userData.id, id, RIGHT_TYPE.task);
            return makeSuccessResponse(res, StatusCodes.OK, {
                message: `Task deleted with id ${id}`,
            });
        } else
            return makeSuccessResponse(res, StatusCodes.NOT_FOUND, {
                message: 'Task not found.',
            });
    } catch (error) {
        console.log('Error in deleteTask: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const createTask = async (req, res) => {
    const id = req.query.updateId;
    try {
        const type = req.body.taskType?.toUpperCase();
        if (type && !(type in TASK_TYPE))
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Invalid task type',
            });

        if (id) {
            const findTask = await tasks.findOne({ id });
            if (findTask && findTask instanceof tasks) {
                findTask.task = req.body?.task
                    ? req.body.task.trim()
                    : findTask.task;
                findTask.questions = req.body?.questions
                    ? req.body.questions
                    : findTask.questions;
                findTask.topic = req.body?.topic
                    ? req.body.topic.trim()
                    : findTask.topic;
                findTask.taskType = type ? type : findTask.taskType;
                findTask.media = req.body?.media
                    ? req.body.media.trim()
                    : findTask.media;

                await findTask.save();
                return makeSuccessResponse(res, StatusCodes.OK, {
                    message: `Task updated with id ${id}`,
                    data: { ...findTask?._doc, r: undefined },
                });
            } else
                return makeSuccessResponse(res, StatusCodes.NOT_FOUND, {
                    message: `Task not found with id ${id}`,
                });
        } else {
            if (!req.body.task) {
                return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                    message: 'Missing task',
                });
            } else {
                let task = {
                    task: req.body.task.trim(),
                    questions: req.body?.questions,
                    topic: req.body?.topic,
                    taskType: req.body?.taskType,
                    media: req.body?.media,
                };

                const newTask = await tasks.create({
                    id: Number((await findMaxId()) + 1),
                    task: task.task,
                    topic: task?.topic,
                    questions: task?.questions,
                    taskType: task?.taskType,
                    media: task?.media,
                });
                if (!(newTask && newTask instanceof tasks))
                    throw new Error('Unable to create new Task!');

                await addToStorage(
                    req.userData.id,
                    newTask.id,
                    RIGHT_TYPE.task,
                );

                return makeSuccessResponse(res, StatusCodes.OK, {
                    message: 'Task created',
                    data: { ...newTask._doc, r: undefined },
                });
            }
        }
    } catch (error) {
        console.log('Error in create-updateTask: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

export { getTasks, createTask, deleteTask };
