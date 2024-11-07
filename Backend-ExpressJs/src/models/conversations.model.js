import { readFileSync } from 'fs';
import path from 'path';
import conversations from './conversations.mongo.js';

const __dirname = path.resolve();
const findMaxId = async () => {
    const latestConversation = await conversations.findOne().sort('-id');

    if (!latestConversation && !(latestConversation instanceof conversations)) {
        return 0;
    }
    return latestConversation.id;
};

const saveConversation = async (conversation) => {
    try {
        let getConversation = await conversations.findOne({
            participants: conversation?.participants,
            messages: conversation?.messages,
        });

        if (getConversation && getConversation instanceof conversations) {
            getConversation.participants = conversation?.participants
                ? conversation.participants
                : getConversation.participants;
            getConversation.messages = conversation?.messages
                ? conversation.messages
                : getConversation.messages;

            await getConversation.save();
            return getConversation?._doc;
        } else {
            getConversation = await conversations.create({
                id: Number((await findMaxId()) + 1),
                participants: conversation?.participants,
                messages: conversation?.messages,
            });
            if (getConversation instanceof conversations && getConversation)
                return getConversation?._doc;
            throw new Error('Unable to create new Conversation!');
        }
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};

const initDataConversation = async () => {
    console.log('Init conversations started');
    const json = readFileSync(
        path.join(__dirname, 'src/data/conversation.json'),
    );
    const readCons = JSON.parse(json.toString());
    for (const prop in readCons) {
        await saveConversation(readCons[prop]);
    }
};

export { initDataConversation, findMaxId, saveConversation };
