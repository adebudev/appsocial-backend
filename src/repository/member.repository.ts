import { DBSource } from '../config/db.js';
import { Member } from '../entity/member.entity.js';

export const memberRepository = DBSource.getRepository(Member);