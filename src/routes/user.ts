import express from 'express';
import {
  getUserByToken,
  getUsers,
  putPassword,
  putUser,
} from '../controller/user.controller.js';
import { networkTokensRegister } from '../controller/NetworkTokens.controller.js';

const router = express.Router();

router.get('/user', getUsers);
router.get('/user/token/:auth_token', getUserByToken);
router.put('/user/:id', putUser);
router.put('/reset-password', putPassword);

router.post('/network-tokens', networkTokensRegister);

export default router;
