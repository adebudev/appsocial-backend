import { WpMessage } from '../entity/wpMessage.entity.js';
import { stepsInitial } from '../flow/initial.js';
import { stepsResponse } from '../flow/response.js';
import { wpMessageRepository } from '../repository/wpMessage.repository.js';
import { getUser } from './user.adapter.js';

const saveCampaign = async (data) => {
  let message = new WpMessage();
  message = { ...data };
  message.user = await getUser(data.user_id);
  return await wpMessageRepository.save(message);
};

const saveMsg = async (data) => {
  let message = new WpMessage();
  message = { ...data };
  message.user = await getUser(data.user_id);
  const msg = await wpMessageRepository.save(message);
  return {
    id: msg.id,
    name: msg.name,
    keywords: msg.keywords,
    reply: msg.reply,
    status: msg.status,
  };
};

const getAllMessages = async (userId) => {
  const messages: WpMessage[] = await wpMessageRepository
    .createQueryBuilder('wpMessage')
    .where('wpMessage.userId = :userId', { userId })
    .getMany();
  return messages;
};

const geMessageById = async (id) => {
  const messages: WpMessage[] = await wpMessageRepository
    .createQueryBuilder('wpMessage')
    .where('wpMessage.id = :id', { id })
    .getMany();
  return messages;
};

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

export { get, reply, saveMsg, saveCampaign, getAllMessages, geMessageById };
