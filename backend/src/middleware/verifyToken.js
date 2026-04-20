import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const bearerToken = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null;
  const token = req.cookies.token || bearerToken;
  if (!token) {
    return res.status(401).json({ message: 'unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.role = decoded.role || 'user';
    next();
  } catch (error) {
    console.log('Error in verifyToken middleware:', error);
    return res.status(401).json({ message: 'unauthorized' });
  }
};
export default verifyToken;
