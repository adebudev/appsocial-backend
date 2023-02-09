import express from 'express';
import {
    dashboardUsers,
} from '../controller/user.controller.js';

const router = express.Router();

router.get('/dashboard/', dashboardUsers);

export default router;
