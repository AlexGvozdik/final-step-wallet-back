const { InternalServerError } = require("http-errors");
const { User } = require("../../models");

const logout = async (req, res, next) => {
  const userData = await User.findByIdAndUpdate(
    req.user._id,
    { token: null },
    { new: true }
  );

  if (!userData) throw new InternalServerError("Server error");

  res.status(204).json({
    status: "User logged out",
    code: 204,
  });
};

module.exports = logout;