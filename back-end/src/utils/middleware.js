const jwt = require('jsonwebtoken');
const Users = require('../api/models/users.model');

const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  
  let data;
  try {
    const tokenToCheck = token.split(' ')[1];
    data = jwt.verify(tokenToCheck, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  };

  const user = await Users.findById(data.id);
  if (!user) {
    return res.status(404).json({ message: 'User does not exist' })
  };

  req.user = user;
  next();
};

module.exports = authMiddleware;