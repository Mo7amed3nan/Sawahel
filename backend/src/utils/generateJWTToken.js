import jwt from 'jsonwebtoken';

export const generateJWTToken = (res, userId, role = 'user') => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return token;
};
