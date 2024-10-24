import { makeSuccessResponse } from '../../utils/Response.js';
import questions from '../../models/questions.mongo.js';
import { QUESTION_TYPE } from '../../utils/Constants.js';
import { StatusCodes } from 'http-status-codes';
import {
    findRandomQuestions,
    saveQuestion,
} from '../../models/questions.model.js';

const getQuestion = async (req, res) => {
    try {
        const type = req.query.type;
        if (type) {
            if (!(type.toUpperCase() in QUESTION_TYPE))
                return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                    message: 'Type not found',
                });
            const getQuestion = await questions.find(
                {
                    questionType: type.toUpperCase(),
                },
                '-_id -__v -r',
            );
            return makeSuccessResponse(res, StatusCodes.OK, {
                data: getQuestion,
            });
        } else {
            const getAllQuestions = await questions.find({}, '-_id -__v -r');
            return makeSuccessResponse(res, StatusCodes.OK, {
                data: getAllQuestions,
            });
        }
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
    try {
        const id = req.query.updateId;
        // update
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
                findQuestion.questionType = req.body?.questionType
                    ? req.body.questionType
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

            if (
                !req.body.sentence ||
                !req.body.questionType ||
                !req.body.answers ||
                !req.body.key
            ) {
                return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                    message: 'Missing required information',
                });
            }
            if (!(req.body.questionType in QUESTION_TYPE))
                return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                    message: 'Invalid question type',
                });

            let question = {
                sentence: req.body.sentence.trim(),
                questionType: req.body?.questionType?.toUpperCase(),
                answers: req.body?.answers,
                key: req.body?.key,
                media: req.body?.media,
            };

            const newQuestion = await saveQuestion(question);
            return makeSuccessResponse(res, StatusCodes.CREATED, {
                message: 'Question created/updated',
                data: { ...newQuestion?._doc, r: undefined },
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

const checkAnswers = async (req, res) => {
    try {
        if (!req.body.data || req.body.data.length === 0)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'No data found',
            });
        const result = await checkQuestionAnswer(req.body.data);
        // Total score is 1 out of 8 (13%)
        if (result) {
            const percent = (
                (result.correctResult.length / req.body.data.length) *
                100
            ).toFixed();
            return makeSuccessResponse(res, StatusCodes.OK, {
                message: `Total score is ${result.correctResult.length} out of ${req.body.data.length} (${percent}%)`,
                data: result,
            });
        } else
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'No result',
            });
    } catch (err) {
        console.log('Error in checkAnswers: ', err.message);
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
    checkAnswers,
};
