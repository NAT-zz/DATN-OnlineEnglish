import express from 'express';

import {
    getTasks,
    createTask,
    deleteTask,
} from '../app/controllers/Task.controller.js';

import { verifyToken, verifyRights, verifyPermission } from './auth.js';
import { RIGHT_TYPE, ROLES } from '../utils/Constants.js';
const router = express.Router();

// CRUD
router.get('/tasks', verifyToken, verifyPermission([ROLES.TEACHER]), getTasks);
router.delete(
    '/:id',
    verifyToken,
    verifyPermission([ROLES.TEACHER]),
    verifyRights(RIGHT_TYPE.task),
    deleteTask,
);
router.post(
    '/create',
    verifyToken,
    verifyPermission([ROLES.TEACHER]),
    verifyRights(RIGHT_TYPE.task),
    createTask,
);

export default router;
