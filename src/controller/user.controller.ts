import jwt from 'jsonwebtoken';
import Joi from '@hapi/joi';
import {
  getAll,
  getUserById,
  register,
  update,
} from '../adapter/user.adapter.js';

const schemaRegister = Joi.object({
  firstName: Joi.string().min(4).max(255).required(),
  lastName: Joi.string().min(4).max(255),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
  rol: Joi.string(),
});

const schemaUserById = Joi.object({});

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

const getUsers = async (req, res) => {
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
    // const { error } = schemaRegister.validate(req.body);

    // if (error) {
    //    return res.status(400).json({ error: error.details[0].message });
    //  }
    await update(req.body);

    res.status(201).send({
      message: 'success',
      status: 201,
      data: {},
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
