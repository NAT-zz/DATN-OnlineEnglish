import { readFileSync } from 'fs';
import path from 'path';
import { QUESTION_TYPE } from '../utils/Constants.js';
import questions from './questions.mongo.js';

const __dirname = path.resolve();
const findMaxId = async () => {
    const latestQuestion = await questions.findOne().sort('-id');

    if (!latestQuestion && !(latestQuestion instanceof questions)) {
        return 0;
    }
    return latestQuestion.id;
};

const saveSelect = async (question) => {
    try {
        let getQuestion = await questions.findOne({
            sentence: question?.sentence,
            answers: question?.answers
        });

        if (getQuestion instanceof questions && getQuestion) {
            getQuestion.key = question?.key ? question.key : getQuestion.key;
            getQuestion.answers = question?.answers
                ? question.answers
                : getQuestion.answers;
            getQuestion.questionType = question?.questionType
                ? question.questionType
                : getQuestion.questionType;
            getQuestion.media = question?.media
                ? question.media
                : getQuestion.media;

            await getQuestion.save();
            return getQuestion.id;
        } else {
            getQuestion = await questions.create({
                id: Number((await findMaxId()) + 1),
                sentence: question.sentence,
                key: question.key,
                answers: question.answers,
                questionType: question.questionType,
                media: question.media,
            });
            if (getQuestion instanceof questions && getQuestion)
                return getQuestion;
            throw new Error('Unable to create new Question!');
        }
    } catch (err) {
        console.error(err.message);
    }
};

const saveQuestion = async (question) => {
    try {
        if (question.questionType.toUpperCase() in QUESTION_TYPE) {
            return await saveSelect(question);
        } else
            throw new Error(`Question type not found: ${question.questionType}`);
    } catch (error) {
        console.log('Error in saving question: ' + error.message);
    }
};

const initDataQuestion = async () => {
    console.log('Init questions started');
    const json = readFileSync(path.join(__dirname, 'src/data/question.json'));
    const readQuestions = JSON.parse(json.toString());
    for (const prop in readQuestions) {
        await saveQuestion(readQuestions[prop]);
    }
};

const findRandomQuestions = async (filter, limit) => {
    return await questions.findRandom(filter, '-_id -__v -r').limit(limit);
};

export { initDataQuestion, findMaxId, findRandomQuestions, saveQuestion };
