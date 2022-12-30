import { Contact } from '../entity/contact.entity.js';
import { contactRepository } from '../repository/contact.repository.js';

const save = async (data: Contact) => {
  let contact = new Contact();
  contact = { ...data };
  return await contactRepository.save(contact);
};

const getAll = async (userId) => {
  const contacts: Contact[] = await contactRepository
    .createQueryBuilder('user')
    .where("user.id = :userId", { userId })
    .getMany();
  return contacts;
};

export { save, getAll };
