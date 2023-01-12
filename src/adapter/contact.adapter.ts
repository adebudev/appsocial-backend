import { Contact } from '../entity/contact.entity.js';
import { contactRepository } from '../repository/contact.repository.js';
import { getGroup } from './wp.adapter.js';

const save = async (data) => {
  let contact = new Contact();
  contact = { ...data };
  contact.wpGroup = [await getGroup(data.group_id)];
  return contactRepository.save(contact);
};

const update = async (data: Contact) => {
  const updateContact: Contact = await contactRepository.findOneBy({ id: data.id });
  if (!updateContact) throw Error('id no encontrado');

  updateContact.name = data.name;
  updateContact.number = data.number;
  await contactRepository.save(updateContact);
}

const getAll = async (userId) => {
  const contacts: Contact[] = await contactRepository
    .createQueryBuilder('user')
    .where("user.id = :userId", { userId })
    .getMany();
  return contacts;
};

const remove = async (id) => {
  const contact: Contact = await contactRepository.findOneBy({ id });
  if (!contact) throw Error('membership no encontrado');
  contactRepository.remove(contact);
  return contactRepository.remove(contact);
}

export { save, getAll, update, remove };
