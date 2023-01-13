import express from 'express';
import {
  getUsers,
  getUserByToken,
  userUpdate,
} from '../controller/user.controller.js';

const router = express.Router();

router.get('/user', getUsers);
router.put('/user/:id', userUpdate);
router.get('/user/token', getUserByToken);

export default router;
