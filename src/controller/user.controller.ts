import jwt from 'jsonwebtoken';
import Joi from 'joi';
import {
  getAll,
  getUserById,
  register,
  update,
} from '../adapter/user.adapter.js';

const schemaRegister = Joi.object({
  firstName: Joi.string().min(4).max(255).required(),
  lastName: Joi.string().min(4).max(255).required(),
  phone: Joi.string().min(7).max(7),
  celular: Joi.string().min(10).max(10).required(),
  username: Joi.string().min(4).max(255).required(),
  gender: Joi.string().min(1).max(1).required(),
  bord: Joi.date().required(),
  address: Joi.string().min(4).max(255),
  identification: Joi.string().min(6).max(12).required(),
  identificationType: Joi.string().min(4).max(255).required(),
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
  celular: Joi.string().min(10).max(10),
  username: Joi.string().min(4).max(255),
  gender: Joi.string().min(1).max(1),
  bord: Joi.date(),
  address: Joi.string().min(4).max(255),
  identification: Joi.string().min(6).max(12),
  identificationType: Joi.string().min(4).max(255),
  city: Joi.string().min(6).max(255),
  country: Joi.string().min(6).max(255),
  email: Joi.string().min(6).max(255).email(),
  password: Joi.string().min(6).max(1024),
  rol: Joi.string(),
});

const userRegister = async (req, res) => {
  try {
    const { error } = schemaRegister.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { id, firstName, email } = await register(req.body);

    res.status(201).send({
      message: 'success',
      status: 201,
      data: {
        id,
        firstName,
        email,
      },
    });
  } catch (error) {
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

const userUpdate = async (req, res) => {
  try {
    const { error } = schemaUserUpdate.validate(req.body);
    if (error) {
       return res.status(400).json({ error: error.details[0].message });
     }

    const response = await update(req.params.id, req.body);

    res.status(201).send({
      message: 'success',
      status: 201,
      data: {...response},
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
  if (!req.cookies?.auth_token)
    return res.status(401).json({ error: 'Acceso denegado' });
  try {
    const verified = jwt.verify(
      req.cookies?.auth_token,
      process.env.TOKEN_SECRET
    );
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

export { userRegister, userUpdate, getUsers, getUser, getUserByToken };
