import { User } from '../entity/user.entity.js';
import { WpBot } from '../entity/wpBot.entity.js';
import { userRepository } from '../repository/user.repository.js';
import { wpBotRepository } from '../repository/wp.repository.js';

const isActive = async (userId: string) => {
  const bot = await wpBotRepository
    .createQueryBuilder('wp_bot')
    .innerJoin('wp_bot.user', 'user')
    .where('user.id = :userId', { userId })
    .getOne();

  return bot.state;
};

const turnOn = async (id: number, userId: string) => {
  const user: User = await userRepository.findOneBy({ id: userId });
  const botUpdate = await wpBotRepository.findOneBy({
    id,
  });
  if (!botUpdate) {
    const bot = new WpBot();
    bot.state = true;
    bot.user = user;

    await wpBotRepository.save(bot);
  } else {
    botUpdate.state = true;

    await wpBotRepository.save(botUpdate);
  }
};

const turnOff = async (id: number, userId: string) => {
  const user: User = await userRepository.findOneBy({ id: userId });
  const botUpdate: WpBot = await wpBotRepository.findOneBy({
    id,
  });
  if (!botUpdate) {
    const bot = new WpBot();
    bot.state = false;
    bot.user = user;

    await wpBotRepository.save(bot);
  } else {
    botUpdate.state = false;

    await wpBotRepository.save(botUpdate);
  }
};

export { isActive, turnOn, turnOff };
