import express from 'express';
import { userGetAll, userRegister, userUpdate } from '../controller/user.controller.js';

const router = express.Router();

router.post('/user', userRegister);
router.get('/user', userGetAll);
router.put("/user", userUpdate);

export default router;
