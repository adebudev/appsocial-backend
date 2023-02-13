import { isActive, turnOff, turnOn } from '../adapter/wpBot.adapter.js';

import { run } from '../helpers/bot.js';
import { wpGetQr } from '../helpers/wpFunctionality.js';

const getWpQr = async (req, res) => {
  try {
    const qr = await wpGetQr(req.wp_client);
    res.status(200).send(qr);
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

export { getWpQr, botEnable, botDisable, isBotActive };
