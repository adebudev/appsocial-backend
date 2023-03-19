// import { client } from '../adapter/wpClient.adapter.js';
// import {
//   getMessage,
//   responseMessage,
//   sendMessage,
// } from '../controller/wpMessage.controller.js';
// import { isBotActive } from '../controller/wp.controller.js';

export const run = async () => {
  try {
    // const isEnable = await isBotActive('43348653-d0d9-42eb-912a-c5d0923f401d');
    // await wpBot();
    // else {
    //   // await client.destroy();
    //   console.log('Close client');
    // }
  } catch (e) {
    console.log(e.message);
  }
};

// const listenMessage = () =>
//   client.on('message', async (msg) => {
//     const { from, body, hasMedia } = msg;
//     const message = body.toLowerCase();
//     console.log('BODY', message);

//     const step = await getMessage(message);
//     if (step) {
//       const message = await responseMessage(step);
//       await sendMessage(client, from, message);
//     }
//     // if (step) {
//     //     const response = await responseMessages(step);
//   });

export const wpBot = (client) => {
  client.on('ready', (a) => {
    console.log('Listo para escuchar mensajes');
    console.log('Client is ready!');
    console.log('🔴 escribe: hola');
  });

  client.on('auth_failure', (e) => {
    console.log('auth_failure');
    console.log(e);
  });

  client.initialize();
};
