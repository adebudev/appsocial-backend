import { Post } from '../entity/post.entity.js';
import { postRepository } from '../repository/post.repository.js';

const save = async (data) => {
  let post = new Post();
  post = { ...data };
  return await postRepository.save(post);
};

export { save };
