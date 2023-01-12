import { get, reply } from '../adapter/wpMessage.adapter.js';

const getMessage = async (message: string) => {
  const data = await get(message);
  return data;
};

const responseMessage = async (step) => {
  const message = await reply(step);
  return message;
};

// const cleanNumber = (number) => {
//   number = number.replace('@c.us', '');
//   number = `${number}@c.us`;
//   return number;
// };

// const readChat = async (number, message, trigger = null) => {
//   //   number = cleanNumber(number);
//   // await saveMessage( message, trigger, number )
//   console.log('Saved message: ', message);
// };

const sendMessage = async (
  client,
  number = null,
  text = null
) => {
  setTimeout(async () => {
    const message = text;
    client.sendMessage(number, message);
    // await readChat(number, message, trigger);
    console.log(`⚡⚡⚡ Enviando mensajes....`);
  }, 170);
};

export { getMessage, sendMessage, responseMessage };
