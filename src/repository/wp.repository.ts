import { DBSource } from '../config/db.js';
import { WpBot } from '../entity/wpBot.entity.js';
import { WpGroup } from '../entity/wpGroup.entity.js';

const wpBotRepository = DBSource.getRepository(WpBot);

const wpGroupRepository = DBSource.getRepository(WpGroup);

export { wpBotRepository, wpGroupRepository };
