import { readFileSync } from 'fs';
import path from 'path';
import tips from './tips.mongo.js';

const __dirname = path.resolve();
const findMaxId = async () => {
    const latestTip = await tips.findOne().sort('-id');

    if (!latestTip && !(latestTip instanceof tips)) {
        return 0;
    }
    return latestTip.id;
};

const saveTip = async (tip) => {
    try {
        let getTip = await tips.findOne({
            $or: [{ name: tip?.name }, { id: tip?.id }],
        });

        if (getTip instanceof tips && getTip) {
            getTip.name = tip?.name ? tip.name : getTip.name;
            getTip.picture = tip?.picture ? tip.picture : getTip.picture;
            getTip.preview = tip?.preview ? tip.preview : getTip.preview;
            getTip.content = tip?.content ? tip.content : getTip.content;
            getTip.idProvider = tip?.idProvider
                ? tip.idProvider
                : getTip.idProvider;

            await getTip.save();
            return getTip.id;
        } else {
            getTip = await tips.create({
                id: Number((await findMaxId()) + 1),
                name: tip.name,
                preview: tip.preview,
                picture: tip.picture,
                content: tip.content,
                idProvider: tip?.idProvider ? tip.idProvider : 1,
            });
            if (getTip instanceof tips && getTip) return getTip.id;
            throw new Error('Unable to create new Tip');
        }
    } catch (err) {
        console.error(err.message);
    }
};

const initDataTip = async () => {
    console.log('Init tip started');
    const json = readFileSync(path.join(__dirname, 'src/data/tip.json'));
    const readTips = JSON.parse(json.toString());
    for (const prop in readTips) {
        await saveTip(readTips[prop]);
    }
};

export { initDataTip, findMaxId, saveTip };
