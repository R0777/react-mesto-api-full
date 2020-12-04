const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  try {
    const token = authorization.replace('Bearer ', '');
    if (!token) {
      return res.status(401).send({ message: 'Необходима авторизация' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (e) {
    const err = new Error('Необходима авторизация');
    err.statusCode = 401;

    return next(err);
  }
};
