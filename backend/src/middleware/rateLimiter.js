import rateLimit from 'express-rate-limit';

export const codeExecutionLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 10, // Limit user to 10 code runs per minute
  message: { message: "You can only run code 10 times per minute." },
  standardHeaders: true,
  legacyHeaders: false,
});