import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';

import email from './routes/email.js';
import { DBSource } from './config/db.js';

import cookieParser from 'cookie-parser';

import user from './routes/user.js';
import wp from './routes/wp.js';
import contact from './routes/contact.js';

import support from './routes/support.js';
import member from './routes/member.js';

import login from './routes/login.js';
import { verifyToken } from './controller/token.controller.js';
// import { WpClient } from './config/wpClient.js';

config();

DBSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    // run();
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

// const client = new WpClient('3013771875');
// console.log(await client.getQr())

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 6001;

app.use('/api', email);
app.use('/api', support);
app.use('/api', member);

app.use('/api', login);
app.use('/api', user);
app.use('/api', verifyToken, wp);
app.use('/api', verifyToken, contact);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
