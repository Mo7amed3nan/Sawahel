import express from 'express';
import * as doctorApplicationController from '../controllers/doctorApplicationController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/apply', verifyToken, doctorApplicationController.applyForDoctor);
router.get(
  '/status',
  verifyToken,
  doctorApplicationController.getApplicationStatus
);

export default router;
