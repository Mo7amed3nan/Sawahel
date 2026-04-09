import ratelimit from '../config/upstash.js';

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit('my_ip'); // to be changed to req.ip in production
    if (!success) {
      return res.status(429).json({ error: 'Too Many Requests' });
    }
    next();
  } catch (error) {
    console.log('Error in rate limiter middleware:', error);
    next(error);
  }
};

export default rateLimiter;
