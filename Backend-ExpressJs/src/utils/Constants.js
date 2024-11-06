import dotenv from 'dotenv';
dotenv.config();

const AI = {
    GENERATE: `${process.env.DOMAIN_AI}/api/generate`,
}

const CONFIG = {
    URL_MONGO: process.env.URL_MONGO,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_TIME: process.env.JWT_ACCESS_TIME,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_HOST: process.env.REDIS_HOST,
    DOMAIN_CLIENT: process.env.DOMAIN_CLIENT,
    DOMAIN_SERVER: process.env.DOMAIN_SERVER,
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

////////////////////////////////

const SKILLS = {
    GRAMMAR: 'GRAMMAR',
    VOCABULARY: 'VOCABULARY',
    READING: 'READING',
    LISTENING: 'LISTENING',
    WRITING: 'WRITING',
    SPEAKING: 'SPEAKING',
};

const COURSE = {
    A1: 'A1',
    A2: 'A2',
    B1: 'B1',
    B2: 'B2',
    C1: 'C1',
};

export {
    CONFIG,
    TOKENS,
    ROLES,
    SKILLS,
    COURSE,
    QUESTION_TYPE,
    TASK_TYPE,
    LESSON_TYPE,
    RIGHT_TYPE,
    AI
};
