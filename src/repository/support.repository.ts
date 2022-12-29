import { DBSource } from '../config/db.js';
import { Support } from '../entity/support.js';

export const supportRepository = DBSource.getRepository(Support);