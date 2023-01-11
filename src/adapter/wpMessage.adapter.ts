import { WpMessage } from '../entity/wpMessage.entity.js';
import { stepsInitial } from '../flow/initial.js';
import { stepsResponse } from '../flow/response.js';
import { wpMessageRepository } from '../repository/wpMessage.repository.js';

const saveCampaign = async (data) => {
  let message = new WpMessage();
  message = { ...data };
  return await wpMessageRepository.save(message);
}

const saveMessage = async (data) => {
  let message = new WpMessage();
  message = { ...data };
  return await wpMessageRepository.save(message);
}

const get = (message: string) =>
  new Promise((resolve) => {
    const { key } = stepsInitial.find((k) => k.keywords.includes(message)) || {
      key: null,
    };
    const response = key || null;
    resolve(response);
  });

const reply = (step: string) =>
  new Promise((resolve) => {
    const { replyMessage } = stepsResponse.find(({ key }) => key === step);
    resolve(replyMessage.join(''));
  });

  export { get, reply, saveMessage, saveCampaign };