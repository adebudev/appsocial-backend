import { config } from 'dotenv';
config(); // initialize env variables

import wp from 'whatsapp-web.js';
import mongoose from 'mongoose';
import { MongoStore } from 'wwebjs-mongo';
import PinoLogger from 'pino';

const { Client, RemoteAuth } = wp;

mongoose.set('strictQuery', true);

class WpClient {
  numberId: string;
  userId: string;
  logger: any

  constructor(numberId, userId) {
    this.logger = PinoLogger.default({ name: 'WpClient config' });
    this.numberId = numberId;
    this.userId = userId;
  }

  async init() {
    try {
      const client = new Promise((resolve, reject) => {
        mongoose
          .connect(
            `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB_NAME}`
          )
          .then(() => {
            const store = new MongoStore({ mongoose: mongoose });
            const client = new Client({
              authStrategy: new RemoteAuth({
                store: store,
                clientId: this.numberId,
                backupSyncIntervalMs: 300000,
              }),
            });
            const logger = this.logger.child({ clientId: this.numberId, userId: this.userId });
            logger.info('client initialized!');
            resolve(client);
          })
          .catch((err) => {
            console.error(err.message);
            reject(err);
            this.logger.error(err);
          });
      });
      return client;
    } catch (err) {
      console.error(err);
      this.logger.error(err);
    }
  }

  getClient() {
    return this.init();
  }

  async getQr() {
    const clientInit: any = await this.init();
    const qr = new Promise((resolve, _) => {
      clientInit.on('qr', (qr) => {
        resolve(qr);
      });
      clientInit.on('remote_session_saved', () => {
        console.log('La session ha sido guardada Exitosamente!');
        resolve('remote session saved!');
      });

      clientInit.initialize();
    });
    return qr;
  }

  async sendMessage(callback) {
    const clientInit: any = await this.init();
    await clientInit.on('ready', () => {
      console.log('Client is ready!');
      callback();
    });
  }

  async botReply() {
    const clientInit: any = await this.init();
    clientInit.on('message', (message) => {
      console.log(message.body);
    });
  }
}

export { WpClient };
