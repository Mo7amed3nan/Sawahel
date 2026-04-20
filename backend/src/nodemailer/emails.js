import transporter from './config.js';
import {
  verificationEmailTemplate,
  welcomeEmailTemplate,
  passwordResetTemplate,
  resetSuccessTemplate,
} from './emailsTemplates.js';

const FROM_EMAIL = process.env.MAIL_FROM || process.env.RESEND_FROM_EMAIL;

const getFromEmail = () => {
  if (!FROM_EMAIL) {
    throw new Error('MAIL_FROM is not configured');
  }

  return FROM_EMAIL;
};

export const sendVerificationEmail = async (verificationToken, userEmail) => {
  try {
    await transporter.sendMail({
      from: getFromEmail(),
      to: userEmail,
      subject: 'Verify Your Email Address',
      html: verificationEmailTemplate(verificationToken),
    });
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};

export const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    await transporter.sendMail({
      from: getFromEmail(),
      to: userEmail,
      subject: 'Welcome to Sawahel',
      html: welcomeEmailTemplate(userName),
    });
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw new Error('Failed to send welcome email');
  }
};

export const sendPasswordResetEmail = async (userEmail, resetUrl) => {
  try {
    await transporter.sendMail({
      from: getFromEmail(),
      to: userEmail,
      subject: 'Password Reset Request',
      html: passwordResetTemplate(resetUrl),
    });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
};

export const sendResetSuccessEmail = async (userEmail) => {
  try {
    await transporter.sendMail({
      from: getFromEmail(),
      to: userEmail,
      subject: 'Password Reset Successful',
      html: resetSuccessTemplate(),
    });
  } catch (error) {
    console.error('Error sending password reset success email:', error);
    throw new Error('Failed to send password reset success email');
  }
};
