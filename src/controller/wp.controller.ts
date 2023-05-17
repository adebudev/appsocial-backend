import { isActive, turnOff, turnOn } from '../adapter/wpBot.adapter.js';

import { run, wpBot } from '../helpers/bot.js';
import { wpGetQr, wpStatus, wpUserInfo } from '../helpers/wpFunctionality.js';

const getWpQr = async (req, res) => {
  try {
    let QR = '';
    const status = await wpStatus(req.wp_client);
    if (status) throw Error('No se puede generar QR ya tiene una sesion abierta');
    QR = await wpGetQr(req.wp_client);
    
    res.status(200).send({
      qrCode: QR,
      statusSession: status,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: e.message });
  }
};

const getWpUserInfo = async (req, res) => {
  try {
    console.log(wpUserInfo(req.wp_client));
    
    res.status(200).send('');
  }
  catch (e) {
    console.log(e);
    res.status(400).send({ message: e.message });
  }
}

const botEnable = async (req, res) => {
  try {
    await turnOn(req.body.id, req.body.userId);
    res.status(200).send({ message: 'bot activado' });
    wpBot(req.wp_client);
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
    res.status(200).send({ message: 'bot desactivado' });
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

export { getWpQr, getWpUserInfo, botEnable, botDisable, isBotActive };
