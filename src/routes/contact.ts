import express from 'express';
import { contactSave } from '../controller/wp.controller.js';

const router = express.Router();

router.post('/contact', contactSave);
router.put('/contact/:id', contactSave);

export default router;
