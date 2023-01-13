import { Post } from '../entity/post.entity.js';
import { publishRepository } from '../repository/post.repository.js';

const save = async (data) => {
  let post = new Post();
  post = { ...data };
  return await publishRepository.save(post);
};

export { save };
