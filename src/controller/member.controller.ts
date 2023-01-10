import { save } from '../adapter/member.adapter.js';

const memberRegister = async (req, res) => {
  try {
    //console.log('SUPPORT', req.body)
    const des = await save(req.body);
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

export { memberRegister };