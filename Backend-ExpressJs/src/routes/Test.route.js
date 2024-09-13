const express = require('express');
const router = express.Router();
const { createTest, checkAnswers, getTest, deleteTest, makeTestFromRandom } = require('../app/controllers/Test.controller');

const { verifyToken, verifyPermission } = require('./auth');
const { ROLES } = require('../utils/Constants')

router.get('/:id', getTest)
router.post('/create', createTest); // create
router.delete('/:id', deleteTest);
//edit

router.get('/get-random',  makeTestFromRandom);
router.post('/check-answers', checkAnswers);

module.exports = router;