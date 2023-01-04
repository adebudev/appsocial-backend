import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
    console.log('req.cookies?.auth_token', req.cookies?.auth_token)
  if (!req.cookies?.auth_token) return res.status(401).json({ error: 'Acceso denegado' });
  try {
    const verified = jwt.verify(req.cookies?.auth_token, process.env.TOKEN_SECRET);
    req.user = verified;
    next(); // continuamos
  } catch (error) {
    res.status(400).json({ error: 'token no es válido' });
  }
};
