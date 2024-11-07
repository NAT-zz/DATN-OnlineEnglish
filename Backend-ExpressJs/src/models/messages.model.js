import { readFileSync } from 'fs';
import path from 'path';
import messages from './messages.mongo.js';

const __dirname = path.resolve();
const findMaxId = async () => {
    const latestMessage = await messages.findOne().sort('-id');

    if (!latestMessage && !(latestMessage instanceof messages)) {
        return 0;
    }
    return latestMessage.id;
};

const saveMessage = async (message) => {
    try {
        let getMessage = await messages.findOne({
            senderId: message?.senderId,
            receiverId: message?.receiverId,
            message: message?.message,
        });

        if (getMessage && getMessage instanceof messages) {
            getMessage.senderId = message?.senderId
                ? message.senderId
                : getMessage.senderId;
            getMessage.receiverId = message?.receiverId
                ? message.receiverId
                : getMessage.receiverId;
            getMessage.message = message?.message
                ? message.message
                : getMessage.message;

            await getMessage.save();
            return getMessage?._doc;
        } else {
            getMessage = await messages.create({
                id: Number((await findMaxId()) + 1),
                senderId: message.senderId,
                receiverId: message.receiverId,
                message: message.message,
            });
            if (getMessage instanceof messages && getMessage)
                return getMessage?._doc;
            throw new Error('Unable to create new Message!');
        }
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};

const initDataMessage = async () => {
    console.log('Init messages started');
    const json = readFileSync(path.join(__dirname, 'src/data/message.json'));
    const readMessages = JSON.parse(json.toString());
    for (const prop in readMessages) {
        await saveMessage(readMessages[prop]);
    }
};

export { initDataMessage, findMaxId, saveMessage };
