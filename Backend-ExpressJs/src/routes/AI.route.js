import express from 'express';
import { generate } from '../app/controllers/AI.controller.js';

const router = express.Router();

// CRUD
router.post('/generate', generate);

export default router;
