import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateVerificationToken } from '../utils/generateVerificationToken.js';
import { generateJWTToken } from '../utils/generateJWTToken.js';
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} from '../nodemailer/emails.js';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();



export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res
        .status(400)
        .json({ message: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken(); // Generate a random 6-digit verification token
    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // Token expires in 24 hours
    });
    await user.save();

    try {
      await sendVerificationEmail(verificationToken, email);
    } catch (emailError) {
      throw emailError;
    }

    res.status(201).json({
      message: 'User registered successfully. Please verify your email.',
      user: {
        ...user._doc,
        password: undefined,
        verificationToken: undefined,
        verificationTokenExpiresAt: undefined,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error registering user', error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isVerified = user.isVerified;
    if (!isVerified) {
      return res
        .status(400)
        .json({ message: 'Please verify your email before logging in' });
    }
    const token = generateJWTToken(res, user._id, user.role || 'user');
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        ...user._doc,
        password: undefined,
        verificationToken: undefined,
        verificationTokenExpiresAt: undefined,
        resetPasswordToken: undefined,
        resetPasswordExpiresAt: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

export const logout = async (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};

export const verifyEmail = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Invalid or expired verification token' });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    const authToken = generateJWTToken(res, user._id, user.role || 'user');
    await sendWelcomeEmail(user.email, user.name);
    res.status(200).json({
      message: 'Email verified successfully',
      token: authToken,
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error verifying email', error: error.message });
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'User with this email does not exist' });
    }
    const resetPasswordToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // Token expires in 1 hour
    await user.save();
    await sendPasswordResetEmail(
      email,
      `${process.env.VITE_FRONTEND_URL}/reset-password/${resetPasswordToken}`
    );
    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Error in forgetPassword:', error);
    res.status(500).json({
      message: 'Error processing password reset request',
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  const token = req.params.token;
  const { newPassword } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Invalid or expired password reset token' });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    await sendResetSuccessEmail(user.email);
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error in resetPassword:', error);
    res
      .status(500)
      .json({ message: 'Error resetting password', error: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    return res.status(200).json({
      message: 'Authenticated',
      user: {
        ...user._doc,
        password: undefined,
        verificationToken: undefined,
        verificationTokenExpiresAt: undefined,
        resetPasswordToken: undefined,
        resetPasswordExpiresAt: undefined,
      },
    });
  } catch (error) {
    console.log('Error in checkAuth:', error);
    return res
      .status(500)
      .json({ message: 'Error checking authentication', error: error.message });
  }
};
