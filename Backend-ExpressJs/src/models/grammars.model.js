import { readFileSync } from 'fs';
import path from 'path';
import grammars from './grammars.mongo.js';
import { QUESTION_TYPE } from '../utils/Constants.js';
import grammarsMongo from './grammars.mongo.js';

const __dirname = path.resolve();
const findMaxId = async () => {
    const latestGrammar = await grammars.findOne().sort('-id');

    if (!latestGrammar && !(latestGrammar instanceof grammars)) {
        return 0;
    }
    return latestGrammar.id;
};

const saveSelect = async (grammar) => {
    try {
        let getGrammar = await grammars.findOne({
            sentence: grammar?.sentence,
        });

        if (getGrammar instanceof grammars && getGrammar) {
            getGrammar.key = grammar?.key ? grammar.key : getGrammar.key;
            getGrammar.answers = grammar?.answers
                ? grammar.answers
                : getGrammar.answers;
            getGrammar.grammarType = grammar?.grammarType
                ? grammar.grammarType
                : getGrammar.grammarType;
            getGrammar.questionType = grammar?.questionType
                ? grammar.questionType
                : getGrammar.questionType;
            getGrammar.media = grammar?.media
                ? grammar.media
                : getGrammar.media;
            getGrammar.level = grammar?.level
                ? grammar.level
                : getGrammar.level;
            getGrammar.taskType = grammar?.taskType
                ? grammar.taskType
                : getGrammar.taskType;

            await getGrammar.save();
            return getGrammar.id;
        } else {
            getGrammar = await grammars.create({
                id: Number((await findMaxId()) + 1),
                sentence: grammar.sentence,
                key: grammar.key,
                answers: grammar.answers,
                grammarType: grammar.grammarType,
                questionType: grammar.questionType,
                media: grammar.media,
                level: grammar.level,
                taskType: grammar.taskType,
            });
            if (getGrammar instanceof grammars && getGrammar)
                return getGrammar.id;
            throw new Error('Unable to create new Grammar!');
        }
    } catch (err) {
        console.error(err.message);
    }
};

const saveGrammar = async (grammar) => {
    switch (grammar.questionType.toUpperCase()) {
        case QUESTION_TYPE.SELECT:
            return await saveSelect(grammar);
        default:
            throw Error('Question type not found');
    }
};

const initDataGrammar = async () => {
    console.log('Init grammar started');
    const json = readFileSync(path.join(__dirname, 'src/data/grammar.json'));
    const readGrammars = JSON.parse(json.toString());
    for (const prop in readGrammars) {
        await saveGrammar(readGrammars[prop]);
    }
};

const findRandomTasks = async (filter, limit) => {
    return await grammars.findRandom(filter, '-_id -__v -r').limit(limit);
};

export { initDataGrammar, findMaxId, findRandomTasks, saveGrammar };
