import { DBSource } from '../config/db.js';
import { Contact } from '../entity/contact.entity.js';
export const contactRepository = DBSource.getRepository(Contact);
//# sourceMappingURL=contact.repository.js.map