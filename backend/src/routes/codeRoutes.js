import express from 'express';
import { handleExecuteCode } from '../controllers/codeController.js';
import { codeExecutionLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/execute', codeExecutionLimiter, handleExecuteCode);

export default router;