import { WpGroup } from '../entity/wpGroup.entity.js';
import { wpGroupRepository } from '../repository/wp.repository.js';
import { getUser } from './user.adapter.js';

const getGroups = async (userId): Promise<WpGroup[]> => {
  const groups: WpGroup[] = await wpGroupRepository
  .createQueryBuilder('wpGroup')
  .where("wpGroup.userId = :userId", { userId })
  .getMany();
return groups;
}

const getGroupById = async (userId): Promise<WpGroup[]> => {
  const groups: WpGroup[] = await wpGroupRepository
  .createQueryBuilder('wpGroup')
  .where("wpGroup.userId = :userId", { userId })
  .getMany();
return groups;
}

const getGroup = async (id): Promise<WpGroup> => {
  const wpGroup = await wpGroupRepository.findOneBy({ id });
  if (!wpGroup) throw Error('Grupo no encontrado');

  return wpGroup;
}

const getGroupWithContacts = async () => {
  const questions = await wpGroupRepository.createQueryBuilder("contact")
    .leftJoinAndSelect("contact.wpGroup", "wpGroup")
    .getMany();
    return questions;
}

const groupSave = async (data) => {
  let wpGroup = new WpGroup();
  wpGroup = { ...data };
  wpGroup.user = await getUser(data.user_id);
  const { id, name } = await wpGroupRepository.save(wpGroup);

  return { id, name };
};

const groupUpdate = async (groupId, data) => {
  const groupUpdate: WpGroup = await wpGroupRepository.findOneBy({ id: groupId });
  if (!groupUpdate) throw Error('Grupo no encontrado');
  groupUpdate.name = data.name;
  groupUpdate.contacts = data.contacts;
  const { id, name } = await wpGroupRepository.save(groupUpdate);
  return { id, name };
};

export { groupSave, groupUpdate, getGroups, getGroup, getGroupWithContacts };
