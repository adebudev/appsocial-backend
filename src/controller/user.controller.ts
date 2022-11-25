import { getAll, register } from '../adapter/user.adapter.js';

const userRegister = async (req, res) => {
  try {
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

export { userRegister, userGetAll };
