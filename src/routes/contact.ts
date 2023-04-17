import express from 'express';
import { contactSave, groupSaveData, contactUpdate, groupUp, getAllGroups, getGroupById, getContactsByGroup } from '../controller/contact.controller.js';

const router = express.Router();

router.post('/contact', contactSave);
router.put('/contact/:id', contactUpdate);
router.get('/contact-by-group/:id', getContactsByGroup);

router.get('/group', getAllGroups);
router.get('/group/:id', getGroupById);
router.post('/group', groupSaveData);
router.put('/group/:id', groupUp);

export default router;
