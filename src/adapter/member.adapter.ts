import { Member } from '../entity/member.entity.js';
import { memberRepository } from '../repository/member.repository.js';
import { getUser } from './user.adapter.js';

const save = async (data) => {
  let membership = new Member();
  
  membership = { ...data };
  membership.user = await getUser(data.user_id);
  const { id, start_date, exp_date } = await memberRepository.save(membership);

  return {
    id,
    start_date,
    exp_date,
  };
};

const update = async (id, data) => {
  const updateMembership = await memberRepository.findOneBy({ id });
  if (!updateMembership) throw Error('id no encontrado');
  
  updateMembership.state = data.state;
  updateMembership.type = data.type;
  updateMembership.start_date = data.start_date;
  updateMembership.exp_date = data.exp_date;
  const membership = memberRepository.save(updateMembership)
  return membership;
}

const getAll = async (userId) => {
  const membership: Member[] = await memberRepository
  .createQueryBuilder('member')
  .where("member.userId = :userId", { userId })
  .getMany();
  if (!membership) throw Error('data no encontrada');

return membership;
}

const get = async (id) => {
  const membership: Member = await memberRepository.findOneBy({ id });
  if (!membership) throw Error('membership no encontrado');

  return membership;
};

const remove = async (id) => {
  const membership: Member = await memberRepository.findOneBy({ id });
  if (!membership) throw Error('membership no encontrado');
  memberRepository.remove(membership);
  return memberRepository.remove(membership);
}

export { save, update, getAll, get, remove };
