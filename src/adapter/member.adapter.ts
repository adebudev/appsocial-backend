import { Member } from '../entity/member.entity.js';
import { memberRepository } from '../repository/member.repository.js';

export const save = async (data) => {
  let suscrip = new Member();
  suscrip = { ...data };
  const response: Member= await memberRepository.save(suscrip);

  return {
    id: response.id,
    title: response.start_date,
    description: response.exp_date,
  };
};