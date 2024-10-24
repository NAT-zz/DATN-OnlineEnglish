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
            email: user?.email,
        });
        if (getUser && getUser instanceof users) {
            getUser.userName = user?.userName
                ? user.userName
                : getUser.userName;
            getUser.passWord = user?.passWord
                ? bcrypt.hashSync(user.passWord, 10)
                : getUser.passWord;
            getUser.email = user?.email ? user.email : getUser.email;
            getUser.birthDate = user?.birthDate
                ? user.birthDate
                : getUser.birthDate;
            getUser.avatar = user?.avatar ? user.avatar : getUser.avatar;
            getUser.description = user?.description ? user.description : getUser.description;
            getUser.role = user?.role ? user.role : getUser.role;
            getUser.status = user?.status ? user.status : getUser.status;
            getUser.studying = user?.studying
                ? user.studying
                : getUser.studying;

            await getUser.save();
            return getUser;
        } else {
            getUser = await users.create({
                id: Number((await findMaxId()) + 1),
                email: user.email,
                userName: user.userName,
                passWord: bcrypt.hashSync(user.passWord, 10),
                role: user?.role ? user.role : 'STUDENT',
                status: user?.status ? user.status : false,
                birthDate: user?.birthDate ? user.birthDate : null,
                description: user?.description ? user.description : null,
                avatar: user?.avatar ? user.avatar : null,
                studying: user?.studying? user.studying : [],
            });
            if (getUser && getUser instanceof user) return getUser;
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
