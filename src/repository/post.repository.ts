import { DBSource } from '../config/db.js';
import { Publish } from '../entity/publish.entity.js';

export const publishRepository = DBSource.getRepository(Publish);