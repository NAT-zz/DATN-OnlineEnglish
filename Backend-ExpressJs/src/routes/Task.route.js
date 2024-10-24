import express from 'express';

import {
    getTasks,
    createTask,
    deleteTask,

} from '../app/controllers/Task.controller.js';

const router = express.Router();

// CRUD
router.get('/tasks', getTasks);
router.delete('/:id', deleteTask);
router.post('/create', createTask);

export default router;
