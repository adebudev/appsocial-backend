import express from 'express';
import { botEnable, botDisable } from '../controller/wp.controller.js';
const router = express.Router();
router.post('/turnOn', botEnable);
router.post('/turnOff', botDisable);
export default router;
//# sourceMappingURL=wp.js.map