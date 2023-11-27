import express from 'express';

import { protect, admin } from '../middleware/Auth.js';
import { getService } from '../Controller/ServicesController.js';

const router = express.Router();
router.get('/buy',protect, getService);


export default router;
