import bcrypt from 'bcrypt';
import { User } from '../entity/user.entity.js';
import { userRepository } from '../repository/user.repository.js';

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

  return {
    id: response.id,
    firstName: response.firstName,
    email: response.email,
  };
};

const mapUser = (user: User) => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  rol: user.rol,
});

const getAll = async () => {
  const users: User[] = await userRepository
    .createQueryBuilder('user')
    .select([
      'user.id',
      'user.firstName',
      'user.lastName',
      'user.email',
      'user.rol',
    ])
    .getMany();
  return users.map((user) => mapUser(user));
};



const getUser = async (data: User) => {
  const user = await userRepository.findOneBy({ email: data.email });
  console.log(data.email)
  if (!user) throw Error('Usuario no encontrado');

  const validPassword = await bcrypt.compare(data.password, user.password);
  if (!validPassword) throw Error('contraseña no válida');

  return user;
};



async function updateUser(data) {

  const updateUser = await userRepository.findOneBy({
    id: data.id,
  });
  updateUser.firstName = "elver",
    updateUser.lastName = "gonzale",
    // userToUpdate.email =(req.body),
    //updateUser.password = "",
    //updateUser.rol = ""
    await userRepository.save(updateUser);

}

export { register, getAll, getUser, updateUser};
