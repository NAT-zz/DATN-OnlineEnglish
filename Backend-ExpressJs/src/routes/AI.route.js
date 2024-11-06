import express from 'express';
import { generateChat } from '../app/controllers/AI.controller.js';

const router = express.Router();

// CRUD
router.post('/chat', generateChat);

export default router;
