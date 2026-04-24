import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Optional authentication middleware.
 * If a valid token is present, sets req.userId and req.role.
 * If no token or invalid token, continues without error.
 */
const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const bearerToken = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null;

  if (!bearerToken) {
    return next();
  }

  try {
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    const user = await User.findById(decoded.userId).select('role');
    if (user) {
      req.role = user.role || 'user';
    }
  } catch {
    // Token invalid — continue as unauthenticated
  }

  next();
};

export default optionalAuth;
