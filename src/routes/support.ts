
import express from 'express';
import { supportRegister } from '../controller/support.controller.js';

const router = express.Router();

router.post('/support', supportRegister);


export default router;