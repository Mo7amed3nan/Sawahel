import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ message: 'unauthorized' });
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log('Error in verifyToken middleware:', error);
    return res.status(401).json({ message: 'unauthorized' });
  }
};
export default verifyToken;
