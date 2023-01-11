import { supportRepository } from '../repository/support.repository.js';
import { Support } from '../entity/support.js';
import { getUser } from './user.adapter.js';

const save = async (data) => {
  let support = new Support();
  support = { ...data };
  support.user = await getUser(data.user_id);
  const { 
    id,
    title,
    state,
    start_date,
    exp_date
  }: Support = await supportRepository.save(support);

  return {
    id,
    title,
    state,
    start_date,
    exp_date,
  };
};

const update = async (id, data: Support): Promise<Support> => {
  const updateSupport = await supportRepository.findOneBy({ id });
  if (!updateSupport) throw Error('id no encontrado');
  updateSupport.title = data.title;
  updateSupport.description = data.description;
  updateSupport.state = data.state;
  updateSupport.start_date = data.start_date;
  updateSupport.exp_date = data.exp_date;
  return supportRepository.save(updateSupport);
}

const getAll = async (userId) => {
  const support: Support[] = await supportRepository
  .createQueryBuilder('support')
  .where("support.userId = :userId", { userId })
  .getMany();
return support;
}

const get = async (id) => {
  const support = await supportRepository.findOneBy({ id });
  if (!support) throw Error('membership no encontrado');

  return support;
}

export { save, update, get, getAll };