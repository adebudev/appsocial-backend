import express from 'express';
import { suscriptionRegister } from '../controller/suscription.controller.js';


const router = express.Router();

router.post('/suscription', suscriptionRegister);


export default router;