import express from 'express';
import { getMembership, getMemberships, memberRegister, memberUpdate } from '../controller/member.controller.js';

const router = express.Router();

router.post('/membership', memberRegister);
router.get('/membership/:id', getMembership);
router.get('/membership', getMemberships);
router.put('/membership/:id', memberUpdate);

export default router;