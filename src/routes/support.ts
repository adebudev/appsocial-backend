
import express from 'express';
import { supportRegister, supportUpdate } from '../controller/support.controller.js';

const router = express.Router();

router.post('/support', supportRegister);
router.put('/support/:id', supportUpdate);

export default router;