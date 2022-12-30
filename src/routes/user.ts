import express from 'express';
import { userGetAll, userRegister } from '../controller/user.controller.js';

const router = express.Router();

router.post('/register', userRegister);
router.get('/user', userGetAll);

export default router;
