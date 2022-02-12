const { InternalServerError } = require("http-errors");
const { User } = require("../../models");

const updateBalance = async (req, res, next) => {
  const { balance } = req.body;

  const userData = await User.findByIdAndUpdate(
    req.user._id,
    { balance },
    { new: true }
  );

  if (!userData) throw new InternalServerError("Server error");

  res.status(200).json({
    status: "Balance updated",
    code: 200,
    data: {
      user: {
        balance: userData.balance,
      },
    },
  });
};

module.exports = updateBalance;