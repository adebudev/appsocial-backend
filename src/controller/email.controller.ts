import { config } from 'dotenv';
import nodemailer from 'nodemailer';
import Joi from 'joi';
config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

const schemaMail = Joi.object({
  from: Joi.string().min(6).max(255).required().email(),
});

const sendMail = (req, res) => {
  const { error } = schemaMail.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const mailOptions = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send('Email sent: ' + info.response);
      // do something useful
    }
  });
};

export { sendMail };
