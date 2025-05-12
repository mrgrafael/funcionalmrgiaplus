export const login = (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@mrgiaplus.com' && password === '123456') {
    return res.status(200).json({ token: 'fake-jwt-token', role: 'admin' });
  }
  return res.status(401).json({ message: 'Credenciais inválidas' });
};