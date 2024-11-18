import { readFileSync } from 'fs';
import path from 'path';
import notis from './notis.mongo.js';

const __dirname = path.resolve();
const findMaxId = async () => {
    const lastestNoti = await notis.findOne().sort('-id');

    if (!lastestNoti && !(lastestNoti instanceof notis)) {
        return 0;
    }
    return lastestNoti.id;
};

const saveNoti = async (thisNoti) => {
    try {
        let getNoti = await notis.findOne({
            from: thisNoti?.from,
            to: thisNoti?.to,
        });

        if (getNoti && getNoti instanceof notis) {
            getNoti.from = thisNoti.from ? thisNoti.from : getNoti.from;
            getNoti.to = thisNoti.to ? thisNoti.to : getNoti.to;
            getNoti.content = thisNoti.content
                ? thisNoti.content
                : getNoti.content;

            await getNoti.save();
            return getNoti._doc;
        } else {
            getNoti = await notis.create({
                id: Number((await findMaxId()) + 1),
                from: thisNoti.from,
                to: thisNoti.to,
                content: thisNoti.content,
            });

            if (getNoti && getNoti instanceof notis) return getNoti._doc;
            throw new Error('Unable to create new Noti!');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const initDataNoti = async () => {
    console.log('Init notis started');
    const json = readFileSync(path.join(__dirname, 'src/data/noti.json'));
    const readNotis = JSON.parse(json.toString());
    for (const prop in readNotis) {
        await saveNoti(readNotis[prop]);
    }
};

export { initDataNoti, findMaxId, saveNoti };
