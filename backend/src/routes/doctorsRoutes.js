import express from 'express';
import * as doctorsController from '../controllers/doctorsController.js';

const router = express.Router();

router.get('/', doctorsController.getAllDoctors);
router.post('/', doctorsController.createDoctor);
router.put('/:id', doctorsController.updateDoctor);
router.delete('/:id', doctorsController.deleteDoctor);
router.get('/:id', doctorsController.getDoctorById);

export default router;
