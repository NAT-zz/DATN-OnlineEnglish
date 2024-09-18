import { makeSuccessResponse } from '../../utils/Response.js';
import grammars from '../../models/grammars.mongo.js';
import { findRandomTasks } from '../../models/grammars.model.js';
import { GRAMMAR_TYPE, QUESTION_TYPE, SKILLS } from '../../utils/Constants.js';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

const getRandomGrammar = async (topic, type, number) => {
    let listTasks = null;
    console.log(topic.toUpperCase());
    if (topic === 'random')
        listTasks = await findRandomTasks(
            {
                questionType: type.toUpperCase(),
            },
            number,
        );
    else
        listTasks = await findRandomTasks(
            {
                questionType: type.toUpperCase(),
                grammarType: topic.toUpperCase(),
            },
            number,
        );
    return listTasks;
};

const checkGrammarAnswer = async (type, data) => {
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
        const getSentence = await grammars.findOne({
            id: val.id,
        });

        if (getSentence) {
            if (getSentence.key === val.answer) correctResult.push(val.id);
            else wrongResult.push(val.id);
        }
    }
    return {
        correctResult,
        wrongResult,
    };
};

const getRandomTasks = async (req, res) => {
    try {
        const skill = req.params.skill;
        const type = req.params.type;
        const number = req.params.number;
        const topic = req.params.topic;

        if (!skill || !type || !topic || !number)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Type or quantity or topic must be provided',
            });
        if (!(skill.toUpperCase() in SKILLS))
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Skill not found',
            });
        if (!(type.toUpperCase() in QUESTION_TYPE))
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Type not found',
            });
        if (topic != 'random' && !(topic.toUpperCase() in GRAMMAR_TYPE))
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Topic not found',
            });

        switch (skill.toUpperCase()) {
            case SKILLS.GRAMMAR:
                const listTasks = await getRandomGrammar(topic, type, number);
                if (listTasks)
                    return makeSuccessResponse(res, StatusCodes.OK, {
                        data: listTasks,
                    });
                else
                    return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                        message: 'No record found',
                    });
            case SKILLS.VOCABULARY:
                break;
            case SKILLS.LISTENING:
                break;
            case SKILLS.READING:
                break;
            case SKILLS.SPEAKING:
                break;
            case SKILLS.WRITING:
                break;
            default:
                throw new Error('No skill found');
        }
    } catch (err) {
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: err.message,
        });
    }
};

const checkAnswers = async (req, res) => {
    try {
        const skill = req.params.skill;
        const type = req.params.type;

        if (!skill || !type)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Skill or type must be provided',
            });
        if (!(skill.toUpperCase() in SKILLS))
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Skill not found',
            });
        if (!(type.toUpperCase() in QUESTION_TYPE))
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Type not found',
            });

        switch (skill.toUpperCase()) {
            case SKILLS.GRAMMAR:
                if (!req.body.data || req.body.data.length === 0)
                    return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                        message: 'No data found',
                    });
                const result = await checkGrammarAnswer(type, req.body.data);
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
            default:
                throw new Error('No skill found');
        }
    } catch (err) {
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: err.message,
        });
    }
};

const createGrammar = async (req, res) => {
    try {
        if (!req.body.data)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Data not found',
            });
        const data = req.body.data;
    } catch (error) {
        console.log(error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message,
        });
    }
};

const deleteGrammar = async (req, res) => {
    try {
        if (!req.params.skill || !req.params.id)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Skill and id must be provided',
            });
        const skill = req.params.skill;
        const reqId = req.params.id;
        if (!(skill.toUpperCase() in SKILLS))
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Skill not found',
            });

        switch (skill.toUpperCase()) {
            case SKILLS.GRAMMAR:
                const deletedCount = (await grammars.deleteOne({ id: reqId }))
                    .deletedCount;
                if (deletedCount)
                    return makeSuccessResponse(res, StatusCodes.OK, {
                        message: `Delete successfully with id ${reqId}`,
                    });
                return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                    message: `No sentence found with id: ${reqId}`,
                });
            default:
                return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                    message: `${skill} not found`,
                });
        }
    } catch (error) {
        console.log(error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message,
        });
    }
};

const getGrammar = async (req, res) => {
    try {
        if (!req.params.skill || !req.params.id)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Skill and id must be provided',
            });
        const skill = req.params.skill;
        const reqId = req.params.id;
        if (!(skill.toUpperCase() in SKILLS))
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Skill not found',
            });

        switch (skill.toUpperCase()) {
            case SKILLS.GRAMMAR:
                const findGrammar = await grammars.findOne(
                    { id: reqId },
                    '-_id -__v -r',
                );
                if (findGrammar instanceof grammars && grammars)
                    return makeSuccessResponse(res, StatusCodes.OK, {
                        data: findGrammar,
                    });
                return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                    message: `No sentence found with id: ${reqId}`,
                });
            default:
                return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                    message: `${skill} not found`,
                });
        }
    } catch (error) {
        console.log(error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message,
        });
    }
};

export {
    getRandomTasks,
    checkAnswers,
    createGrammar,
    deleteGrammar,
    getGrammar,
};
