const express = require('express');
const router = express.Router();

const { verifyToken, verifyPermission } = require('./auth');
const {  getRandomTasks, checkAnswers, createGrammar, deleteGrammar, getGrammar } = require('../app/controllers/Task.controller');
const { ROLES } = require('../utils/Constants');

// type: SELECTION, FILL
router.get('/get-random/:skill/:type/:topic/:number', getRandomTasks);
router.post('/check-answers/:skill/:type', checkAnswers);

// CRUD 
router.get('/get/:skill/:id', getGrammar);
router.post('/create/:skill', createGrammar); 
router.delete('/delete/:skill/:id', deleteGrammar);
//edit

module.exports = router;