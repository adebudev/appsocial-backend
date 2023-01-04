import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import { getUser } from '../adapter/user.adapter.js';

const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

const sessionLogin = async (req, res, next) => {
  try {
    const { error } = schemaLogin.validate(req.body);
    console.log(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await getUser(req.body);

    const token = jwt.sign(
      {
        name: user.firstName,
        id: user.id,
      },
      process.env.TOKEN_SECRET
    );

    res.cookie('auth_token', token, {maxAge: 360000});
    return res.status(200).send('user data added to cookie');
  } catch (e) {
    console.log(e.message);
    res.status(400).send({
      message: e.message,
      status: 400,
    });
  }
};

const sessionLogout = async (req, res) => {
  res.clearCookie('auth_token');
};

export { sessionLogin, sessionLogout };