export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token === 'Bearer fake-jwt-token') {
    next();
  } else {
    res.status(403).json({ message: 'Token inválido' });
  }
};