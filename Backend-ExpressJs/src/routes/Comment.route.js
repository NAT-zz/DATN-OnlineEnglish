import express from 'express';
import { getComment, comment } from '../app/controllers/Comment.controller.js';

import { verifyToken, verifyPermission } from './auth.js';
import { ROLES } from '../utils/Constants.js';
const router = express.Router();

router.get('/:type/:id', getComment);
router.post('/:type/:id', verifyToken, comment);

export default router;
