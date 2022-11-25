import express from 'express';
import { contactSave } from '../controller/wp.controller.js';

const router = express.Router();

router.post('/save-contact', contactSave);

export default router;
