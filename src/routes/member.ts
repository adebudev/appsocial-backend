import express from 'express';
import { getMembership, getMemberships, memberRegister } from '../controller/member.controller.js';

const router = express.Router();

router.post('/membership', memberRegister);
router.get('/membership/:id', getMembership);
router.get('/membership', getMemberships);

export default router;