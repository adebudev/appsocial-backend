import express from 'express';
import { memberRegister } from '../controller/member.controller.js';


const router = express.Router();

router.post('/member', memberRegister);


export default router;