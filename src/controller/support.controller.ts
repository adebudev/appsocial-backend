import Joi from 'joi';
import { save, update } from '../adapter/support.adapter.js';

const schemaSupportRegister = Joi.object({
  title: Joi.string().min(4).max(255).required(),
  description: Joi.string().min(4).max(255),
  state: Joi.boolean().required(),
  start_date: Joi.date().required(),
  exp_date: Joi.date().required(),
  user_id: Joi.string().guid().required(),
});

const schemaSupportUpdate = Joi.object({
  title: Joi.string().min(4).max(255),
  description: Joi.string().min(4).max(255),
  state: Joi.boolean(),
  start_date: Joi.date(),
  exp_date: Joi.date(),
});

const supportRegister = async (req, res) => {
  try {
    const { error } = schemaSupportRegister.validate(req.body);
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

const supportUpdate = async (req, res) => {
  try {
    const { error } = schemaSupportUpdate.validate(req.body);
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
      status: 400,
    });
  }
};

export { supportRegister, supportUpdate };
