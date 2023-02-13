import { config } from 'dotenv';
import nodemailer from 'nodemailer';

config();

export const transporterEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  