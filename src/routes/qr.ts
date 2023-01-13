import express from 'express';
import { getWpQr } from '../controller/wp.controller.js';

const router = express.Router();

router.get('/qr', getWpQr);

export default router;
