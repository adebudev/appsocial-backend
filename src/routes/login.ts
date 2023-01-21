import express from 'express';
import { sessionLogin, sessionLogout } from '../controller/login.controller.js';
import { getUserByToken } from '../controller/user.controller.js';

const router = express.Router();

router.post('/login', sessionLogin);
router.get('/logout', sessionLogout);
router.get('/user/token/:auth_token', getUserByToken);

export default router;
