import express from 'express';
import {
    getClasses,
    deleteClass,
    createClass,
    getDetail,
    getClassAuth,
    studentSignup
} from '../app/controllers/Class.controller.js';
const router = express.Router();

// CRUD
router.get('/classes', getClasses);
router.get('/classes/auth', getClassAuth);
router.get('/detail/:id', getDetail);
router.delete('/:id', deleteClass);
router.post('/create', createClass);

//student
router.get('/signUp', studentSignup);


// verify, authorize
export default router;
