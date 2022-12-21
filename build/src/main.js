import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import { DBSource } from './config/db.js';
import { run } from './helpers/bot.js';
import user from './routes/user.js';
import wp from './routes/wp.js';
import contact from './routes/contact.js';
config();
DBSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
    run();
})
    .catch((err) => {
    console.error('Error during Data Source initialization:', err);
});
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;
app.use('/api', user);
app.use('/api', wp);
app.use('/api', contact);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=main.js.map