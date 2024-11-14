import express from 'express';
import multer from 'multer';
import {
    generateChat,
    handleAnalyzeVoice,
} from '../app/controllers/AI.controller.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/chat', generateChat);
router.post('/analyze-voice', upload.single('audio'));

export default router;
