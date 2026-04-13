// Generate a random 6-digit number as the verification token
export const generateVerificationToken = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
