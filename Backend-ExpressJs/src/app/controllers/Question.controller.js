import { makeSuccessResponse } from '../../utils/Response.js';
import questions from '../../models/questions.mongo.js';
import { QUESTION_TYPE } from '../../utils/Constants.js';
import { StatusCodes } from 'http-status-codes';
import {
    findRandomQuestions,
    saveSelect,
} from '../../models/questions.model.js';

import { addToStorage, filterData } from '../../utils/Strorage.js';

const getQuestion = async (req, res) => {
    try {
        const type = req.query.type?.toUpperCase();
        let data;
        if (type) {
            data = await questions.find(
                {
                    questionType: type,
                },
                '-_id -__v -r',
            );
        } else {
            data = await questions.find({}, '-_id -__v -r');
        }

        // data = await filterData(req.userData.id, data, 'question');

        return makeSuccessResponse(res, StatusCodes.OK, {
            data,
        });
    } catch (error) {
        console.log('Error in getting questions: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Question Id must be provided',
            });
        }
        const deletedCount = (await questions.deleteOne({ id: id }))
            .deletedCount;
        if (deletedCount)
            return makeSuccessResponse(res, StatusCodes.OK, {
                message: `Question deleted with id ${id}`,
            });
        else
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: `No question found with id: ${id}`,
            });
    } catch (error) {
        console.log('Error in deleteQuestion: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const createQuestion = async (req, res) => {
    const id = req.query.updateId;
    try {
        const type = req.body?.questionType?.toUpperCase();
        if (type && !(type in QUESTION_TYPE))
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Invalid question type',
            });
        if (id) {
            const findQuestion = await questions.findOne({ id: id });
            if (findQuestion && findQuestion instanceof questions) {
                findQuestion.sentence = req.body?.sentence
                    ? req.body.sentence.trim()
                    : findQuestion.sentence;
                findQuestion.answers = req.body?.answers
                    ? req.body.answers
                    : findQuestion.answers;
                findQuestion.key = req.body?.key
                    ? req.body.key.trim()
                    : findQuestion.key;
                findQuestion.questionType = type
                    ? type
                    : findQuestion.questionType;
                findQuestion.media = req.body?.media
                    ? req.body.media
                    : findQuestion.media;

                await findQuestion.save();
                return makeSuccessResponse(res, StatusCodes.OK, {
                    message: `Question updated with id {id}`,
                    data: { ...findQuestion._doc, r: undefined },
                });
            } else {
                return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                    message: `No question found with id: ${id}`,
                });
            }
        } else {
            // create
            // add teacher id

            if (!req.body.sentence || !req.body.answers || !req.body.key) {
                return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                    message: 'Missing required information',
                });
            }

            let question = {
                sentence: req.body.sentence.trim(),
                answers: req.body.answers,
                key: req.body.key,
                questionType: type,
                media: req.body?.media,
            };

            const newQuestion = await saveSelect(question);
            return makeSuccessResponse(res, StatusCodes.CREATED, {
                message: 'Question created/updated',
                data: { ...newQuestion, r: undefined },
            });
        }
    } catch (error) {
        console.log('Error in create-updateQuestion: ', error.message, error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const getRandomQuestions = async (req, res) => {
    try {
        const type = req.params?.type;
        const limit = req.query?.limit || 3;

        if (!type || !(type.toUpperCase() in QUESTION_TYPE))
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Please provide a correct question type',
            });

        const listQuestion = await findRandomQuestions(
            {
                questionType: type.toUpperCase(),
            },
            limit,
        );
        return makeSuccessResponse(res, StatusCodes.OK, {
            data: listQuestion,
        });
    } catch (err) {
        console.log('Error in getRandomQuestions: ', err.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

export {
    getQuestion,
    createQuestion,
    deleteQuestion,
    getRandomQuestions,
};
