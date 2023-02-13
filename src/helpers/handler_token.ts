import jwt from 'jsonwebtoken';

export const handlerToken = (user) => {
  const token = jwt.sign(
    {
      name: user.firstName,
      id: user.id,
    },
    process.env.TOKEN_SECRET
  );

  return token;
};
