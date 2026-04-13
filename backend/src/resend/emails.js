import resend from './config.js';
import {
  verificationEmailTemplate,
  welcomeEmailTemplate,
  passwordResetTemplate,
  resetSuccessTemplate,
} from './emailsTemplates.js';
export const sendVerificationEmail = async (verificationToken, userEmail) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [userEmail],
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
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [userEmail],
      subject: 'Welcome to Sawahel',
      html: welcomeEmailTemplate(userName),
    });
    console.log('Welcome email sent:', data);
    console.error('Error sending welcome email:', error);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw new Error('Failed to send welcome email');
  }
};

export const sendPasswordResetEmail = async (userEmail, resetUrl) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [userEmail],
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
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [userEmail],
      subject: 'Password Reset Successful',
      html: resetSuccessTemplate(),
    });
  } catch (error) {
    console.error('Error sending password reset success email:', error);
    throw new Error('Failed to send password reset success email');
  }
};
