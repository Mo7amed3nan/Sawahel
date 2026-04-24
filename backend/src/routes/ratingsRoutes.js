import express from 'express';
import * as ratingsController from '../controllers/ratingsController.js';
import verifyToken from '../middleware/verifyToken.js';
import optionalAuth from '../middleware/optionalAuth.js';

const router = express.Router();

router.post('/:doctorId', verifyToken, ratingsController.rateDoctor);
router.get('/:doctorId', optionalAuth, ratingsController.getDoctorRatings);

export default router;
