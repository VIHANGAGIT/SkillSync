import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { getStreamToken } from '../controllers/chatController.js';

const router = express.Router();
// When user visit /api/chat/token generate and return a Stream token
router.get('/token', protectRoute, getStreamToken);

export default router;