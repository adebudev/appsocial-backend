import { Publish } from '../entity/publish.entity.js';
import { publishRepository } from '../repository/post.repository.js';

const save = async (data) => {
  let post = new Publish();
  post = { ...data };
  return await publishRepository.save(post);
};

export { save };
