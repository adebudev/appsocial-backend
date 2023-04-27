import express from 'express';
import multer from 'multer';
import { getImageById, getImages, uploadNetworksImages } from '../controller/media.controller.js';

const router = express.Router();

const upload = multer();
router.post('/media/image', upload.single('file'), uploadNetworksImages);
router.get('/media/image/:id', getImageById);
router.get('/media/image', getImages);

export default router;
