import express from 'express';
import {
  getUsers,
  getUserByToken,
  userRegister,
  userUpdate,
} from '../controller/user.controller.js';

const router = express.Router();

router.post('/user', userRegister);
router.get('/user', getUsers);
router.put('/user/:id', userUpdate);
router.get('/user/token', getUserByToken);

export default router;
