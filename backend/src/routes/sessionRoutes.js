import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { createSession, endSession, getActiveSessions, getPastSessions, getSessionById, joinSession } from '../controllers/sessionController.js';

const router = express.Router();

router.post("/", protectRoute, createSession);
router.get("/active", protectRoute, getActiveSessions);
router.get("/past", protectRoute, getPastSessions);

router.get("/:sessionId", protectRoute, getSessionById);
router.post("/:sessionId/join", protectRoute, joinSession);
router.post("/:sessionId/end", protectRoute, endSession);

export default router;