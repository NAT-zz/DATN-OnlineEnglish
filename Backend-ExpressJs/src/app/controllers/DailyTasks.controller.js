import axios from 'axios';
import { CONFIG } from '../../utils/Constants.js';
import dailyquestions from '../../models/dailyquestions.mongo.js';
import users from '../../models/users.mongo.js';
import { makeSuccessResponse } from '../../utils/Response.js';
import { StatusCodes } from 'http-status-codes';
import { generateQuestion } from './AI.controller.js';
import dailyRecord from '../../models/dailyrecords.mongo.js';

const findMaxId = async () => {
    const latestDailyQuestion = await dailyquestions.findOne().sort('-id');

    if (
        !latestDailyQuestion &&
        !(latestDailyQuestion instanceof dailyquestions)
    ) {
        return 0;
    }
    return latestDailyQuestion.id;
};

const getWordDefinition = async (word) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
        const response = await axios.get(url);
        const definitions = response.data[0].meanings.map((meaning) => ({
            partOfSpeech: meaning.partOfSpeech,
            definitions: meaning.definitions.map((def) => def.definition),
        }));

        // definitions.forEach((item, index) => {
        //     console.log(`\nPart of Speech: ${item.partOfSpeech}`);
        //     item.definitions.forEach((def, i) => {
        //         console.log(`${i + 1}. ${def}`);
        //     });
        // });

        let pronun;
        for (const phonetic of response.data[0].phonetics) {
            if (phonetic.audio.length > 0) {
                pronun = phonetic.audio;
                break;
            }
        }

        return {
            Pronunciations: pronun,
            Definition: `${response.data[0].phonetic} : ${definitions[0].definitions[0]}`,
        };
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error(`The word "${word}" was not found.`);
        } else {
            console.error('Error in getWordDefinition', error.message);
        }
        throw error;
    }
};

const fetchImageForWord = async (word) => {
    const url = `https://www.googleapis.com/customsearch/v1?q=${word}&searchType=image&key=${CONFIG.GOOGLE_API_KEY}&cx=${CONFIG.GOOGLE_SEARCH_ENGINE_ID}`;

    try {
        const response = await axios.get(url);
        const images = response.data.items.map((item) => item.link); // Array of image URLs
        // images.forEach((image, index) => console.log(`${index + 1}. ${image}`));

        return images[9];
    } catch (error) {
        console.error('Error fetching image:', error.message);
        throw error;
    }
};

const createQuestions = async (req, res) => {
    const words = req.body.wordlist;
    let data = [];

    try {
        for (const word of words) {
            const definition = await getWordDefinition(word);
            const image = await fetchImageForWord(word);
            let question = await generateQuestion(
                `Make a sentence with '${word}', answer me with the sentence only`,
            );

            question = question.replace(`${word}`, '-----');

            const getDaily = await dailyquestions.findOne({ word });

            if (getDaily && getDaily instanceof dailyquestions) {
                getDaily.definition = definition.Definition;
                getDaily.question = question;
                getDaily.imageLink = image;
                getDaily.pronounLink = definition.Pronunciations;

                await getDaily.save();
                data.push(getDaily);
            } else {
                const dailyQuestion = new dailyquestions({
                    id: (await findMaxId()) + 1,
                    word,
                    definition: definition.Definition,
                    question: question,
                    imageLink: image,
                    pronounLink: definition.Pronunciations,
                });
                await dailyQuestion.save();
                data.push(dailyQuestion);
            }
        }
        return makeSuccessResponse(res, StatusCodes.OK, {
            data,
        });
    } catch (error) {
        console.error('Error creating questions:', error.message);
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
    //         },
    //     ]
    // }
    if (data.length === 0) return false;
    for (const val of data) {
        const getOnedaily = await dailyquestions.findOne({
            id: val.id,
        });

        if (getOnedaily && getOnedaily instanceof dailyquestions) {
            if (getOnedaily.word != val.answer.trim()) return false;
        }
    }
    return true;
};

const checkAnswer = async (req, res) => {
    try {
        const getRecord = await dailyRecord.findOne({
            userId: req.userData.id,
        });
        if (!(getRecord && getRecord instanceof dailyRecord)) {
            throw new Error('Daily record not found');
        }
        console.log(req.body);

        if (getRecord.todayStatus) {
            return makeSuccessResponse(res, StatusCodes.NOT_ACCEPTABLE, {
                message: 'You have already answered today!',
            });
        }

        const submittedData = req.body.data;
        if (!submittedData) {
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Missing required information',
            });
        }

        if (!(await checkQuestionAnswer(submittedData))) {
            return makeSuccessResponse(res, StatusCodes.NOT_ACCEPTABLE, {
                message: 'Incorrect answers, try again!',
            });
        }

        getRecord.todayStatus = true;
        getRecord.progress += 5;

        await getRecord.save();

        // add 1 coin
        const getUser = await users.findOne({
            id: req.userData.id,
        });
        if (getUser && getUser instanceof users) {
            getUser.coin += 1;
            await getUser.save();
        }

        return makeSuccessResponse(res, StatusCodes.OK, {
            data: getRecord,
        });
    } catch (error) {
        console.error('Error in checkAnswer:', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const handleDailyStorage = async (userId) => {
    try {
        let userRecord = await dailyRecord.findOne({ userId });

        if (!(userRecord && userRecord instanceof dailyRecord)) {
            userRecord = new dailyRecord({
                userId,
            });
            await userRecord.save();
        }
        return userRecord;
    } catch (error) {
        console.error('Error in handleDailyStorage:', error.message);
        throw error;
    }
};

const getDaily = async (req, res) => {
    try {
        const userRecord = await handleDailyStorage(req.userData.id);

        let queryLimit = userRecord.progress;
        if (userRecord.todayStatus) queryLimit -= 5;

        const data = await dailyquestions.find().skip(queryLimit).limit(5);
        return makeSuccessResponse(res, StatusCodes.OK, {
            data: {
                questions: data,
                dailyRecord: userRecord,
            },
        });
    } catch (error) {
        console.error('Error in getDaily:', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

export { createQuestions, checkAnswer, getDaily, handleDailyStorage };
