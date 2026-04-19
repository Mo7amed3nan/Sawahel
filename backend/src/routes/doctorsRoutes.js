import express from 'express';
import * as doctorsController from '../controllers/doctorsController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', doctorsController.getAllDoctors);
router.post('/', verifyToken, doctorsController.createDoctor);
router.put('/:id', verifyToken, doctorsController.updateDoctor);
router.delete('/:id', verifyToken, doctorsController.deleteDoctor);
router.get('/:id', doctorsController.getDoctorById);

export default router;
