import jwt from 'jsonwebtoken';

export const verifyTokenHelper = (auth_token) =>
  jwt.verify(auth_token, process.env.TOKEN_SECRET);
