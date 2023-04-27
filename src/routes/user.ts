import express from 'express';
import {
  getUserByToken,
  getUsers,
  putPassword,
  putUser,
} from '../controller/user.controller.js';

const router = express.Router();

router.get('/user', getUsers);
router.get('/user/token/:auth_token', getUserByToken);
router.put('/user/:id', putUser);
router.put('/reset-password', putPassword);

export default router;
