import express from 'express';
import { getUserByToken, getUsers, userRegister } from '../controller/user.controller.js';

const router = express.Router();

router.post('/register', userRegister);
router.get('/user', getUsers);
router.get('/user/token', getUserByToken);

export default router;
