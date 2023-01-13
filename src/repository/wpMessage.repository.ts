import { DBSource } from '../config/db.js';
import { WpMessage } from '../entity/wpMessage.entity.js';

export const wpMessageRepository = DBSource.getRepository(WpMessage);