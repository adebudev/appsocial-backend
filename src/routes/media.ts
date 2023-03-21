import express from 'express';
import multer from 'multer';
import { uploadNetworksImages } from '../controller/media.controller.js';

const router = express.Router();

const upload = multer();
router.post('/media/image', upload.single('file'), uploadNetworksImages);

export default router;
