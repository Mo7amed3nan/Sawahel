import express from 'express';
const router = express.Router();
import * as servicesController from '../controllers/servicesController.js';

router.post('/', servicesController.createService);

router.get('/', servicesController.getAllServices);

router.put('/:id', servicesController.updateService);

router.delete('/:id', servicesController.deleteService);

export default router;
