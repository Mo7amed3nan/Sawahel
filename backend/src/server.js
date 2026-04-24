import express from 'express';
import dotenv from 'dotenv';
import dns from 'dns';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectDB } from './config/db.js';
import doctorsRoutes from './routes/doctorsRoutes.js';
import doctorApplicationRoutes from './routes/doctorApplicationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import ratingsRoutes from './routes/ratingsRoutes.js';
import rateLimiter from './middleware/rateLimiter.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

dotenv.config();

if (process.env.NODE_ENV === 'development') {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}

const app = express();
const PORT = process.env.PORT || 5001;

//middlewares
app.use(
  cors({
    origin: process.env.VITE_FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser()); // to parse cookies to access the cookie in the request object
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded bodies
app.use(express.json()); // to parse JSON bodies
app.use(rateLimiter); // Apply rate limiting middleware to all routes  ** need to get the IP address of the user and use it in the rate limiter instead of a fixed value before final deployment
app.use('/api', (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/doctors', doctorsRoutes);
app.use('/api/doctor-applications', doctorApplicationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/ratings', ratingsRoutes);

await connectDB();
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}`);
  });
}
export default app;
