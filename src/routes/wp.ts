import express from 'express';
import { getMessage, getMessages, saveMessage, sendMessage } from '../controller/wpMessage.controller.js';
import { botEnable, botDisable, getWpQr } from '../controller/wp.controller.js';

const router = express.Router();

/* QR */
router.get('/wp/qr', getWpQr);

/* BOT */
router.post('/bot-enable', botEnable);
router.post('/bot-disable', botDisable);

/* Message */
router.post('/wp/message', saveMessage);
router.get('/wp/message', getMessages);
router.get('/wp/message/:id', getMessage);
router.post('/wp/send-message', sendMessage);

export default router;
