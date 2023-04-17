import { DBSource } from '../config/db.js';
import { NetworkTokens } from '../entity/NetworkTokens.entity.js';

export const networkTokenRepository = DBSource.getRepository(NetworkTokens);