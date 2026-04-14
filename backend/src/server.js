import express from 'express';
import dotenv from 'dotenv';
import dns from 'dns';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import servicesRoutes from './routes/servicesRoutes.js';
import { connectDB } from './config/db.js';
import doctorsRoutes from './routes/doctorsRoutes.js';
import rateLimiter from './middleware/rateLimiter.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

if (process.env.NODE_ENV === 'development') {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}

const app = express();
const PORT = process.env.PORT || 5001;

//middlewares
app.use(cors({ origin: process.env.VITE_FRONTEND_URL }));

app.use(cookieParser()); // to parse cookies to access the cookie in the request object
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded bodies
app.use(express.json()); // to parse JSON bodies
app.use(rateLimiter); // Apply rate limiting middleware to all routes
app.use('/api', (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/services', servicesRoutes);
app.use('/api/doctors', doctorsRoutes);
app.use('/api/auth', authRoutes);

await connectDB();
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
export default app;
