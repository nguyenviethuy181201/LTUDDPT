import express from 'express';
import {
    registerMember, returnWebsite
} from '../Controller/VnpayController.js';
import { protect, admin } from '../middleware/Auth.js';

const router = express.Router();
router.post('/member',protect, registerMember);
router.get('/return', returnWebsite);

export default router;
