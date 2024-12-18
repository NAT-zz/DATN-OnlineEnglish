import express from 'express';
import multer from 'multer';
import {
    generateChat,
    handleAnalyzeVoice,
    getAudio,
    getAiMessages,
} from '../app/controllers/AI.controller.js';
import path from 'path';

import { verifyToken } from './auth.js';

const router = express.Router();
const __dirname = path.resolve();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, `src/uploads/`));
    },
    filename: function (req, file, cb) {
        // Generate a unique name for the file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.fieldname +
                '-' +
                uniqueSuffix +
                path.extname(file.originalname),
        );
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
    fileFilter: function (req, file, cb) {
        // Accept only audio files
        const filetypes = /webm|wav|mp3|ogg|m4a/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase(),
        );

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only audio files are allowed!'));
    },
});

router.post('/chat', verifyToken, generateChat);
router.get('/messages', verifyToken, getAiMessages);
router.post('/analyze-voice', upload.single('audio'), handleAnalyzeVoice);
router.get('/getAudio', getAudio);

export default router;
