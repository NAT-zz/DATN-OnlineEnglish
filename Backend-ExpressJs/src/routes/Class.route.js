import express from 'express';
import {
    getClasses,
    deleteClass,
    createClass,
    getDetail,
} from '../app/controllers/Class.controller.js';
const router = express.Router();

// CRUD
router.get('/classes', getClasses);
router.get('/detail/:id', getDetail);
router.delete('/:id', deleteClass);
router.post('/create', createClass);

// verify, authorize
export default router;
