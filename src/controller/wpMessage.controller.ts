import {
  geMessageById,
  getAllMessages,
  reply,
  saveMsg,
} from '../adapter/wpMessage.adapter.js';

const getMessages = async (req, res) => {
  try {
    const response = await getAllMessages(req.body.userId);
    res.status(200).send({
      message: 'success',
      data: response,
    });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({
      message: e.message,
      status: 400,
    });
  }
};

const getMessage = async (req, res) => {
  try {
    const response = await geMessageById(req.params.id);
    res.status(200).send({
      message: 'success',
      data: response,
    });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({
      message: e.message,
      status: 400,
    });
  }
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

const sendMessage = async (client, number = null, text = null) => {
  setTimeout(async () => {
    const message = text;
    client.sendMessage(number, message);
    // await readChat(number, message, trigger);
    console.log(`⚡⚡⚡ Enviando mensajes....`);
  }, 170);
};

const saveMessage = async (req, res) => {
  try {
    // const { error } = .validate(req.body);
    // if (error) {
    //   return res.status(400).json({ error: error.details[0].message });
    // }
    const response = await saveMsg(req.body);
    res.status(201).send({
      message: 'success',
      status: 201,
      data: { ...response },
    });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({
      message: e.message,
      status: 400,
    });
  }
};

export { saveMessage, getMessages, getMessage, sendMessage, responseMessage };
