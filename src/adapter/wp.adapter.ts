import { WpGroup } from '../entity/wpGroup.entity.js';
import { wpGroupRepository } from '../repository/wp.repository.js';

const groupSave = async (data) => {
  let wpGroup = new WpGroup();
  wpGroup = { ...data };
  await wpGroupRepository.save(wpGroup);

  return { id: wpGroup.id, name: wpGroup.name };
};

export { groupSave };
