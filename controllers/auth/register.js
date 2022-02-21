const { Conflict } = require('http-errors');
const { User } = require('../../models/user');

const register = async(req, res) => {
  const { email, password, name } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Email in use');
  }

  const newUser = new User({
    email,
    name
  });
  newUser.setPassword(password);
  await newUser.save();

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Registration successful',
    user: newUser
  });
};

module.exports = register;