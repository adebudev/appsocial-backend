import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) return res.status(403).json({ error: 'Acceso denegado' });
  try {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    const verified = jwt.verify(bearerToken, process.env.TOKEN_SECRET);
    req.user = verified;
    req.token = bearerToken;
    next();
  } catch (error) {
    res.status(400).json({ error: 'token no es válido' });
  }
};
