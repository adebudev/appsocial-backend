import { config } from 'dotenv';
config(); // initialize env variables

import wp from 'whatsapp-web.js';
import { MongoStore } from 'wwebjs-mongo';
import mongoose from 'mongoose';

const { Client, RemoteAuth } = wp;

class WpClient {
  numberId: string;
  constructor(numberId) {
    this.numberId = numberId;
  }

  async init() {
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
          resolve(client);
        })
        .catch((e) => {
          console.log(e.message);
          reject(e);
        });
    });
    return client;
  }

  async getQr() {
    const clientInit: any = await this.init();
    const qr = new Promise((resolve, _) => {
      clientInit.on('qr', (qr) => {
        resolve(qr);
      });
      clientInit.initialize();
    });
    return qr;
  }
}

export { WpClient };
