import Joi from 'joi';
import { transporterEmail } from '../config/email.js';
import { handlerTemplates } from '../helpers/handler_templates.js';

const schemaMail = Joi.object({
  from: Joi.string().required().email(),
  to: Joi.string().required().email(),
  subject: Joi.string().min(4).required(),
  text: Joi.string().min(4).required(),
});

const sendMail = (req, res) => {
  const { error } = schemaMail.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const mailOptions = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text,
    html: handlerTemplates('reset_password', { email: 'soporte@beatus.com' })
   };

  transporterEmail.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send('Email sent: ' + info.response);
      // do something useful
    }
  });
};

export { sendMail };
