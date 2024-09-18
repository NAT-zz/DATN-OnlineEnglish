import { makeSuccessResponse } from '../../utils/Response.js';
import {
    GRAMMAR_TYPE,
    QUESTION_TYPE,
    SKILLS,
    COURSE,
    TASK_TYPE,
} from '../../utils/Constants.js';
import { StatusCodes } from 'http-status-codes';
import topics from '../../models/topics.mongo.js';
import grammars from '../../models/grammars.mongo.js';
import medias from '../../models/medias.mongo.js';
import users from '../../models/users.mongo.js';

import { saveTopic } from '../../models/topics.model.js';
import { streamUpload } from '../../models/medias.model.js';
import { saveMedia } from '../../models/medias.model.js';
import { saveGrammar } from '../../models/grammars.model.js';

const getTopics = async (req, res) => {
    try {
        if (!req.params.skill || !req.params.level)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Skill and level must be provided',
            });
        const skill = req.params.skill;
        const level = req.params.level;

        if (!(skill.toUpperCase() in SKILLS))
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Skill not found',
            });
        if (!(level.toUpperCase() in COURSE))
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Level not found',
            });
        const limit = req.query.limit || 0;
        const skip = req.query.skip || 0;

        const getTopics = await topics.find(
            {
                topicSkill: skill.toUpperCase(),
                level: level.toUpperCase(),
            },
            '-_id -__v -r -tasks -media -preparationTask',
            {
                limit,
                skip: skip * limit,
            },
        );
        if (getTopics.length >= 1)
            return makeSuccessResponse(res, StatusCodes.OK, {
                data: getTopics,
            });
        return makeSuccessResponse(res, StatusCodes.OK, {
            message: 'No topics found',
            data: {},
        });
    } catch (error) {
        console.log(error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message,
        });
    }
};

const getTopicById = async (req, res) => {
    try {
        if (!req.params.id)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Id must be provided',
            });
        const reqId = req.params.id;
        const getTopic = await topics.findOne({ id: reqId }, '-_id -__v -r');
        if (getTopic instanceof topics && getTopic) {
            const objBeaty = {
                name: getTopic.name,
                preview: getTopic.preview,
                topicSkill: getTopic.topicSkill,
                level: getTopic.level,
                instruction: getTopic.instruction,
                preparationTask: getTopic?.preparationTask
                    ? getTopic.preparationTask
                    : null,
                tasks: [],
                medias: [],
                provider: null,
            };
            if (getTopic.preparationTask) {
                const getPre = await grammars.findOne(
                    { id: getTopic.preparationTask },
                    '-_id -__v -r',
                );
                if (getPre instanceof grammars && getPre)
                    objBeaty.preparationTask = getPre;
            }
            if (getTopic.tasks.length > 0) {
                for (const val of getTopic.tasks) {
                    let getTask = await grammars.findOne(
                        { id: val },
                        '-_id -__v -r',
                    );
                    if (getTask instanceof grammars && getTask)
                        objBeaty.tasks.push(getTask);
                }
            }
            if (getTopic.media.length > 0) {
                for (const val of getTopic.media) {
                    let getMedia = await medias.findOne(
                        { id: val },
                        '-_id -__v -r',
                    );
                    if (getMedia instanceof medias && getMedia)
                        objBeaty.medias.push(getMedia);
                }
            }
            if (getTopic.idProvider) {
                const getUser = await users.findOne({
                    id: getTopic.idProvider,
                });
                if (getUser instanceof users && getUser)
                    objBeaty.provider = {
                        fullname: getUser.fullName,
                        avatar: getUser.avatar,
                    };
            }
            return makeSuccessResponse(res, StatusCodes.OK, {
                data: objBeaty,
            });
        }
        return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
            message: `Topic not found with id ${reqId}`,
        });
    } catch (error) {
        console.log(error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message,
        });
    }
};

const deleteTopic = async (req, res) => {
    try {
        if (!req.params.id)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Id must be provided',
            });
        const reqId = req.params.id;
        const getTopic = await topics.findOne({ id: reqId });
        if (getTopic instanceof topics && getTopic) {
            if (getTopic.media.length > 0) {
                for (const idMedia of getTopic.media)
                    await medias.deleteOne({ id: idMedia });
            }
            if (getTopic.tasks.length > 0) {
                for (const idTask of getTopic.tasks)
                    await grammars.deleteMany({ id: idTask });
            }
            if (getTopic.preparationTask)
                await grammars.deleteOne({ id: getTopic.preparationTask });

            const deletedCount = await getTopic.delete();
            return makeSuccessResponse(res, StatusCodes.OK, {
                message: `Topic with id ${reqId} has been deleted successfully`,
            });
        }

        return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
            message: `Cannot find topic with id ${reqId}`,
        });
    } catch (error) {
        console.log(error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message,
        });
    }
};

const createTopic = async (req, res) => {
    try {
        if (
            !req.body.name ||
            !req.body.preview ||
            !req.body.topicSkill ||
            !req.body.instruction ||
            !req.body.level
        )
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Missing required data',
            });
        const data = req.body;
        if (!(data.topicSkill.toUpperCase() in SKILLS))
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: `Skill not found`,
            });
        if (!(data.level.toUpperCase() in COURSE))
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Level not found',
            });
        if (!req.userData)
            return makeSuccessResponse(res, StatusCodes.UNAUTHORIZED, {
                message: 'You must login first',
            });
        const getUser = await users.findOne({ userName: req.userData.sub });
        let idUser = null;
        if (getUser instanceof users && getUser) idUser = getUser.id;
        else
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'User not found',
            });

        let titlePictureLink = null,
            transcriptLink = null,
            audioLink = null,
            uploadFile = null;
        if (req?.files?.titlePicture) {
            uploadFile = await streamUpload(req.files.titlePicture[0]);
            if (uploadFile) titlePictureLink = uploadFile.url;
        }
        if (req?.files?.transcript) {
            uploadFile = await streamUpload(req.files.transcript[0]);
            if (uploadFile) transcriptLink = uploadFile.url;
        }
        if (req?.files?.audio) {
            uploadFile = await streamUpload(req.files.audio[0]);
            if (uploadFile) audioLink = uploadFile.url;
        }

        const mediaId = await saveMedia({
            titlePicture: titlePictureLink,
            transcript: transcriptLink,
            audio: audioLink,
        });

        if (mediaId) {
            const topicId = await saveTopic({
                name: data.name,
                preview: data.preview,
                topicSkill: data.topicSkill.toUpperCase(),
                level: data.level.toUpperCase(),
                instruction: data.instruction,
                media: mediaId,
                idProvider: getUser.id,
            });

            if (topicId)
                return makeSuccessResponse(res, StatusCodes.OK, {
                    data: topicId,
                });
        }
        throw new Error('Something went wrong!');
    } catch (error) {
        console.log(error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message,
        });
    }
};

const editTopic = async (req, res) => {
    try {
    } catch (error) {
        console.log(error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message,
        });
    }
};

const handleTasks = (task) => {
    try {
        if (!(task?.questionType?.toUpperCase() in QUESTION_TYPE))
            throw new Error('Question type not found');
        if (!task.sentence || !task.key || !task.answers)
            throw new Error('Missing required information');

        task.questionType = task.questionType.toUpperCase();
        Object.assign(task, {
            grammarType: GRAMMAR_TYPE.ANY,
            media: null,
            taskType: TASK_TYPE.FOR_TOPIC,
        });
        return { task: task };
    } catch (error) {
        console.log(error);
        return { error: error.message };
    }
};

const addTasksToTopic = async (req, res) => {
    try {
        if (!req.params.id)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Topic id must be provided',
            });
        const id = req.params.id;
        if (!req.body.data)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'No data found',
            });
        const getTopic = await topics.findOne({ id: id });
        if (!(getTopic instanceof topics && getTopic))
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: `Topic not found with id ${id}`,
            });
        const data = req.body.data;
        if (!data.preparationTask || !data.tasks)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Missing tasks',
            });
        const preparationTask = data.preparationTask;
        const tasks = data.tasks;

        const fixedPreTask = handleTasks(preparationTask);
        if (fixedPreTask.error)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: fixedPreTask.error,
            });

        const preTaskId = await saveGrammar(fixedPreTask.task);
        if (preTaskId) getTopic.preparationTask = preTaskId;
        else throw new Error(`Cannot save preparation task`);

        for (const val of tasks) {
            const fixedTask = handleTasks(val);
            if (fixedTask.error)
                return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                    message: fixedTask.error,
                });

            const taskId = await saveGrammar(fixedTask.task);
            if (!getTopic.tasks.includes(taskId)) getTopic.tasks.push(taskId);
        }
        await getTopic.save();
        return makeSuccessResponse(res, StatusCodes.OK, {
            message: `Task has been added to topic successfully`,
        });
    } catch (error) {
        console.log(error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message,
        });
    }
};

// rate
const rate = async (req, res) => {
    try {
        if (!req.params.topicId || !req.params.rateCount)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Missing required params',
            });
        const topicId = req.params.topicId;
        const rateCount = req.params.rateCount;
    } catch (error) {
        console.log(error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message,
        });
    }
};

export {
    getTopics,
    getTopicById,
    deleteTopic,
    createTopic,
    addTasksToTopic,
    rate,
    editTopic,
};
