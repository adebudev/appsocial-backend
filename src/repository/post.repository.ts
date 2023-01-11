import { DBSource } from '../config/db.js';
import { Post } from '../entity/post.entity.js';

export const postRepository = DBSource.getRepository(Post);