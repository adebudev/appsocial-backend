import express from 'express';
import { networkTokensRegister } from '../controller/NetworkTokens.controller.js';

const router = express.Router();

router.post('/network-tokens', networkTokensRegister);

export default router;
