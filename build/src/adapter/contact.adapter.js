import { Contact } from '../entity/contact.entity.js';
import { contactRepository } from '../repository/contact.repository.js';
const save = async (data) => {
    let contact = new Contact();
    contact = { ...data };
    console.log('CONTACT: ', contact);
    return await contactRepository.save(contact);
};
export { save };
//# sourceMappingURL=contact.adapter.js.map