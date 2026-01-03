
import rateLimit from "express-rate-limit";

const expressRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // requests per IP
  standardHeaders: true,
  legacyHeaders: false,
});

export default expressRateLimiter;