import express from 'express';
import {
  getUsers,
  putPassword,
  putUser,
} from '../controller/user.controller.js';

const router = express.Router();

router.get('/user', getUsers);
router.put('/user/:id', putUser);
router.put('/reset-password', putPassword);

export default router;
