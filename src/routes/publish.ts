import express from 'express';
import { publishRegister } from '../controller/publish.controller.js';

const router = express.Router();

router.post('/publish', publishRegister);

export default router;
