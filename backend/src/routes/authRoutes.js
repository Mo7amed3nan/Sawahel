import express from 'express';
import {
  signup,
  login,
  logout,
  verifyEmail,
  resendVerificationEmail,
  forgetPassword,
  resetPassword,
  checkAuth,
} from '../controllers/authController.js';
import verifyToken from '../middleware/verifyToken.js';
const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.post('/verify-email', verifyEmail);

router.post('/resend-verification-email', resendVerificationEmail);

router.post('/forget-password', forgetPassword);

router.post('/reset-password/:token', resetPassword);

router.get('/check-auth', verifyToken, checkAuth);

export default router;
