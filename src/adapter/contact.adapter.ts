import { Contact } from '../entity/contact.entity.js';
import { contactRepository } from '../repository/contact.repository.js';

const save = async (data: Contact) => {
  let contact = new Contact();
  contact = { ...data };
  console.log('CONTACT: ', contact);

  return await contactRepository.save(contact);
};

export { save };
