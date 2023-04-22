import Joi from 'joi';
import {
  getAll,
  getCountActiveUsers,
  getCountInactiveUsers,
  getCountUsers,
  getUserById,
  register,
  sendEmailResetPassword,
  updatePassword,
  userUpdate,
} from '../adapter/user.adapter.js';
import { verifyTokenHelper } from '../helpers/verifyToken.js';

const schemaRegister = Joi.object({
  firstName: Joi.string().min(4).max(255).required(),
  lastName: Joi.string().min(4).max(255).required(),
  phone: Joi.string().min(7).max(7).required(),
  cellular: Joi.string().min(10).max(10).required(),
  username: Joi.string().min(4).max(255).required(),
  state: Joi.boolean(),
  gender: Joi.string().min(1).max(1).required(),
  born: Joi.date().required(),
  address: Joi.string().min(4).max(255),
  identification: Joi.string().min(6).max(12).required(),
  identificationType: Joi.string().min(1).max(10).required(),
  city: Joi.string().min(6).max(255),
  country: Joi.string().min(6).max(255),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
  rol: Joi.string(),
});
const schemaUserUpdate = Joi.object({
  firstName: Joi.string().min(4).max(255),
  lastName: Joi.string().min(4).max(255),
  phone: Joi.string().min(7).max(7),
  cellular: Joi.string().min(10).max(10),
  username: Joi.string().min(4).max(255),
  state: Joi.boolean(),
  gender: Joi.string().min(1).max(1),
  born: Joi.date(),
  address: Joi.string().min(4).max(255),
  identification: Joi.string().min(6).max(12),
  identificationType: Joi.string().min(1).max(10),
  city: Joi.string().min(6).max(255),
  country: Joi.string().min(6).max(255),
  email: Joi.string().min(6).max(255).email(),
  password: Joi.string().min(6).max(1024),
  rol: Joi.string(),
});

const schemaEmail = Joi.object({
  to: Joi.string().min(6).max(255).email(),
})

const userRegister = async (req, res) => {
  console.log(req.body);
  try {
    const { error } = schemaRegister.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await register(req.body);

    res.status(201).send({
      message: 'success',
      status: 201,
      data: { ...user },
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({
      message: error.message,
      status: 400,
    });
  }
};

const getUsers = async (_, res) => {
  try {
    const response = await getAll();
    res.status(200).send({
      message: 'success',
      status: 200,
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: error.message,
      status: 400,
    });
  }
};


const putUser = async (req, res) => {
  try {
    const { error } = schemaUserUpdate.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const response = await userUpdate(req.params.id, req.body);

    res.status(201).send({
      message: 'success',
      status: 201,
      data: { ...response },
    });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({
      message: e.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = getUserById(req.params.id);
    res.status(200).send({
      message: 'success',
      status: 200,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      message: error.message,
      status: 400,
    });
  }
};

const getUserByToken = async (req, res) => {
  try {
    console.log('auth_token', req.params?.auth_token)
    const verified = verifyTokenHelper(req.params?.auth_token);
    const user = await getUserById(verified.id);
    res.status(200).send({
      message: 'success',
      status: 200,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ error: 'token no es válido' });
  }
};

const dashboardUsers = async (_, res) => {
  try {
    const inactive_users = await getCountInactiveUsers();
    const active_users = await getCountActiveUsers();
    const all_users = await getCountUsers();
    res.status(200).send({
      message: 'success',
      status: 200,
      data: {
        inactive_users,
        active_users,
        all_users,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      message: error.message,
      status: 400,
    });
  }
};

const emailResetPassword = async (req, res) => {
  try {
    const { error } = schemaEmail.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const response = await sendEmailResetPassword(req.body);

    res.status(200).send({
      message: 'success',
      status: 200,
      data: response,
    });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({
      message: e.message,
    });
  }
};

const putPassword = async (req, res) => {
  try {
    const { error } = schemaUserUpdate.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const response = await updatePassword(req.user.id, req.body);
    res.status(200).send({
      message: 'success',
      status: 200,
      data: { ...response },
    });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({
      message: e.message,
    });
  }
};

export {
  userRegister,
  putUser,
  getUsers,
  getUser,
  getUserByToken,
  dashboardUsers,
  emailResetPassword,
  putPassword,
};
