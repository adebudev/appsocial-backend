
import { supportRepository } from '../repository/support.repository.js';
import { Support } from '../entity/support.js';

export const save = async (data) => {
  let support = new Support();
  support = { ...data };
  const response: Support = await supportRepository.save(support);

  return {
    id: response.id,
    title: response.title,
    description: response.description,
  };
};
