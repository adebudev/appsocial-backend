import { DBSource } from '../config/db.js';
import { Media } from '../entity/media.entity.js';

export const mediaRepository = DBSource.getRepository(Media);