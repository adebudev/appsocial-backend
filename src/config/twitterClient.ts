import { config } from 'dotenv';
config(); // initialize env variables

import { TwitterApi } from 'twitter-api-v2';

// export const oauth = new OAuth({
//   consumer: {
//     key: process.env.CONSUMER_KEY,
//     secret: process.env.CONSUMER_SECRET,
//   },
//   signature_method: 'HMAC-SHA1',
//   hash_function: (baseString, key) =>
//     createHmac('sha1', key).update(baseString).digest('base64'),
// });

export const TWclient = new TwitterApi({ appKey: process.env.CONSUMER_KEY, appSecret: process.env.CONSUMER_SECRET });

export const TWclientV2 = new TwitterApi({ clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET });