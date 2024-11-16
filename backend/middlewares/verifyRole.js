// middlewares/verifyRole.js
const jwt = require('jsonwebtoken');

const verifyRole = (roles) => {
  return (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token requis');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).send('Token invalide');
      if (!roles.includes(decoded.role)) return res.status(403).send('Accès refusé');
      req.user = decoded;
      next();
    });
  };
};

module.exports = verifyRole;
