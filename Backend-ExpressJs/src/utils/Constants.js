import dotenv from 'dotenv';
dotenv.config();

const CONFIG = {
    URL_MONGO: process.env.URL_MONGO,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_TIME: process.env.JWT_ACCESS_TIME,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_URL: process.env.REDIS_URL,
    DOMAIN_CLIENT: process.env.DOMAIN_CLIENT,
    DOMAIN_SERVER: process.env.DOMAIN_SERVER,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    DAILY_API_KEY: process.env.DAILY_API_KEY,
    DEEPGRAM_API_KEY: process.env.DEEPGRAM_API_KEY,

    APP_ID: process.env.APP_ID,
    APP_KEY: process.env.APP_KEY,
    BASE_URL: process.env.BASE_URL,

    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    GOOGLE_SEARCH_ENGINE_ID: process.env.GOOGLE_SEARCH_ENGINE_ID,
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

const QUESTION_TYPE = {
    SELECT: 'SELECT',
    FILL: 'FILL',
    LISTEN: 'LISTEN',
};

const TASK_TYPE = {
    MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
    ESSAY: 'ESSAY',
};

const LESSON_TYPE = {
    LESSON: 'LESSON',
    TASKS: 'TASKS',
};

const RIGHT_TYPE = {
    question: 'question',
    task: 'task',
    lesson: 'lesson',
    test: 'test',
    class: 'class',
};

const LEVEL = {
    A1: 'A1',
    A2: 'A2',
    B1: 'B1',
    B2: 'B2',
    C1: 'C1',
    C2: 'C2',
};

////////////////////////////////

const SKILLS = {
    GRAMMAR: 'GRAMMAR',
    VOCABULARY: 'VOCABULARY',
    READING: 'READING',
    LISTENING: 'LISTENING',
    WRITING: 'WRITING',
    SPEAKING: 'SPEAKING',
};

export {
    CONFIG,
    TOKENS,
    ROLES,
    SKILLS,
    LEVEL,
    QUESTION_TYPE,
    TASK_TYPE,
    LESSON_TYPE,
    RIGHT_TYPE,
};
