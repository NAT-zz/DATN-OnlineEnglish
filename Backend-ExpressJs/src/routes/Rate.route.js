import express from 'express';
import { rate, getRate } from '../app/controllers/Rate.controller.js';

import { verifyToken, verifyPermission } from './auth.js';
import { ROLES } from '../utils/Constants.js';
const router = express.Router();

router.get('/:type/:id', getRate);
router.post('/:type/:id/:rateCount', verifyToken, rate);

export default router;
