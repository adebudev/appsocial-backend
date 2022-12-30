import express from 'express';
import { sessionLogin, sessionLogout } from '../controller/login.controller.js';

const router = express.Router();

router.post('/login', sessionLogin);
router.get('/logout', sessionLogout);

export default router;
