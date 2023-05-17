import express from 'express';
import { getMessage, getMessages, saveMessage, sendMessage } from '../controller/wpMessage.controller.js';
import { botEnable, botDisable, getWpQr, getWpUserInfo } from '../controller/wp.controller.js';

const router = express.Router();

/* QR */
router.get('/qr', getWpQr);

router.get('/user-info', getWpUserInfo);

/* BOT */
router.post('/bot-enable', botEnable);
router.post('/bot-disable', botDisable);

/* Message */
router.post('/message', saveMessage);
router.get('/message', getMessages);
router.get('/message/:id', getMessage);
router.post('/send-message', sendMessage);

export default router;
