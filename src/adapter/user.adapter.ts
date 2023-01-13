import bcrypt from 'bcrypt';
import { User } from '../entity/user.entity.js';
import { userRepository } from '../repository/user.repository.js';

const mapUser = (user: User) => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  phone: user.phone,
  cellular: user.cellular,
  username: user.username,
  gender: user.gender,
  born: user.born,
  address: user.address,
  identification: user.identification,
  city: user.city,
  country: user.country,
  email: user.email,
  rol: user.rol,
});

const register = async (data: User) => {
  const isEmailExist = await userRepository.findOneBy({ email: data.email });
  if (isEmailExist) {
    throw Error('Email ya registrado');
  }
  let user = new User();
  user = { ...data };
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(data.password, salt);
  user.password = password;
  const response: User = await userRepository.save(user);

  return mapUser(response);
};

const getAll = async () => {
  const users: User[] = await userRepository
    .createQueryBuilder('user')
    .select([
      'user.id',
      'user.firstName',
      'user.lastName',
      'user.phone',
      'user.cellular',
      'user.username',
      'user.gender',
      'user.born',
      'user.address',
      'user.identification',
      'user.city',
      'user.country',
      'user.email',
      'user.rol',
    ])
    .getMany();
  return users.map((user) => mapUser(user));
};

const getUserSession = async (data: User) => {
  const user = await userRepository.findOneBy({ email: data.email });
  if (!user) throw Error('Usuario no encontrado');

  const validPassword = await bcrypt.compare(data.password, user.password);
  if (!validPassword) throw Error('contraseña no válida');

  return mapUser(user);
};

async function updatePassword(data) {
  const updateUser = await userRepository.findOneBy({ id: data.id });
  if (!updateUser) throw Error('id no encontrado');
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(data.password, salt);
  updateUser.password = password;
  const user = await userRepository.save(updateUser);
  return mapUser(user);
}

async function update(id: string, data: User) {
  const updateUser: User = await userRepository.findOneBy({ id });
  if (!updateUser) throw Error('id no encontrado');

  updateUser.firstName = data.firstName;
  updateUser.lastName = data.lastName;
  updateUser.email = data.email;
  updateUser.password = data.password;
  updateUser.rol = data.rol;
  const user = await userRepository.save(updateUser);
  return mapUser(user);
}

const getUserById = async (id) => {
  const user = await userRepository.findOneBy({ id });
  if (!user) throw Error('Usuario no encontrado');

  return mapUser(user);
};

const getUser = async (id): Promise<User> => {
  const user = await userRepository.findOneBy({ id });
  if (!user) throw Error('Usuario no encontrado');

  return user;
}

export { register, update, updatePassword, getAll, getUserSession, getUserById, getUser };
