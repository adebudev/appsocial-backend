import express from 'express';
import { PublishTweet, twitterToken } from '../controller/twitter.controller.js';

const router = express.Router();

router.get('/twitter', twitterToken);
router.post('/twitter', PublishTweet);

export default router;
