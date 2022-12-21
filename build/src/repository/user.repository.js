import { DBSource } from '../config/db.js';
import { User } from '../entity/user.entity.js';
export const userRepository = DBSource.getRepository(User);
//# sourceMappingURL=user.repository.js.map