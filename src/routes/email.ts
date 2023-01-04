import express from 'express';

import { sendMail } from '../controller/email.controller.js';

const router = express.Router();

router.post('/email',sendMail);
router.get('/email', sendMail);

export default router;