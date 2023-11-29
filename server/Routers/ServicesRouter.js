import express from 'express';

import { protect, admin } from '../middleware/Auth.js';
import { createService, deleteAllService, deleteService, getService, updateService } from '../Controller/ServicesController.js';

const router = express.Router();
router.get('/',protect, getService);
router.post('/',protect, admin, createService);
router.put('/:id',protect, admin, updateService);
router.delete('/:id',protect, admin, deleteService);
router.delete('/',protect, admin, deleteAllService);

export default router;
