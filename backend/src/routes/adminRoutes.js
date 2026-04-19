import express from 'express';
import * as adminController from '../controllers/adminController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/applications', verifyToken, adminController.getAllApplications);
router.post(
  '/applications/:applicationId/approve',
  verifyToken,
  adminController.approveApplication
);
router.post(
  '/applications/:applicationId/reject',
  verifyToken,
  adminController.rejectApplication
);

export default router;
