import Joi from '@hapi/joi';
import { getAll, register, updateUser } from '../adapter/user.adapter.js';

const schemaRegister = Joi.object({
  firstName: Joi.string().min(4).max(255).required(),
  lastName: Joi.string().min(4).max(255),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
  rol: Joi.string()
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
  } catch (e) {
    console.log(e.message);
    res.status(400).send({
      message: e.message,
      status: 400,
    });
  }
};

const userGetAll = async (req, res) => {
  try {
    const response = await getAll();
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
  }
};



const userUpdate = async (req, res) => {
  try {
   // const { error } = schemaRegister.validate(req.body);

  // if (error) {
  //    return res.status(400).json({ error: error.details[0].message });
  //  }
     await updateUser(req.body);

    res.status(201).send({
      message: 'success',
      status: 201,
      data: {
        
      },
    });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({
      message: e.message,
      status: 400,
    });
  }
};


export { userRegister, userGetAll, userUpdate};
