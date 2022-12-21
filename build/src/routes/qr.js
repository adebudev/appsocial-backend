import express from 'express';
import { wpQR } from '../controller/wp.controller.js';
const router = express.Router();
router.get('/qr', wpQR);
export default router;
//# sourceMappingURL=qr.js.map