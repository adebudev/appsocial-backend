import QRCode from 'qrcode-terminal';
import { save } from '../adapter/contact.adapter.js';
import { groupSave } from '../adapter/wp.adapter.js';
import { isActive, turnOff, turnOn } from '../adapter/wpBot.adapter.js';

import { client } from '../adapter/wpClient.adapter.js';
import { run } from '../helpers/bot.js';

const wpQR = (req, res) => {
  client.on('qr', (qr) => {
    QRCode.generate(qr, { small: true });
    res.send(qr);
    // let qr_svg = qr.image(base64, { type: 'svg', margin: 4 });
    // qr_svg.pipe(require('fs').createWriteStream('./mediaSend/qr-code.svg'));
    console.log(`⚡ Recuerda que el QR se actualiza cada minuto ⚡'`);
    console.log(`⚡ Actualiza F5 el navegador para mantener el mejor QR⚡`);
  });
};

const contactSave = async (req, res) => {
  try {
    const { id, name, number } = await save(req.body);
    res.status(201).send({
      message: 'success',
      status: 201,
      data: {
        id,
        name,
        number,
      },
    });
  } catch (e) {
    res.status(400).send({
      message: e.message,
      status: 400,
    });
  }
};

const groupNew = async (req, res) => {
  try {
    const { id, name } = await groupSave(req.body);
    res.status(201).send({
      message: 'success',
      status: 201,
      data: {
        id,
        name,
      },
    });
  } catch (e) {
    res.status(400).send({
      message: e.message,
      status: 400,
    });
  }
};

const botEnable = async (req, res) => {
  try {
    await turnOn(req.body.id, req.body.userId);
    res.status(200).send({
      message: 'bot activado',
      status: 200,
    });
    run();
  } catch (e) {
    res.status(400).send({
      message: e.message,
      status: 400,
    });
  }
};

const botDisable = async (req, res) => {
  try {
    await turnOff(req.body.id, req.body.user);
    res.status(200).send({
      message: 'bot desactivado',
      status: 200,
    });
    run();
  } catch (e) {
    res.status(400).send({
      message: e.message,
      status: 400,
    });
  }
};

const isBotActive = async (userId: string) => {
  try {
    return isActive(userId);
  } catch (e) {
    return new Error(e.message);
  }
};

export { wpQR, contactSave, botEnable, botDisable, isBotActive };
