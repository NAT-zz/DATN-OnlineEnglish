import { makeSuccessResponse } from '../../utils/Response.js';
import { StatusCodes } from 'http-status-codes';
import tasks from '../../models/tasks.mongo.js';
import questions from '../../models/questions.mongo.js';
import { saveTask } from '../../models/tasks.model.js';
import { TASK_TYPE } from '../../utils/Constants.js';

const getTasks = async (req, res) => {
    const topic = req.query.topic;
    try {
        let getTasks;
        if (topic) {
            getTasks = await tasks.find(
                {
                    topic,
                },
                '-r -__v',
            );
        } else {
            getTasks = await tasks.find({}, '-r -__v');
        }

        let data = await Promise.all(
            getTasks.map(async (task) => {
                // console.log(task);

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
                findTask.taskType = req.body?.taskType
                    ? req.body.taskType
                    : findTask.taskType;
                findTask.media = req.body?.media
                    ? req.body.media.trim()
                    : findTask.media;

                await findTask.save();
                return makeSuccessResponse(res, StatusCodes.OK, {
                    message: `Task updated with id ${id}`,
                    data: { ...findTask._doc, r: undefined },
                });
            } else
                return makeSuccessResponse(res, StatusCodes.NOT_FOUND, {
                    message: `Task not found with id ${id}`,
                });
        } else {
            if (!req.body.task || !req.body.questions) {
                return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                    message: 'Missing task or questions',
                });
            } else {
                if (req.body.taskType && !(req.body.taskType in TASK_TYPE))
                    return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                        message: 'Invalid task type',
                    });

                let task = {
                    task: req.body.task.trim(),
                    questions: req.body.questions,
                    topic: req.body?.topic?.trim(),
                    taskType: req.body?.taskType,
                    media: req.body?.media,
                };

                const newTask = await saveTask(task);
                return makeSuccessResponse(res, StatusCodes.OK, {
                    message: 'Task created/updated',
                    data: { ...newTask?._doc, r: undefined },
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
