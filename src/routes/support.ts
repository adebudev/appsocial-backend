
import express from 'express';
import { getSupport, getSupports, supportRegister, supportUpdate } from '../controller/support.controller.js';

const router = express.Router();

router.get('/support', getSupports);
router.get('/support/:id', getSupport);
router.post('/support', supportRegister);
router.put('/support/:id', supportUpdate);

export default router;