import express from 'express';
import dotenv from 'dotenv';
import dns from 'dns';
import cors from 'cors';

import servicesRoutes from './routes/servicesRoutes.js';
import { connectDB } from './config/db.js';
import doctorsRoutes from './routes/doctorsRoutes.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

if (process.env.NODE_ENV === 'development') {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}

const app = express();
const PORT = process.env.PORT || 5001;

//middlewares

if (process.env.NODE_ENV === 'production') {
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (
          origin === 'https://sawahel-2a1m.vercel.app' ||
          origin.includes('vercel.app')
        ) {
          return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
      },
    })
  );
}
if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}
app.use(express.json()); // to parse JSON bodies
app.use(rateLimiter); // Apply rate limiting middleware to all routes
app.use('/api', (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);

  next();
});

app.use('/api/services', servicesRoutes);
app.use('/api/doctors', doctorsRoutes);

await connectDB();
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
export default app;
