export const getUsers = (req, res) => {
  const users = [
    { id: 1, nome: 'Julia', papel: 'Consultora' },
    { id: 2, nome: 'Maria Julia', papel: 'Consultora' },
    { id: 3, nome: 'Bia', papel: 'Consultora' },
    { id: 4, nome: 'Law', papel: 'Consultora' },
  ];
  res.json(users);
};