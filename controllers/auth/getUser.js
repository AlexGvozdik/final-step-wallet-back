const { User } = require("../../models");

const getUser = async (req, res) => {
  const { _id } = req.user;

  const userData = await User.findById(_id);

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      name: userData.name,
      email: userData.email,
    },
  });
};

module.exports = getUser;