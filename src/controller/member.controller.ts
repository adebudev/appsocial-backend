import Joi from '@hapi/joi';
import { get, getAll, save } from '../adapter/member.adapter.js';

const schemaMembershipRegister = Joi.object({
  type: Joi.string().min(4).max(255),
  state: Joi.boolean().required(),
  start_date: Joi.date().required(),
  exp_date: Joi.date().required(),
  user_id: Joi.string().guid().required(),
});

const memberRegister = async (req, res) => {
  try {
    const { error } = schemaMembershipRegister.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const response = await save(req.body);
    res.status(201).send({
      message: 'success',
      status: 201,
      data: {...response},
    });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({
      message: e.message,
      status: 400,
    });
  }
};

const getMemberships = async (req, res) => {
  try {
    const response = await getAll(req.body.userId);
    res.status(200).send({
      message: 'success',
      status: 200,
      data: response,
    });
  }
  catch (error) {
    console.log(error.message);
    res.status(400).send({
      message: error.message,
      status: 400,
    });
  }
}

const getMembership = async (req, res) => {
  try {
    const response = await get(req.params.id);
    res.status(200).send({
      message: 'success',
      status: 200,
      data: response,
    });
  }
  catch (error) {
    console.log(error.message);
    res.status(400).send({
      message: error.message,
      status: 400,
    });
  }
}

export { memberRegister, getMemberships, getMembership };