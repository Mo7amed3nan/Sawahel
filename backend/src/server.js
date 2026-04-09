import express from 'express';
import dotenv from 'dotenv';
import dns from 'dns';
import cors from 'cors';

import notesRoutes from './routes/notesRoutes.js';
import servicesRoutes from './routes/servicesRoutes.js';
import { connectDB } from './config/db.js';
import doctorsRoutes from './routes/doctorsRoutes.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

if (process.env.FORCE_DNS === 'true') {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}

const app = express();
const PORT = process.env.PORT || 5001;

//middlewares
app.use(cors());
app.use(express.json()); // to parse JSON bodies
app.use(rateLimiter); // Apply rate limiting middleware to all routes
app.use('/api', (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);

  next();
});

app.use('/api/notes', notesRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/doctors', doctorsRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
