import Joi from 'joi';
import { get, getByUser, saveMembership, updateMembership } from '../adapter/member.adapter.js';

const schemaMembershipRegister = Joi.object({
  type: Joi.string().min(4).max(255),
  state: Joi.boolean().required(),
  start_date: Joi.date().required(),
  exp_date: Joi.date().required(),
  user_id: Joi.string().guid().required(),
});

const schemaMembershipUpdate = Joi.object({
  type: Joi.string().min(4).max(255),
  state: Joi.boolean(),
  start_date: Joi.date(),
  exp_date: Joi.date(),
});

const memberRegister = async (req, res) => {
  try {
    const { error } = schemaMembershipRegister.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const response = await saveMembership(req.body);
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

const memberUpdate = async (req, res) => {
  try {
    const { error } = schemaMembershipUpdate.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const response = await updateMembership(req.params.id, req.body);
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
}

const getMembershipByUser = async (req, res) => {
  try {
    console.log(req.params.userId)
    const response = await getByUser(req.params.userId);
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

export { memberRegister, memberUpdate, getMembershipByUser, getMembership };
