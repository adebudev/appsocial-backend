import { config } from 'dotenv';
import nodemailer from 'nodemailer';
config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    }
  });
  
  const mailOptions = {
    from: 'josesilvera1926@gmail.com',
    to: 'cvcaliz@mail.uniatlantico.edu.co',
    subject: 'Prueba',
    text: 'Esto es una'
  };
  

 

  const sendMail = (req,res) =>
  {

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
     res.status(400).send(error);
      } else {
        res.status(200).send('Email sent: ' + info.response);
        // do something useful
      }
    });


  }


  export { sendMail };