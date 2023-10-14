const rateLimit = require('express-rate-limit');

// Define the rate limit options
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes (time window for rate limiting)
  max: 100, // Max 100 requests per windowMs
  message: 'Too many login attempts from this IP, please try again later.',
});

export default limiter;
