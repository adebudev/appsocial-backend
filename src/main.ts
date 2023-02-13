import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';

import email from './routes/email.js';
import { DBSource } from './config/db.js';

import cookieParser from 'cookie-parser';

import user from './routes/user.js';
import dashboard from './routes/dashboard.js';
import wp from './routes/wp.js';
import contact from './routes/contact.js';
import support from './routes/support.js';
import member from './routes/member.js';
import login from './routes/login.js';
import signup from './routes/register.js';

import { verifyToken } from './middleware/verify_token.js';
import { wpMiddleware } from './middleware/wp_client.js';

config();

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 6001;

DBSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.use('/api/wp', verifyToken, wpMiddleware, wp);
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

app.use('/api', email);

/* PUBLIC ROUTES*/
app.use('/api', signup);
app.use('/api', login);

/* PRIVATE ROUTES*/
app.use('/api', verifyToken, user);
app.use('/api', verifyToken, dashboard);
app.use('/api', verifyToken, contact);
app.use('/api', verifyToken, member);
app.use('/api', verifyToken, support);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
