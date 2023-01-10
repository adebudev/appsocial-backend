import express from 'express';
import { sendMessage } from '../controller/message.controller.js';
import { botEnable, botDisable, wpQR, saveGroup } from '../controller/wp.controller.js';

const router = express.Router();

router.get('/wp/qr', wpQR);
router.post('/wp/send-message', sendMessage);
router.post('/wp/save-group', saveGroup);
router.post('/bot-enable', botEnable);
router.post('/bot-disable', botDisable);

export default router;
