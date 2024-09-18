import { readFileSync } from 'fs';
import path from 'path';
import users from './users.mongo.js';
import bcrypt from 'bcryptjs';

const __dirname = path.resolve();
const findMaxId = async () => {
    const latestUser = await users.findOne().sort('-id');

    if (!latestUser && !(latestUser instanceof users)) {
        return 0;
    }
    return latestUser.id;
};

const saveUser = async (user) => {
    try {
        let getUser = await users.findOne({
            $or: [{ email: user?.email }, { userName: user?.userName }],
        });
        if (getUser instanceof users && getUser) {
            getUser.userName = user?.userName
                ? user.userName
                : getUser.userName;
            getUser.passWord = user?.passWord
                ? bcrypt.hashSync(user.passWord, 10)
                : getUser.passWord;
            getUser.fullName = user?.fullName
                ? user.fullName
                : getUser.fullName;
            getUser.birthDate = user?.birthDate
                ? new Date(user.birthDate)
                : getUser.birthDate;
            getUser.role = user?.role ? user.role : getUser.role;
            getUser.status = user?.status ? user.status : getUser.status;
            getUser.avatar = user?.avatar ? user.avatar : getUser.avatar;
            getUser.coin = user?.coin ? user.coin : getUser.coin;
            getUser.achivement = user?.achivement
                ? user.achivement
                : getUser.achivement;

            await getUser.save();
            return getUser;
        } else {
            getUser = await users.create({
                email: user.email,
                id: Number((await findMaxId()) + 1),
                userName: user.userName,
                passWord: bcrypt.hashSync(user.passWord, 10),
                fullName: user.fullName,
                birthDate: new Date(user.birthDate),
                role: user?.role ? user.role : 'STUDENT',
                status: user?.status ? user.status : false,
                avatar: null,
                coin: 0,
            });
            if (getUser instanceof user && getUser) return getUser;
            throw new Error('Unable to create new User');
        }
    } catch (err) {
        console.error(err.message);
    }
};

const initDataUser = async () => {
    console.log('Init users started');
    const json = readFileSync(path.join(__dirname, 'src/data/user.json'));
    const readUsers = JSON.parse(json.toString());
    for (const prop in readUsers) await saveUser(readUsers[prop]);
};

export { initDataUser, findMaxId, saveUser };
