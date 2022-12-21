import express from 'express';
import { userGetAll, userRegister, } from '../controller/user.controller.js';
const router = express.Router();
router.post('/user', userRegister);
router.get('/user', userGetAll);
export default router;
//# sourceMappingURL=user.js.map