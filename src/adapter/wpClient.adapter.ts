import wpClient from 'whatsapp-web.js';
import QRCode from 'qrcode-terminal';
import { MongoStore } from 'wwebjs-mongo';
import mongoose = require('mongoose');

const { Client, RemoteAuth } = wpClient;

export const session = function (celNumber) {
    const pass = 'zEpB30NaJCeIZjYy';
    const user = 'test-user';
    mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0.srnepiq.mongodb.net/?retryWrites=true&w=majority`).then(() => {
        const store = new MongoStore({ mongoose: mongoose });
        const client = new Client({
            authStrategy: new RemoteAuth({
                store: store,
                clientId: celNumber,
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

    // sessions[number].on('qr', async (qr) => {
    //   QRCode.generate(qr, { small: true });
    //   console.log(`⚡ Recuerda que el QR se actualiza cada minuto ⚡'`);
    //   console.log(`⚡ Actualiza F5 el navegador para mantener el mejor QR⚡`);
  
    //   // return Promise.resolve(qr);
    // });

    // sessions[number].initialize();

   // Save session values to the file upon successful auth

    // return sessions[number];
};

// export const QR = async () => {
//   await client.on('qr', async (qr) => {
//     QRCode.generate(qr, { small: true });
//     // let qr_svg = qr.image(base64, { type: 'svg', margin: 4 });
//     // qr_svg.pipe(require('fs').createWriteStream('./mediaSend/qr-code.svg'));
//     console.log(`⚡ Recuerda que el QR se actualiza cada minuto ⚡'`);
//     console.log(`⚡ Actualiza F5 el navegador para mantener el mejor QR⚡`);

//     return Promise.resolve(qr);
//   });
//   return '';
// }