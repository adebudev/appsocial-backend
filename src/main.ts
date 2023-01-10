import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';

import email from './routes/email.js';
import { DBSource } from './config/db.js';

import cookieParser from 'cookie-parser';

// import { DBSource } from './config/db.js';

// import { run } from './helpers/bot.js';
import user from './routes/user.js';
import wp from './routes/wp.js';
import contact from './routes/contact.js';

import support from './routes/support.js';
import suscription from './routes/suscription.js';

import login from './routes/login.js';
import { verifyToken } from './controller/token.controller.js';
// import { session } from './adapter/wpClient.adapter.js';
// import { client } from './adapter/wpClient.adapter.js';


config();

DBSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    // run();
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

  // session('3013771875');
// client.initialize();

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

app.use('/api', email);
app.use("/api", support);
app.use("/api",suscription);

app.use('/api', login);
app.use('/api', user);
app.use('/api', verifyToken, wp);
app.use('/api', verifyToken, contact);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
