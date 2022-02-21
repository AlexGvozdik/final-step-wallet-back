const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const { SECRET_KEY } = process.env;

const authenticate = async (req, _, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Unauthorized('Not authorized');
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      throw new Unauthorized('Invalid token');
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized('Not authorized');
    }
    req.user = user;
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};

module.exports = authenticate;