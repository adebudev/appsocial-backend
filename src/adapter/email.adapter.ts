import { transporterEmail } from '../config/email.js';
import { handlerTemplates } from '../helpers/handler_templates.js';

export const sendEmail = (data, htmlType, parameters) => {
  const mailOptions = {
    from: data.from,
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: handlerTemplates(htmlType, parameters),
  };
  return new Promise((resolve, reject) => {
    transporterEmail.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
        throw Error(error);
      }
      resolve(info);
    });
  
  })
};
