import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const bearerToken = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null;
  const token = bearerToken;
  if (!token) {
    return res.status(401).json({ message: 'unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    const user = await User.findById(decoded.userId).select('role');
    if (!user) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    req.role = user.role || 'user';
    next();
  } catch (error) {
    console.log('Error in verifyToken middleware:', error);
    return res.status(401).json({ message: 'unauthorized' });
  }
};
export default verifyToken;
