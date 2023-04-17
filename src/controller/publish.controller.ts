import { getByUser, save } from '../adapter/publish.adapter.js';

const publishRegister = async (req, res) => {
  try {
    const response = await save(req.user.id, req.body);
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

const getPublish = async (req, res) => {
  try {
    const response = await getByUser(req.user.id);
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

export { publishRegister, getPublish };