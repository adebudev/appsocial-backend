import express from 'express';
import {
  getUsers,
  userUpdate,
} from '../controller/user.controller.js';

const router = express.Router();

router.get('/user', getUsers);
router.put('/user/:id', userUpdate);

export default router;
