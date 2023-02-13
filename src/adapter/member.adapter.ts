import { Member } from '../entity/member.entity.js';
import { memberRepository } from '../repository/member.repository.js';
import { getUser, userUpdate } from './user.adapter.js';

const save = async (data) => {
  let membership = new Member();
  membership = { ...data };
  membership.user = await getUser(data.user_id);
  const { id, start_date, exp_date, state } = await memberRepository.save(
    membership
  );
  const userData = await userUpdate(data.user_id, { state: true });
  return {
    id,
    start_date,
    exp_date,
    state,
    user: {
      id: userData.id,
      firstName: userData.firstName,
    },
  };
};

const update = async (memberId, data) => {
  const updateMembership = await memberRepository.findOneBy({ id: memberId });
  if (!updateMembership) throw Error('id no encontrado');

  updateMembership.state = data.state;
  updateMembership.type = data.type;
  updateMembership.start_date = data.start_date;
  updateMembership.exp_date = data.exp_date;
  const { id, start_date, exp_date, state } = await memberRepository.save(
    updateMembership
  );
  const userData = await userUpdate(data.user_id, { state: data.state });

  return {
    id,
    start_date,
    exp_date,
    state,
    user: {
      id: userData.id,
      firstName: userData.firstName,
    },
  };
};

const getByUser = async (userId) => {
  const membership: Member = await memberRepository
    .createQueryBuilder('member')
    .where('member.userId = :userId', { userId })
    .getOne();
  if (!membership) throw Error('data no encontrada');

  return membership;
};

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
};

const getInactiveMembers = async () => {
  const users = await memberRepository
    .createQueryBuilder('member')
    .where('member.state = :state', { state: false })
    .getCount();

  return users;
};

export { save, update, getByUser, get, remove, getInactiveMembers };
