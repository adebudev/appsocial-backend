import express from 'express';
import { contactSave, group, contactUpdate, groupUp } from '../controller/contact.controller.js';

const router = express.Router();

router.post('/contact', contactSave);
router.put('/contact/:id', contactUpdate);

router.post('/group', group);
router.put('/group/:id', groupUp);

export default router;
