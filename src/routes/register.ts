import express from 'express';
import { userRegister } from '../controller/user.controller.js';

const router = express.Router();

router.post('/sign-up', userRegister);

export default router;
