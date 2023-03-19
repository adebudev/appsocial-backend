import { config } from 'dotenv';
config(); // initialize env variables

import { createHmac } from 'crypto';
import OAuth from 'oauth-1.0a';

export const oauth = new OAuth({
  consumer: {
    key: process.env.CONSUMER_KEY,
    secret: process.env.CONSUMER_SECRET,
  },
  signature_method: 'HMAC-SHA1',
  hash_function: (baseString, key) =>
    createHmac('sha1', key).update(baseString).digest('base64'),
});
