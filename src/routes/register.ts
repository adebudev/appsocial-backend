import express from 'express';
import { emailResetPassword, userRegister } from '../controller/user.controller.js';

const router = express.Router();

router.post('/sign-up', userRegister);
router.post('/send-email-reset-password', emailResetPassword);

export default router;
