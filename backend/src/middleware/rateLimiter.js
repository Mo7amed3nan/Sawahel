import ratelimit from '../config/upstash.js';
import jwt from 'jsonwebtoken';

const getClientIp = (req) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim();
  }

  return req.ip || req.socket?.remoteAddress || 'unknown-ip';
};

const getRateLimitKey = (req) => {
  const token = req.headers.authorization?.startsWith('Bearer ')?
    req.headers.authorization.slice(7) : null;
    
  if (!token) {
    return `ip:${getClientIp(req)}`;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded?.userId) {
      return `user:${decoded.userId}`;
    }
  } catch (error) {
    // If token is invalid, fallback to IP-based rate limiting.
  }

  return `ip:${getClientIp(req)}`;
};

const rateLimiter = async (req, res, next) => {
  try {
    const key = getRateLimitKey(req);
    // console.log(`Rate limiting key: ${key}`);
    const { success } = await ratelimit.limit(key);
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
