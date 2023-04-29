import express from 'express';
import { getMembership, getMembershipByUser, memberRegister, memberUpdate } from '../controller/member.controller.js';

const router = express.Router();

router.post('/membership', memberRegister);
// router.get('/membership/:id', getMembership);
router.get('/membership', getMembershipByUser);
router.put('/membership/:id', memberUpdate);

export default router;