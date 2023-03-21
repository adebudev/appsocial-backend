import { randomUUID } from 'crypto';
import { FILE_EXTENSION } from './regex.js';

export const getFileExtension = (originalname: string): string => {
    const uuid = randomUUID();
  return uuid + originalname.match(FILE_EXTENSION)[0];
};
