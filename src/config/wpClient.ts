import { config } from 'dotenv';
config(); // initialize env variables

import wp from 'whatsapp-web.js';
import QRCode from 'qrcode-terminal';
import { MongoStore } from 'wwebjs-mongo';
import mongoose = require('mongoose');

const { Client, RemoteAuth } = wp;

class WpClient {
    userId: string;
    constructor(userId) {2  
        this.userId = userId;
    }
    init(celNumber: string) {
        mongoose.connect(process.env.MONGO_DB_NAME).then(() => {
        const store = new MongoStore({ mongoose: mongoose });
        const client = new Client({
            authStrategy: new RemoteAuth({
                store: store,
                clientId: this.userId,
                backupSyncIntervalMs: 300000
            })
        });
        client.on('qr', (qr) => {
            QRCode.generate(qr, { small: true });
            // let qr_svg = qr.image(base64, { type: 'svg', margin: 4 });
            // qr_svg.pipe(require('fs').createWriteStream('./mediaSend/qr-code.svg'));
            console.log(`⚡ Recuerda que el QR se actualiza cada minuto ⚡'`);
            console.log(`⚡ Actualiza F5 el navegador para mantener el mejor QR⚡`);
        
            return Promise.resolve(qr);
        });
        
        client.on('ready', () => {
            console.log('Client is ready!');
        });
        client.initialize();

        client.on('remote_session_saved', () => {
            // Do Stuff...
            console.log('Session guardada')
        })
    });
    }
}

export { WpClient };