import { User } from '../entity/user.entity.js';
import { userRepository } from '../repository/user.repository.js';
const register = async (data) => {
    let user = new User();
    user = { ...data };
    const response = await userRepository.save(user);
    return {
        id: response.id,
        firstName: response.firstName,
        email: response.email,
    };
};
const mapUser = (user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    rol: user.rol,
});
const getAll = async () => {
    const users = await userRepository
        .createQueryBuilder('user')
        .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.rol',
    ])
        .getMany();
    const newUser = users.map((user) => mapUser(user));
    console.log(newUser);
    return;
};
export { register, getAll };
//# sourceMappingURL=user.adapter.js.map