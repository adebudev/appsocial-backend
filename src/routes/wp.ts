import express from 'express';
import { sendMessage } from '../controller/wpMessage.controller.js';
import { botEnable, botDisable, getWpQr } from '../controller/wp.controller.js';

const router = express.Router();

router.get('/wp/qr', getWpQr);
router.post('/wp/send-message', sendMessage);
router.post('/bot-enable', botEnable);
router.post('/bot-disable', botDisable);

export default router;
