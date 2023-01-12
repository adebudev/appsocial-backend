import { WpGroup } from '../entity/wpGroup.entity.js';
import { wpGroupRepository } from '../repository/wp.repository.js';
import { getUser } from './user.adapter.js';

const getGroup = async (id): Promise<WpGroup> => {
  const wpGroup = await wpGroupRepository.findOneBy({ id });
  if (!wpGroup) throw Error('Usuario no encontrado');

  return wpGroup;
}

const groupSave = async (data) => {
  let wpGroup = new WpGroup();
  wpGroup = { ...data };
  wpGroup.user = await getUser(data.user_id);
  await wpGroupRepository.save(wpGroup);

  return { id: wpGroup.id, name: wpGroup.name };
};

const groupUpdate = async (id, data) => {
  const groupUpdate: WpGroup = await wpGroupRepository.findOneBy({ id });
  if (!groupUpdate) throw Error('grupo no encontrado');
  groupUpdate.name = data.name;
  groupUpdate.contacts = data.contacts;
  return wpGroupRepository.save(groupUpdate);
};

export { groupSave, groupUpdate, getGroup };
