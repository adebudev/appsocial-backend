import { config } from 'dotenv';
config(); // initialize env variables

import wp from 'whatsapp-web.js';
import QRCode from 'qrcode-terminal';
import { MongoStore } from 'wwebjs-mongo';
import mongoose = require('mongoose');

const { Client, RemoteAuth } = wp;

class WpClient {
  numberId: string;
  constructor(numberId) {
    this.numberId = numberId;
  }

  async init() {
    const client = new Promise((resolve, _) => {
      mongoose
        .connect(
          `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.srnepiq.mongodb.net/?retryWrites=true&w=majority`
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
        });
    });
    return client;
  }

  async getQr() {
    const clientInit: any = await this.init();
    const qr = new Promise((resolve, _) => {
      clientInit.on('qr', (qr) => {
        QRCode.generate(qr, { small: true });
        console.log(`⚡ Recuerda que el QR se actualiza cada minuto ⚡'`);
        console.log(`⚡ Actualiza F5 el navegador para mantener el mejor QR⚡`);

        resolve(qr);
      });
      clientInit.initialize();
    });
    return qr;
  }
}

export { WpClient };
