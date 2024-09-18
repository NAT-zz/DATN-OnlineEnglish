import dotenv from 'dotenv';
dotenv.config();

const CONFIG = {
    URL_MONGO: process.env.URL_MONGO,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_ACCESS_TIME: process.env.JWT_ACCESS_TIME,
    JWT_REFRESH_TIME: process.env.JWT_REFRESH_TIME,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_HOST: process.env.REDIS_HOST,
    DOMAIN_CLIENT: process.env.DOMAIN_CLIENT,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
};

const TOKENS = {
    PASSWORD_RESET: 'PASSWORD_RESET',
    EMAIL_VERIFY: 'EMAIL_VERIFY',
};

const ROLES = {
    STUDENT: 'STUDENT',
    TEACHER: 'TEACHER',
    ADMIN: 'ADMIN',
};

const SKILLS = {
    GRAMMAR: 'GRAMMAR',
    VOCABULARY: 'VOCABULARY',
    READING: 'READING',
    LISTENING: 'LISTENING',
    WRITING: 'WRITING',
    SPEAKING: 'SPEAKING',
};

const QUESTION_TYPE = {
    FILL: 'FILL',
    SELECT: 'SELECT',
};

const GRAMMAR_TYPE = {
    ED_ING: 'ED_ING',
    CONVERSATION: 'CONVERSATION',
    ANY: 'ANY',
};

const REALIABILITY = {
    NOT_SURE: '1',
    PRETTY_SURE: '2',
    SURE: '3',
};

const COURSE = {
    A1: 'A1',
    A2: 'A2',
    B1: 'B1',
    B2: 'B2',
    C1: 'C1',
};

const TASK_TYPE = {
    FOR_TEST: 'TEST',
    FOR_TOPIC: 'TOPIC',
};

const RATE_TYPE = {
    COURSE: 'COURSE',
    TOPIC: 'TOPIC',
    TIP: 'TIP',
};

export {
    CONFIG,
    TOKENS,
    ROLES,
    SKILLS,
    COURSE,
    QUESTION_TYPE,
    GRAMMAR_TYPE,
    REALIABILITY,
    TASK_TYPE,
    RATE_TYPE,
};
