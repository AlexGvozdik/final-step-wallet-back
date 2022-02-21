const { Unauthorized } = require('http-errors');
const { User } = require('../../models/user');

const getCurrentUser = async(req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw new Unauthorized('Not authorized');
  }

  res.json({
    status: 'success',
    code: 200,
    user: {
      email: user.email,
      name: user.name
    }
  });
};

module.exports = getCurrentUser;